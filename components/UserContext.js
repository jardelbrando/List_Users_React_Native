import React, {createContext, useEffect, useReducer} from "react";
import users from "./usersRandom";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsersContext = React.createContext({});
const initialState = {users};
const actions = {

    carregarUsers(state, action){
        const loadedUsers = action.payload.users;
        return {
            ...state,
            users: loadedUsers,
        };
    },

    deleteUser(state, action){
        const user = action.payload
        const updatedUsers = state.users.filter(u => u.id !== user.id)
        saveUsers(updatedUsers)
        return{
                ...state,
                users: updatedUsers
        }
    },

    createUser(state, action){
        const user = action.payload
        user.id = Math.random()
        const updatedUsers = [...state.users, user]
        saveUsers(updatedUsers)
    },

    updateUsers(state, action){
        const updated = action.payload;
        const updatedUsers = state.users.map(u => u.id === updated.id ? updated : u);
        saveUsers(updatedUsers)
        return {
            ...state,
            users: updatedUsers,
        } ;
    }
}

async function saveUsers(users) {
    try{
        await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Erro ao salvar os usuários no AsyncStorage: ', error);
    }
}


async function loadUsers() {
    try{
        const users = await AsyncStorage.getItem('users');
        return {users: users ? JSON.parse(users) : []}
    }catch (error){
        console.error('Erro ao carregar os usuários do AsyncStorage: ', error);
        return {users: []};
    }
}

export const UsersProvider = props => {

    useEffect(()=> {
        async function fetchData(){
            const loadedUsers = await loadUsers();
            if(loadedUsers.users.length !== 0){
                dispatch({type: 'carregarUsers', payload: loadedUsers});
            }else{
                dispatch({type: 'gerarRandom', payload: users});
            }
        }
        fetchData();
    }, []);

    function reducer(state, action){
        const fn = actions [action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UsersContext.Provider value={{state, dispatch}}>
            {props.children}
        </UsersContext.Provider>
    )
}
export default UsersContext