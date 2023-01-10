import React from 'react'
import style from './chat.module.scss'

const Chat = ({users, messages}) => {
    console.log(users)
    return (
        <div className="container mt-5">
            <div className={ `row align-items-start ${style.allblock}`  }>
                <div className={ `col-2 text-bold border ${style.users}` }>
                    <span>Онлайн ({ users.length }):</span>
                    <ul>
                        {users.map((name, index) => <li key={name}>{name}</li>)}
                    </ul>
                </div>
                <div className={ `col-10 position-relative ${style.chat}` }>
                    
                    <div className={style.blockMessage}>
                        <div className={style.message}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque</div>
                        <div className={style.user}>Test user</div>
                    </div>
                    
                    <div className={style.blockMessage}>
                        <div className={style.message}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque</div>
                        <div className={style.user}>Test user</div>
                    </div>
                    
                    <div className={style.send}>
                        <textarea name="" id="" className={`form-control`} rows="3"></textarea>
                        <button className={`btn btn-primary mt-2`}>Отправить</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Chat