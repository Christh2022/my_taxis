import logo from '../../assets/my_taxi.png'
import image_left from '../../assets/taxi_left.png'
import './loginform.css'

const LoginForm = () => {
    return (
        <>
            <div className="loginform">
                <div className="info">
                    <img src={logo} alt="logo" />
                    <h3>Bienveue Sur My TAXI</h3>
                    <img src={image_left} alt="" />
                </div>
                <form action="">
                    <h2>Connexion</h2>
                    <div className="form-group">
                        <span>Email</span>
                        <input type="email" placeholder='Entrez votre Identifiant'/>
                    </div>
                    <div className="form-group">
                        <span>Mot de passe</span>
                        <input type="password" placeholder='Entrez votre Mot de passe' />
                    </div>
                    <div className="form-button">
                        <button>Connexion</button>
                        <span>mot de passe oublié ?</span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginForm;
