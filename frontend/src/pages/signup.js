function Signup(){
    return(
        <div className='signup-body'>
            <h2>Crear cuenta</h2>

            <br></br>

        <div className='card'>
            <form className='login-form'>
                <p><label>Nombre completo</label></p>
                <p><input type='text' required></input></p>
                <p><label>Correo electrónico</label></p>
                <p><input type='email' required></input></p>
                <p><label>Contraseña</label></p>
                <p><input type='password' required></input></p>
            </form>
        </div>

        <br></br>

        <button type='submit'>Registrarse</button>
        </div>
    );
}

export default Signup;