import {REMOVE_USER, SAVE_USER} from "../actions/types";

const initState={
    // "fullName":null,
    // "username":null,
    "number": null,
    // "password":null,
    "token":null,
    "deviceid":null,
};
export default user=(state=initState,action={})=>{
    switch (action.type){
        case SAVE_USER:
            const {user}=action;
            return  user;
        case REMOVE_USER:
            return  initState;
        default:
            return state;
    }
}