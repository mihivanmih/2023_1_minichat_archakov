import React from 'react'
import socket from '../../socket'

const AuthorizationMain = () => {
    return (
        <>
            <div className="join-block w-25 d-flex justify-content-center flex-column mt-5">
                <input type="text" placeholder={"Room ID"} className={"p-2 w-100 mb-2"} />
                <input type="text" placeholder={"Ваше имя"} className={"p-2 w-100 mb-2"}/>
                <button className={"btn btn-success"}>Войти</button>
            </div>
        </>
    )
}

export default AuthorizationMain