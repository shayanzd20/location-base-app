import {
    REMOVE_USER,
    SAVE_USER, SUGGESTION_HIDE, SUGGESTION_UPDATE,
} from "./types";


export const saveUser=(user)=>({
    type:SAVE_USER,
    user
})
export const removeUser=(user)=>({
    type:REMOVE_USER,
    user
})
export const suggestionUpdate=(setting)=>({
    type:SUGGESTION_UPDATE,
    setting
})