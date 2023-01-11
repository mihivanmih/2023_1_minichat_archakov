import AuthorizationMain from './Components/authorization/authorizationMain'
import { useEffect, useReducer } from 'react'
import reducer from './reducer'
import socket from './socket'
import Chat from './Components/chat/chat'
import axios from 'axios'

function App() {
    
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })
    
    const onLogin = async (obj) => {
        
        dispatch({
            type: 'JOINED',
            payload: obj
        })
    
        // emit запрос сокета на бек
        socket.emit('ROOM:JOIN', obj)
        const { data } = await axios.get(`/rooms/${obj.roomId}`)
        
        // что бы новый пользователь видел старые сообщения
        dispatch({
            type: 'SET_DATA',
            payload: data
        })
        //setUsers(data.users)
    }
    
    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }
    
    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        })
    }
    
    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGE', message => {
            addMessage(message)
        })
    }, [])
    
    return (
    <div className="container">
        <div className="row">
            <div className="col d-flex justify-content-center ">
                { !state.joined ? <AuthorizationMain onLogin={ onLogin }/> : <Chat {...state} onAddMessage={addMessage}/> }
            </div>
        </div>
    </div>
  );
}

export default App;
