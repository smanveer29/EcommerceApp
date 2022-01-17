import {createStore} from 'redux'
import reducer from './Reducers/index'
export default function configureStore(initialState){
    return createStore(reducer,initialState)
}