import { configureStore } from "@reduxjs/toolkit";
// import produce from "immer";
import { produce } from "structurajs"
const initialState = {
    name:"",
    roomKey:"",
    chance:0,
    words:[],
    word:"",
    selectedBy:"",
    playerList:[],
    visible:true,
}

const keyReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case "name":
                draft.name = action.payload;
                break;
            case "roomKey":
                draft.roomKey = action.payload;
                break;
            case "chance":
                draft.chance = action.payload;
                break;
            case "words":
                draft.words = action.payload;
                break;
            case "word":
                draft.word = action.payload;
                break;
            case "selectedBy":
                draft.selectedBy = action.payload;
                break;
            case "playerList":
                draft.playerList = action.payload;
                break;
            case "visible":
                draft.visible = action.payload;
                break;
        }
    })}

const store = configureStore({reducer:keyReducer});
// const store  = {};
export default store;