import React, { useEffect, useState } from 'react';
import './dietCard.css';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';

import Axios from 'axios';

const Diet = () => {
  const [diet, setDiet] = useState();
  const state = useSelector((state) => state.diet.state);
  const getData = async () => {
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/diet/${state}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const res = await Axios(options);
    console.log(res.data.diet['tuesday'], 'hello');
    setDiet(res.data.diet['tuesday']);
  };
  useEffect(() => {
    getData();
  }, []);
  if (!diet) return null;
  return (
    <div className="diet-card">
      <Card bg="light" border="info" style={{ width: '45rem' }}>
        <Card.Img variant="top" src="https://travelandleisureindia.in/wp-content/uploads/2020/07/Feature-image-Odisha-Pakhala-.jpg" />
        <Card.Body>
          <Card.Title><h1>Diet for Tuesday</h1></Card.Title>
          <Card.Text>
            <div>
              <h3>Calories</h3>
              <div>
                <h5>Amount: {diet.calories.amount}</h5>
                <div>
                  <h5>Percentage Distribution</h5>
                  <ul>
                    <li>Carbohydates : {diet.calories.percentages.carbohydrate}%</li>
                    <li>Fat : {diet.calories.percentages.fat}%</li>
                    <li>Protein : {diet.calories.percentages.protein}%</li>
                    <li>Fiber : {diet.calories.percentages.fiber}%</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="food-diet">
              <div>
                <h3>Breakfast</h3>
                <ul>
                  {diet.breakfast.map((el, ind) => {
                    return <li key={ind + ''}>{el}</li>;
                  })}</ul>
              </div>
              <div>
                <h3>Lunch</h3>
                <ul>
                  {diet.lunch.map((el, ind) => {
                    return <li key={ind + ''}>{el}</li>;
                  })}</ul>
              </div>
              <div>
                <h3>Dinner</h3>
                <ul>
                  {diet.dinner.map((el, ind) => {
                    return <li key={ind + ''}>{el}</li>;
                  })}
                </ul>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Diet;
