import './Header.css';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

import { Button, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hook/useAuth';
import logo from '../../logo.svg';

import { LoginForm } from '../login-form/LoginForm';

import { getInformation } from '../../services/users';
import { UserModel } from '../../models/UserModel';
import { RegisterModalForm } from '../register-modal-form/RegisterModalForm';


export const Header = () =>{
    const [user, setUser] = useState<UserModel>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        const fetchIsLoggedIn = () => {
            const isLoggedInResult = auth?.isLoggedIn();
            if (isLoggedInResult !== undefined) {
                setIsLoggedIn(isLoggedInResult);
            }
            if(isLoggedInResult){
                const getInfUser = async () => {
                    const response = await getInformation();
                    setUser(response);
                };
                
                getInfUser();
            }
        };
    
        fetchIsLoggedIn();

    }, []);

    const updateStatus = () =>{
        setIsLoggedIn(true);
    }

    const signOut = () =>{
        auth?.signOut(() => {});
        setIsLoggedIn(false);
        window.location.reload()
    }

    const openModalRegister = () =>{
        setIsModalOpen(true);
    }

    const closeModalRegister = () =>{
        setIsModalOpen(false);
    }

    return(
        <header>
            <div className="header-container">
                <NavLink to="/" className="NavLink">
                    <img src={logo} alt='logo' className="Logo" style={{ width: '50px', height: 'auto' }}/>
                    <span className='header-title'>Rating Board</span>
                </NavLink>
                {isLoggedIn ? (
                    <Space className='profile-utils'>
                        {user ? (
                            <span>{user.username}</span>
                        ) : (
                            <span>Loading...</span>
                        )}
                        <Avatar shape="square" icon={<UserOutlined />} />
                        <Button onClick={signOut}>Выйти</Button>
                    </Space>
                ) : (
                    isModalOpen ? <RegisterModalForm handleCloseModal={closeModalRegister} handleSuccessRegister={closeModalRegister} /> : <LoginForm handleSuccessLogin={updateStatus} handleOpenRegister={openModalRegister} />
                )}
            </div>
        </header>
    )
}