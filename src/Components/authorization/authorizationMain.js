import React, { useState } from 'react'
import axios from 'axios'

const AuthorizationMain = ({onLogin}) => {
    
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Неверные данные')
        }
        
        const obj = {
            roomId,
            userName
        }
        
        setIsLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj)
    }
    
    return (
        <>
            <div className="join-block w-25 d-flex justify-content-center flex-column mt-5">
                <input type="text"
                       placeholder={ "Room ID" }
                       className={ "p-2 w-100 mb-2" }
                       value={ roomId }
                       onChange={ e => setRoomId(e.target.value) }/>
                <input type="text"
                       placeholder={ "Ваше имя" }
                       className={ "p-2 w-100 mb-2" }
                       value={ userName }
                       onChange={ e => setUserName(e.target.value) }/>
                <button disabled={isLoading} className={ "btn btn-success p-2" } onClick={ onEnter }>
                    { isLoading ? 'Вход...' : 'Войти'}
                </button>
            </div>
        </>
    )
}

export default AuthorizationMain