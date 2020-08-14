import React, { useEffect, useState } from 'react';
import Styles from './diet.module.css';
import { useSelector } from 'react-redux';

import axios from 'axios';

const Diet = () => {
  const [diet, setDiet] = useState();
  const state = useSelector((state) => state.diet.state);
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_LINK}/api/diet/${state}`
    );
    console.log(res.data.diet['sunday'], 'hello');
    setDiet(res.data.diet['sunday']);
  };
  useEffect(() => {
    getData();
  }, []);
  if (!diet) return null;
  return (
    <div>
      <div>Calories</div>
      <div>total:{diet.calories.amount}</div>
      <div>percentage distribution</div>
      <div>carbohydrate:{diet.calories.percentages.carbohydrate}%</div>
      <div>fat:{diet.calories.percentages.fat}%</div>
      <div>protein:{diet.calories.percentages.protein}%</div>
      <div>fiber:{diet.calories.percentages.fiber}</div>
      <div>breakfast</div>
      {diet.breakfast.map((el, ind) => {
        return <div key={ind + ''}>{el}</div>;
      })}
      <div>lunch</div>
      {diet.lunch.map((el, ind) => {
        return <div key={ind + ''}>{el}</div>;
      })}
      <div>dinner</div>
      {diet.dinner.map((el, ind) => {
        return <div key={ind + ''}>{el}</div>;
      })}
    </div>
  );
};

export default Diet;
