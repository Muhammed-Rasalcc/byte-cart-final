import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () =>{
    try {
        const serializedstate = localStorage.getItem('user');
        if(serializedstate == null) return{user: null};
        return {user: JSON.parse(serializedstate)}
    } catch (error) {
       return {user: null} 
    }
}

const initialState = loadUserFromLocalStorage();

const authslice = createSlice({
    name: 'auth' ,
    initialState,
    reducers :{
        setUser : (state,action) =>{
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify( state.user))
        },
        logout : (state) =>{
            state.user = null;
            localStorage.removeItem('user');
        }
    }
})

export const {setUser, logout} = authslice.actions;
export default authslice.reducer;