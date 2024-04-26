import './LoginForm.css';

import { Form, Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '../../hook/useAuth';

import { UserRequestLogin } from '../../services/auth';

import { loginUser } from '../../services/auth';

interface Props {
    handleSuccessLogin: () => void;
    handleOpenRegister: () => void;
}

export const LoginForm = ({handleSuccessLogin, handleOpenRegister}: Props) =>{
    const auth = useAuth();

    const onFinish = (values: UserRequestLogin) => {
        const tryLoginUser = async () => {
            const response = await loginUser(values);
            if(response.ok){
                handleSuccessLogin();
                response.text().then(token => {
                    auth?.signIn(token, () => {});
                });
                window.location.reload();
            }
        };
        
        tryLoginUser();
    };

    const onFinishFailed = () => {
        //???
    };

    const openModalRegister = () => {
        handleOpenRegister();
    };

    return(
        <div className="login-form">
            <Form
                name="login-form"
                layout="inline"
                size='small'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item<UserRequestLogin>
                    name="login"
                    rules={[{ required: true, message: '' }]}
                >
                    <Input className='input' placeholder="Логин" prefix={<UserOutlined style={{ opacity: '0.5' }} />} />
                </Form.Item>

                <Form.Item<UserRequestLogin>
                    name="password"
                    rules={[{ required: true, message: '' }]}
                >
                    <Input.Password className='input' placeholder="Пароль" prefix={<UnlockOutlined style={{ opacity: '0.5' }} />}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>

                <Button type="primary" icon={<UserAddOutlined/> } onClick={openModalRegister} >
                    
                </Button>
            </Form>
        </div>
    )
}