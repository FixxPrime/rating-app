import { Input, Form, Button, DatePicker, Select, Card, Avatar, Space } from "antd";
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { CardModel } from "../../models/CardModel";

import MaskInput from 'antd-mask-input';

import { useState, useEffect } from "react"

import dayjs from 'dayjs';

import './FormCrtUpdCard.css';

import { createCard, CardRequest, getCard, updateCard } from "../../services/cards";
import { DepartmentModel } from "../../models/DepartmentModel";
import { getAllDepartments } from "../../services/departments";

import { RequireAuthComponent } from "../../hoc/RequireAuth";

import { AddDepartmentModalForm } from "../add-department-modal-form/AddDepartmentModalForm";

interface Props {
    idCard: string;
    handleApply: () => void;
    handleCancel: () => void;
}

export const FormCrtUpdCard = ({idCard, handleApply, handleCancel}: Props) =>{
    const [cardInit, setCardInit] = useState<CardModel>();
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);
    const [isAddPage, setTypePage] = useState(true);
    const [birthdayDate, setBirthdayDate] = useState(dayjs());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm()

    useEffect(() =>{
        if (idCard === "new") {
            setTypePage(true);

        } else {
            setTypePage(false);
            
            const getCardInfromation = async () => {
                if (idCard) {
                    const card = await getCard(idCard)
                    setCardInit(card);
                    setBirthdayDate(dayjs(card.birthday));
                    form.setFieldsValue({ ...card, birthdayDate: dayjs(card.birthday) });
                }
            };
            
            getCardInfromation();
        }

        getDepartmentInfromation();
        
    }, [])

    const getDepartmentInfromation = async () => {
        const departments = await getAllDepartments()
        setDepartments(departments);
    };

    const updateDepartments = () =>{
        setIsModalOpen(false);
        getDepartmentInfromation();
    }

    const handleDateChange = (date: any) => {
        setBirthdayDate(date);
    };

    const openModalAddDepartment = () =>{
        setIsModalOpen(true);
    }

    const closeModalAddDepartment = () =>{
        setIsModalOpen(false);
    }

    const onFinish = (values: CardRequest) => {
        values.birthday = birthdayDate.toDate();
        values.patronymic = values.patronymic !== undefined ? values.patronymic : '';

        if(isAddPage){
            const addCard = async () => {
                const response = await createCard(values);
                if(response.ok){
                    handleApply();
                }
            };
            
            addCard();
        } else{
            const updCard = async () => {
                const response = await updateCard(idCard, values);
                if(response.ok){
                    handleApply();
                }
            };
            
            updCard();
        }
    };

    const onReset = () =>{ handleCancel() }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className="form-container">
            <RequireAuthComponent>
                <>
                <div className="card-form-container">
                    <p className="form-title">{isAddPage === true ? "Добавление карточки пользователя" : "Редактирование карточки пользователя"}</p>
                    <Card className="card-form">
                        <Form form={form}
                            name="card"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{...cardInit, birthdayDate: birthdayDate}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<CardModel>
                                label="Фамилия"
                                name="surname"
                                rules={[{ required: true, message: 'Введите фамилию!' }]}
                            >
                                <Input pattern="[A-Za-zА-Яа-яЁё]+" placeholder="Иванов"></Input>
                            </Form.Item>

                            <Form.Item<CardModel>
                                label="Имя"
                                name="name"
                                rules={[{ required: true, message: 'Введите имя!' }]}
                            >
                                <Input pattern="[A-Za-zА-Яа-яЁё]+" placeholder="Иван"/>
                            </Form.Item>

                            <Form.Item<CardModel>
                                label="Отчество"
                                name="patronymic"
                                rules={[{ required: false, message: '' }]}
                            >
                                <Input pattern="[A-Za-zА-Яа-яЁё]+" placeholder="Иванович" />
                            </Form.Item>

                            <Form.Item<CardModel>
                                label="Телефон"
                                name="phone"
                                rules={[{ required: true, message: 'Введите номер телефона!' }]}
                            >
                            {isAddPage ? (
                                <MaskInput mask="+7 (000) 000-00-00" placeholder="+7 (___) ___-__-__" required />
                            ) : (
                                <Input pattern="[0-9+\-\(\) ]*" />
                            )}
                            </Form.Item>

                            <Form.Item
                                label="Дата Р."
                                name="birthdayDate"
                                rules={[{ required: true, message: 'Выберите дату рождения!' }]}
                            >
                                <DatePicker onChange={handleDateChange} />
                            </Form.Item>

                            <Form.Item<CardModel>
                                label="Позиция"
                                name="position"
                                rules={[{ required: true, message: 'Введите позицию в рейтинге!' }]}
                            >
                                <Input pattern="[0-9]+" type="number" step="1" placeholder="11"/>
                            </Form.Item>

                            <Form.Item<CardModel>
                                label="Отдел"
                                name="departmentId"
                                rules={[{ required: true, message: 'Выберите отдел!' }]}
                            >
                                <Select placeholder="Отдел маркетинга" style={{ flex: '1' }}>
                                {departments.map((department) => (
                                    <Select.Option key={department.id} value={department.id}>
                                    {department.name}
                                    </Select.Option>
                                ))}
                                </Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        Принять
                                    </Button>
                                    <Button onClick={openModalAddDepartment} icon={<PlusOutlined/>}>
                                        Добавить отдел
                                    </Button>
                                    <Button htmlType="button" onClick={onReset}>
                                        Отмена
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
                <Avatar className="avatar-container" shape="square" size={80} icon={<UserOutlined />} />
                {isModalOpen && <AddDepartmentModalForm handleSuccessAdd={updateDepartments} handleCloseModal={closeModalAddDepartment} />}
                </>
            </RequireAuthComponent>
        </div>
    )
}