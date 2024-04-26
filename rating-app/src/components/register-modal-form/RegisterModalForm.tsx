import './RegisterModalForm.css';

import { Form, Input, Button, Modal, Space } from 'antd';
import { UserOutlined, UnlockOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../../hook/useAuth';

import { UserRequestRegister } from '../../services/auth';

import { registerUser } from '../../services/auth';

interface Props {
    handleSuccessRegister: () => void;
    handleCloseModal: () => void;
}

export const RegisterModalForm = ({handleSuccessRegister, handleCloseModal}: Props) =>{
    const auth = useAuth();

    const onFinish = (values: UserRequestRegister) => {
        const tryRegisterUser = async () => {
            const response = await registerUser(values);
            if(response.ok){
                handleSuccessRegister();
            }
        };
        
        tryRegisterUser();
    };

    const onFinishFailed = () => {
        //???
    };

    return(
        <div className="register-modal-form">
            <Modal title={<span style={{ fontSize: '20px' }}>Регистрация пользователя</span>} className='register-modal' open={true} footer={null} onCancel={handleCloseModal}>
                <Form className='register-form'
                    name="register-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item<UserRequestRegister>
                        name="username"
                        label="Имя"
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input className='input' placeholder="FixPrime" prefix={<UserOutlined style={{ opacity: '0.5' }} pattern="[A-Za-zА-Яа-яЁё0-9\\s]+" />} />
                    </Form.Item>

                    <Form.Item<UserRequestRegister>
                        name="login"
                        label="Логин"
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input className='input' placeholder="FixPrime" prefix={<LoginOutlined style={{ opacity: '0.5' }} pattern="[A-Za-z0-9]+" />} />
                    </Form.Item>

                    <Form.Item<UserRequestRegister>
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input.Password className='input' placeholder="********" prefix={<UnlockOutlined style={{ opacity: '0.5' }} pattern="^[A-Za-z0-9!@#$%^&*()_+]+$" />}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Регистрация
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