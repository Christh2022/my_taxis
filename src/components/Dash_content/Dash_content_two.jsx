import UseIcons from "../../Hooks/UseIcons";
import "./dashcontenttwo.css";
import logo from "../../assets/profil.jpg";
import { useNavigate } from "react-router-dom";
import UseVariables from "../../Hooks/UseVariables";
import UseFonction from "../../Hooks/UseFonction";

const DashContentTwo = () => {
    const { Benefit, Chart } = UseIcons();
    const navigate = useNavigate();
    const { formatterNombre, handleBenefPercent } = UseFonction();
    const { benefice_mois, drivertab } = UseVariables();

    // useEffect(() => {
    //         console.log(benefice_mois);
    // });

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
                    <h3
                        style={
                            benefice_mois !== 0
                                ? { color: "#2ECC71" }
                                : benefice_mois === 0
                                ? { color: "#fff" }
                                : { color: "#FB1212" }
                        }
                    >
                        {benefice_mois !== 0
                            ? ` ${formatterNombre(benefice_mois)}`
                            : benefice_mois === 0
                            ? formatterNombre(benefice_mois)
                            : `- ${formatterNombre(benefice_mois)}`}{" "}
                        XAF
                    </h3>
                    <span>
                        <span>{handleBenefPercent(benefice_mois)}%</span>
                    </span>
                    <span>
                        <Chart />
                    </span>
                </div>
            </div>
            <div className="dash_box_content">
                <h3>Chauffeurs actifs</h3>
                <ul className="list_dash_driver">
                    {drivertab?.map((item) => (
                        <li key={item.id} className="recette_info_driver">
                            <div className="profil_driver_dash">
                                <img src={logo} alt="" />
                                <div className="info_name">
                                    {item.nom.split(" ").map((value, index) => (
                                        <p key={index}>{value}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="info_recette_dash">
                                <span>
                                    +
                                    {handleBenefPercent(
                                        item.recette.reduce(
                                            (acc, val) => acc + val.montant,
                                            0
                                        ) -
                                            item.depense.reduce(
                                                (acc, val) => acc + val.montant,
                                                0
                                            )
                                    )}
                                    %
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="dash_box_content admin">
                <div className="profil_admin_dash">
                    <img src={logo} alt="" />
                    <h2>Roldi MAMPASSI</h2>
                    <span>Administrateur</span>
                    <button onClick={() => navigate("/parametres")}>
                        Mon Compte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashContentTwo;
