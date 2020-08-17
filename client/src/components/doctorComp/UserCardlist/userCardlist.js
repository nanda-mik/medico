import React from 'react';
import UserCard from "../UserCard/userCard";
import "./userCardlist.css"

export default function Cardlist(props){
    console.log(props.users);
    return <div className="Carr">   
        {props.users.map(user => (
            <UserCard id={user._id} isReq={props.isReq} user={user}/>
        ))}
        </div>;
};