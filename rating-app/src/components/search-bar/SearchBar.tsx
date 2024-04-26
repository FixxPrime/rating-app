import { useEffect, useState } from "react"

import './SearchBar.css';

import { DepartmentModel } from "../../models/DepartmentModel";

import { getAllDepartments } from "../../services/departments";

import { Input, Select } from "antd"

import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
const { Search } = Input;

interface Props {
    handleApplySearch: (searchValue: string, selectValue: string) => void;
}

export const SearchBar = ({handleApplySearch}: Props) =>{
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const { token } = theme.useToken();

    useEffect(() => {
        const getDepartmentInfromation = async () => {
            const departments = await getAllDepartments()
            setDepartments(departments);
        };

        getDepartmentInfromation();

    }, []);

    const handleSearch = () => {
        handleApplySearch(searchValue, selectValue);
    };
    
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    
    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
        {
          key: '1',
          label: <span style={{ fontSize: '15px', fontWeight: 'bold' }}>Поиск</span>
          ,
          children:
          <div className="search-container">
              <Search className="custom-search" placeholder="Введите ФИО"
                    onSearch={ handleSearch }
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue} />
              <br/>
              <span className="department-title">Отдел:</span>
              <Select className="custom-select"
                  allowClear
                  onChange={(selectedValue) => {
                    setSelectValue(selectedValue);
                }}
                  value={selectValue}
                  options={departments.map(department => ({
                    value: department.id,
                    label: department.name
                }))}
                  />
          </div>,
          style: panelStyle,
        },
      ];

    return(
        <Collapse className="open-search"
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: token.colorBgContainer }}
            items={getItems(panelStyle)}
            />
    )
}
