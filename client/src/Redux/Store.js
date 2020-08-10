import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import Rootreducer from './RootReducer';

const middlewares = [logger];

 export const Store = createStore ( Rootreducer , applyMiddleware(...middlewares));
 


 