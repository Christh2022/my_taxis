import { useState } from "react";
import logo from "../../assets/my_taxi.png";
import image_left from "../../assets/taxi_left.png";
import "./loginform.css";
import { toast } from "react-toastify";
import { auth } from "../../Firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email && !password) {
            toast.error("Veuillez mettre votre mail  et votre mot de passe !");
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Bienvenue Roldi');
                navigate('/home')

            } catch (error) {
                toast.error(error)
            }
        }
    };
    return (
        <>
            <div className="loginform">
                <div className="info">
                    <img src={logo} alt="logo" />
                    <h3>Bienveue Sur My TAXI</h3>
                    <img src={image_left} alt="" />
                </div>
                <form action="" onSubmit={handleLogin}>
                    <h2>Connexion</h2>
                    <div className="form-group">
                        <span>Email</span>
                        <input
                            type="email"
                            placeholder="Entrez votre Identifiant"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <span>Mot de passe</span>
                        <input
                            type="password"
                            placeholder="Entrez votre Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-button">
                        <button>Connexion</button>
                        <span>mot de passe oublié ?</span>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
