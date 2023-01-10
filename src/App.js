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
        setUsers(data.users)
    }
    
    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }
    
    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
    }, [])
    
    

    
    return (
    <div className="container">
        <div className="row">
            <div className="col d-flex justify-content-center ">
                { !state.joined ? <AuthorizationMain onLogin={ onLogin }/> : <Chat {...state} /> }
            </div>
        </div>
    </div>
  );
}

export default App;
