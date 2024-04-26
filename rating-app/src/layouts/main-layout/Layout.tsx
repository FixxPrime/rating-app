import { Component } from "react"
import { Outlet } from "react-router-dom";

import { Footer } from "antd/es/layout/layout";

import './Layout.css';
import { Header } from "../../components/main-header/Header";

export class Layout extends Component{
    render(){
        return(
            <>
            <Header />

            <Outlet />

            <Footer className="footer">
                Created on React
            </Footer>
            </>
        )
    }
}