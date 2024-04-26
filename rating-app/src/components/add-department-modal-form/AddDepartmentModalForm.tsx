import './AddDepartmentModalForm.css';

import { Form, Input, Button, Modal, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hook/useAuth';

import { DepartmentModel } from '../../models/DepartmentModel';

import { createDepartment } from '../../services/departments';

interface Props {
    handleSuccessAdd: () => void;
    handleCloseModal: () => void;
}

export const AddDepartmentModalForm = ({handleSuccessAdd, handleCloseModal}: Props) =>{
    const auth = useAuth();

    const onFinish = (values: DepartmentModel) => {
        const tryAddDepartment = async () => {
            const response = await createDepartment(values);
            if(response.ok){
                handleSuccessAdd();
            }
        };
        
        tryAddDepartment();
    };

    const onFinishFailed = () => {
        //???
    };

    return(
        <div className="add-deparment-modal-form">
            <Modal title={<span style={{ fontSize: '20px' }}>Добавление отдела</span>} className='add-deparment-modal' open={true} footer={null} onCancel={handleCloseModal}>
                <Form className='add-deparment-form'
                    name="add-deparment-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item<DepartmentModel>
                        name="name"
                        label="Название"
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input className='input' placeholder="IT отдел" prefix={<UserOutlined style={{ opacity: '0.5' }} pattern="[A-Za-zА-Яа-яЁё0-9\\s]+" />} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                            <Button htmlType="button" onClick={ handleCloseModal }>
                                Отмена
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}