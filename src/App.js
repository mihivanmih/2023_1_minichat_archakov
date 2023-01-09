import AuthorizationMain from './Components/authorization/authorizationMain'
import { useReducer } from 'react'
import reducer from './reducer'

function App() {
    
    const [state, dispatch] = useReducer(reducer, {
        isAuth: false
    })
    
    const onLogin = () => {
        dispatch({
            type: 'IS_AUTH',
            payload: true
        })
    }
    
    return (
    <div className="container">
        <div className="row">
            <div className="col d-flex justify-content-center ">
                { !state.isAuth && <AuthorizationMain onLogin={ onLogin }/> }
            </div>
        </div>
    </div>
  );
}

export default App;
