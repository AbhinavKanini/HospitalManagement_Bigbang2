import React from "react";
import { setData, useEffect, useState } from 'react';
import Card from "../Admin/DoctorProfileCard";

function DisapprovedDoctors() {



    const [cards, setCards] = useState([]);



    const GetAllDoctors = async () => {
        try {
            const response = await fetch('https://localhost:7132/api/Doctor/GetAllctors');
            const data = await response.json();
            setCards(data);



        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        GetAllDoctors();
    });





    return (


        <div>
            <nav className="navbar">
                <div className="navbar-logo">

                    <a href="/">Lifeline Hospital</a>
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a href="/">Logout</a>
                    </li>

                </ul>
            </nav>


            <div>

                <div className="card-container">
                    {cards.filter(item => item.status == "Inactive").map(card => (
                        <Card c={card} />
                    ))}

                </div>
            </div>



        </div>
    );

}
export default DisapprovedDoctors;