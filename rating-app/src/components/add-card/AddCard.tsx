import './AddCard.css';

import { Card, Space, Avatar, Button } from "antd"

import { PhoneOutlined, BankOutlined, ContactsOutlined, UserAddOutlined, PlusOutlined } from '@ant-design/icons';

export const AddCard = () =>{

    return(
        <div className="main-container" style={{ opacity: 0.8 }}>
            <Card
                title={
                    <span className="card-title">
                        <PlusOutlined style={{ marginRight: '15px' }} />
                        Добавить пользователя
                    </span>
                }
                className="default-card"
            >
                <div className="card-content">
                    <div className="user-position">
                        <span className="position-symbol">№</span>
                        <span className="position-number">?</span>
                    </div>
                    <div className="description">
                        <Space size={10}>
                            <ContactsOutlined />
                            <span>Дата рождения: ?</span>
                        </Space>
                        <br />
                        <Space size={10}>
                            <PhoneOutlined />
                            <span>Телефон: ?</span>
                        </Space>
                        <br />
                        <Space size={10}>
                            <BankOutlined />
                            <span>Отдел: ?</span>
                        </Space>
                    </div>
                    <Avatar shape="square" size={80} icon={<UserAddOutlined />} />
                </div>
            </Card>
            <div className="button-container">
                <Button className="edit-button" icon={<PlusOutlined />} size="large" />
                <Button className="delete-button" icon={<PlusOutlined />} size="large" />
            </div>
    </div>
    )
}