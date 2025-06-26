import {Link} from 'react-router-dom'

function Login(){
    return(
        <div className='login-body'>
            <h2>Iniciar Sesión</h2>

            <br></br>

            <div className='card'>
                <form className='login-form'>
                    <p><label>Ingrese correo electrónico</label></p>
                    <p><input type='email' required></input></p>
                    <p><label>Ingrese contraseña</label></p>
                    <p><input type='password' required></input></p>
                </form>
            </div>
            <br></br>
            <button type='submit'>Entrar</button>
            <br></br>
            <p>¿Aún no tienes una cuenta? <Link to="/login">Crear cuenta</Link></p>
        </div>
    );
}

export default Login;