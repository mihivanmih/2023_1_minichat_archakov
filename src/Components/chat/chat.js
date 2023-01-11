import React, { useEffect, useRef, useState } from 'react'
import style from './chat.module.scss'
import socket from '../../socket'

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {
    const [messageValue, setMessageValue] = useState('')
    const messagesRef = useRef(null)
    
    const onSendMessage = () => {
        if (!messageValue) {
        } else {
            socket.emit('ROOM:NEW_MESSAGE', {
                userName,
                roomId,
                text: messageValue
            })
            onAddMessage({
                userName,
                text: messageValue
            })
            setMessageValue('')
        }
    }
    
    useEffect(() => {
        return () => {
            messagesRef.current.scrollTo(0, 99999)
        }
    }, [messages])
    
    
    return (
        <div className="container mt-5">
            <div className={ `row align-items-start ${ style.allblock }` }>
                <div className={ `col-2 text-bold border ${ style.users }` }>
                    <b>Комната: </b> { roomId }
                    <hr/>
                    <span><b>Онлайн: </b> ({ users.length }):</span>
                    <ul>
                        { users.map((name, index) => <li key={ name }>{ name }</li>) }
                    </ul>
                </div>
                <div className={ `col-10 position-relative ${ style.chat }` }>
                    <div className={ style.heightMessage } ref={ messagesRef }>
                        {
                            messages.map((messages, index) => <div key={ index } className={ style.blockMessage }>
                                    <div className={ style.message }>{ messages.text }</div>
                                    <div className={ style.user }>{ messages.userName }</div>
                                </div>
                            )
                        }
                    </div>
                    
                    <hr/>
                    
                    <div className={ style.send }>
                        <textarea
                            name=""
                            id=""
                            className={ `form-control` }
                            rows="3"
                            value={ messageValue }
                            onChange={ e => setMessageValue(e.target.value) }
                        >
                        </textarea>
                        <button className={ `btn btn-primary mt-2` } onClick={ onSendMessage }>Отправить</button>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Chat