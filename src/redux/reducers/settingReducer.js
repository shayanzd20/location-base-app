import {REMOVE_USER, SAVE_USER, SUGGESTION_UPDATE} from "../actions/types";

const initState={
    suggestion:true
};
export default setting=(state=initState,action={})=>{
    switch (action.type){
        case SUGGESTION_UPDATE:
            return {
                suggestion:action.setting.suggestion
            }
        default:
            return state;
    }
}