import { useParams, useNavigate } from "react-router-dom";

import './CreateUpdateCard.css';

import { FormCrtUpdCard } from "../../components/form-create-update-card/FormCrtUpdCard";

import { useEffect, useState } from "react";

export default function CreateUpdateCard(){
    const [idCard, setIdCard] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    const { id } = params;

    useEffect(() =>{
        setIdCard(id || "new");
        
    }, [id])

    const goBack = () => navigate('/');

    return(
        <div className="page">
            {idCard && <FormCrtUpdCard idCard={idCard} handleApply={goBack} handleCancel={goBack}/>}
        </div>
    )
}
