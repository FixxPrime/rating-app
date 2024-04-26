import { useState } from "react"

import { Row, Col} from "antd"
import './Board.css';

import { UserCard } from "../../components/board-card/UserCard";
import { SearchBar } from "../../components/search-bar/SearchBar";

import { useEffect } from "react";
import { getAllCards, getFilteredCards } from "../../services/cards";
import { CardModel } from "../../models/CardModel";

import { AddCard } from "../../components/add-card/AddCard";

import { Link } from "react-router-dom";

import { RequireAuthComponent } from "../../hoc/RequireAuth";

export default function Board(){
    const [cards, setCards] = useState<CardModel[]>([]);

    useEffect(() =>{
        getCards();
    }, [])

    const getCards = async () => {
        const cards = await getAllCards();
        setCards(cards);
    };

    const updateCards = () =>{
        getCards();
    }

    const updateSearchCards = async (searchValue: string, selectValue: string) =>{
        const cards = await getFilteredCards(searchValue, selectValue);
        setCards(cards);
        console.log("Searched:", searchValue, selectValue);
    }

    return(
        <div className="page">
            <div className="board">
                <SearchBar handleApplySearch={updateSearchCards}/>
                <br />
                <br />
                <Row justify="space-around" gutter={[16, 16]}>
                    <RequireAuthComponent>
                        <Col xs={24} sm={24} md={16} lg={16} xl={8}>
                            <Link to={`/add`}>
                                <AddCard />
                            </Link>
                        </Col>
                    </RequireAuthComponent>
                    {cards.map((_card, _index) => (
                        <Col key={_card.id} xs={24} sm={24} md={16} lg={16} xl={8}>
                            <UserCard user={_card} idx={_index} handleDelete={updateCards} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}