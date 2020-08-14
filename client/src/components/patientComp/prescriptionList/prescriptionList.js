import React from 'react';
import PrescribeCard from "../prescribeCard/prescribeCard";
import "./prescriptionList.css"

export default function Cardlist(props) {
    console.log(props.list);
    return (
        <div className="card-list">
            {props.list.map(el => (
                <PrescribeCard id={el._id} data={el} />
            ))}
        </div>
    );
};