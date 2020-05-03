import  { combineReducers } from 'redux';
import general from './general'
import auth from './auth'
import profile from './profile'
import dev from "./dev"

export default combineReducers({
    general,
    auth,
    profile,
    dev
})