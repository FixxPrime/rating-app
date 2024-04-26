import './UserCard.css';

import { Link } from "react-router-dom";

import { Card, Button, Space, Avatar } from "antd"

import { EditOutlined, DeleteOutlined, UserOutlined, PhoneOutlined, BankOutlined, ContactsOutlined, LikeOutlined, TrophyOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

import { CardModel } from "../../models/CardModel";

import { deleteCard, upCard, downCard } from "../../services/cards";
import { getDepartment } from '../../services/departments';

import { useState, useEffect } from "react"
import { DepartmentModel } from '../../models/DepartmentModel';

import { RequireAuthComponent } from '../../hoc/RequireAuth';

interface Props {
    user: CardModel;
    idx: number;
    handleDelete: () => void;
}

export const UserCard = ({user, idx, handleDelete}: Props) =>{
    const [department, setDepartment] = useState<DepartmentModel>();

    useEffect(() =>{
        const getDepartmentInformation = async () => {
            const response = await getDepartment(user.departmentId)
            setDepartment(response);
        };
        
        getDepartmentInformation();
        
    }, [])
    
    user.birthday = new Date(user.birthday);

    const deleteCardClick = () => {
        const tryDelete = async () => {
            const response = await deleteCard(user.id)

            if(response.ok){
                handleDelete();
            }
        };
        
        tryDelete();
    };

    const upCardClick = () =>{
        const tryUp = async () => {
            const response = await upCard(user.id)

            if(response.ok){
                handleDelete();
            }
        };
        
        tryUp();
    }

    const downCardClick = () =>{
        const tryDown = async () => {
            const response = await downCard(user.id)

            if(response.ok){
                handleDelete();
            }
        };
        
        tryDown();
    }

    return(
        <div className="main-container">
            <Card
                title={
                    <span className="card-title">
                        {user.position && (
                            <>
                                {user.position <= 3 ? (
                                    <TrophyOutlined style={{ marginRight: '15px' }} />
                                ) : (
                                    <LikeOutlined style={{ marginRight: '15px' }} />
                                )}
                            </>
                        )}
                        {user.surname + " " + user.name + " " + user.patronymic}
                    </span>
                }
                className={`default-card ${user.position === 1 ? 'gold-card' : user.position === 2 ? 'silver-card' : user.position === 3 ? 'bronze-card' : ''} ${user.position ? '' : ''}`}
            >
                <div className="card-content">
                    <div className="user-position">
                        <span className={`position-symbol ${user.position === 1 ? 'gold-text' : user.position === 2 ? 'silver-text' : user.position === 3 ? 'bronze-text' : ''} ${user.position ? '' : ''}`}>№</span>
                        <span className={`position-number ${user.position === 1 ? 'gold-text' : user.position === 2 ? 'silver-text' : user.position === 3 ? 'bronze-text' : ''} ${user.position ? '' : ''}`}>{user.position}</span>
                    </div>
                    <div className="description">
                        <Space size={10}>
                            <ContactsOutlined />
                            <span>Дата рождения: {user.birthday.toLocaleDateString()}</span>
                        </Space>
                        <br />
                        <Space size={10}>
                            <PhoneOutlined />
                            <span>Телефон: {user.phone}</span>
                        </Space>
                        <br />
                        <Space size={10}>
                            <BankOutlined />
                            <span>Отдел: {department?.name}</span>
                        </Space>
                    </div>
                    <Avatar shape="square" size={80} icon={<UserOutlined />} />
                </div>
            </Card>
            <RequireAuthComponent>
                <div className="button-container">
                    <Button className="down-button" type='text' icon={<UpOutlined />} size="large" onClick={ downCardClick } />
                    <Button className="up-button" type='text' icon={<DownOutlined />} size="large" onClick={ upCardClick } />
                    <Link to={`/edit/${user.id}`}>
                        <Button className="edit-button" icon={<EditOutlined />} size="large" />
                    </Link>
                    <Button className="delete-button" type="primary" icon={<DeleteOutlined />} size="large" onClick={deleteCardClick} danger />
                </div>
            </RequireAuthComponent>
        </div>
    )
}