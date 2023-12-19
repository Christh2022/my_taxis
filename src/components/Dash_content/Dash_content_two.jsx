import UseIcons from "../../Hooks/UseIcons";
import "./dashcontenttwo.css";
import logo from '../../assets/profil.jpg'
import { useNavigate } from "react-router-dom";

const DashContentTwo = () => {
    const { Benefit, Chart } = UseIcons();
    const navigate = useNavigate()
    return (
        <div className="Dash_content_two">
            <div className="dash_box_content">
                <span>
                    <span>
                        <Benefit />
                    </span>
                </span>
                <div className="dash_body">
                    <h5>Bénéfices du mois</h5>
                    <h3>300.000 XAF</h3>
                    <span>
                        <span>+2%</span>
                    </span>
                    <span>
                        <Chart />
                    </span>
                </div>
            </div>
            <div className="dash_box_content">
                <h3>Chauffeurs actifs</h3>
                <ul className="list_dash_driver">
                    <li className="recette_info_driver">
                        <div className="profil_driver_dash">
                            <img src={logo} alt="" />
                            <div className="info_name">
                                <p>Mampassi</p>
                                <p>Roldi</p>
                            </div>
                        </div>
                        <div className="info_recette_dash">
                            <span>+150%</span>
                        </div>
                    </li>
                    <li className="recette_info_driver">
                        <div className="profil_driver_dash">
                            <img src={logo} alt="" />
                            <div className="info_name">
                                <p>Mampassi</p>
                                <p>Roldi</p>
                            </div>
                        </div>
                        <div className="info_recette_dash">
                            <span>+150%</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="dash_box_content admin">
                <div className="profil_admin_dash">
                    <img src={logo} alt="" />
                    <h2>Roldi MAMPASSI</h2>
                    <span>Administrateur</span>
                    <button onClick={()=>navigate('/parametres')}>Mon Compte</button>
                </div>
            </div>
        </div>
    );
};

export default DashContentTwo;
