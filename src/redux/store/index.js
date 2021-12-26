import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import reducers from "../reducers"
import {autoRehydrate, persistReducer, persistStore} from "redux-persist";
import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const middleware=[thunk,createLogger()];
const config = {
    key: 'root',
    storage:storage,
}

let reducer = persistCombineReducers(config, reducers);
const PStorage = createStore(
    reducer,
    undefined,
    compose(
        applyMiddleware(...middleware)
    )
);

persistStore(
    PStorage/*,
    {storage:storage},
    null,
    ()=>{}*/
)

export default PStorage;
// export const Ppersistor= PStorage;




// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }