import PropTypes from "prop-types";
import "./css/setting.css";
import UseIcons from "../Hooks/UseIcons";
import profile from "../assets/profil.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import UseVariables from "../Hooks/UseVariables";
import UserAuth from "../Hooks/UserAuth";

const Setting = ({ hide, show }) => {
    const {
        Calendar,
        Inscript,
        Right,
        User,
        Envelop,
        Map,
        Tel,
        Security,
        Pencil,
    } = UseIcons();
    const { tab } = UseVariables();
    const { currentUser } = UserAuth();
    const [setting, setSetting] = useState("apropos");
    const [pwd, setPwd] = useState(false);
    const showChangePwd = () => {
        setPwd(!pwd);
    };

    const admin = tab?.find((item) => item.id === currentUser.uid);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Votre mot de passe a été modifié avec succes");
        showChangePwd();
    };

    return (
        <>
            {show && (
                <div
                    className={`setting_content ${
                        hide ? "setting_isActive" : ""
                    }`}
                >
                    <div className="container_setting_content">
                        <h2>Paramettre</h2>
                        <div className="box_setting_info">
                            <div className="first_box_setting">
                                <img src={admin?.photoUrl || profile} alt="" />
                                <h6>
                                    {admin?.nom.split(" ")[0] +
                                        " " +
                                        admin?.prenom.split(" ")[0]}
                                </h6>
                                <span>Administrateur</span>
                                <div className="info_admin_left">
                                    <div>
                                        <span>
                                            <Calendar />
                                        </span>
                                        <span>ID :</span>
                                    </div>
                                    <span>{admin?.timestamp.nanoseconds}</span>
                                </div>
                                <div className="info_admin_left">
                                    <div>
                                        <span>
                                            <Inscript />
                                        </span>
                                        <span>Inscription :</span>
                                    </div>
                                    <span>{admin?.timestamp.seconds}</span>
                                </div>
                                <div className="info_admin_left">
                                    <div>
                                        <span>
                                            <Right />
                                        </span>
                                        <span>Statut :</span>
                                    </div>
                                    <span>Activé</span>
                                </div>
                            </div>
                            <div className="second_box_setting">
                                <div className="nav_second_box_setting">
                                    <ul>
                                        <li
                                            onClick={() =>
                                                setSetting("apropos")
                                            }
                                            className={
                                                setting == "apropos" &&
                                                "setting_nav_isActive"
                                            }
                                        >
                                            A propos
                                        </li>
                                        <li
                                            onClick={() =>
                                                setSetting("security")
                                            }
                                            className={
                                                setting == "security" &&
                                                "setting_nav_isActive"
                                            }
                                        >
                                            Securité
                                        </li>
                                        <li
                                            onClick={() =>
                                                setSetting("activity")
                                            }
                                            className={
                                                setting == "activity" &&
                                                "setting_nav_isActive"
                                            }
                                        >
                                            Activité
                                        </li>
                                    </ul>
                                </div>
                                <div className="body_second_box_setting">
                                    {setting == "apropos" && (
                                        <div className="container_bsetting">
                                            <h5>Information Personnelles</h5>
                                            <ul>
                                                <li>
                                                    <div>
                                                        <span>
                                                            <User />
                                                        </span>
                                                        <span>Nom : </span>
                                                    </div>
                                                    <span>
                                                        {admin?.nom.split(
                                                            " "
                                                        )[0] +
                                                            " " +
                                                            admin?.prenom.split(
                                                                " "
                                                            )[0]}
                                                    </span>
                                                </li>
                                                <li>
                                                    <div>
                                                        <span>
                                                            <Envelop />
                                                        </span>
                                                        <span>email</span>
                                                    </div>
                                                    <span>{admin?.email}</span>
                                                </li>
                                                <li>
                                                    <div>
                                                        <span>
                                                            <Map />
                                                        </span>
                                                        <span>Adresse :</span>
                                                    </div>
                                                    <span>
                                                        {" "}
                                                        {admin?.address}
                                                    </span>
                                                </li>
                                                <li>
                                                    <div>
                                                        <span>
                                                            <Tel />
                                                        </span>
                                                        <span>Téléphone</span>
                                                    </div>
                                                    <span>{admin?.tel}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    {setting == "security" && (
                                        <div className="container_bsetting">
                                            <h5>Information Personnelles</h5>
                                            <ul>
                                                <li>
                                                    <div>
                                                        <span>
                                                            <Security />
                                                        </span>
                                                        <span>
                                                            Mot de passe :{" "}
                                                        </span>
                                                    </div>
                                                    <span>*************</span>
                                                </li>
                                                <li
                                                    onClick={showChangePwd}
                                                    className="security_edit"
                                                >
                                                    <div>
                                                        <span>
                                                            <Pencil />
                                                        </span>
                                                        <span>
                                                            modifier le mot de
                                                            passe
                                                        </span>
                                                    </div>
                                                </li>
                                                {pwd && (
                                                    <li className="secure_form_edit">
                                                        <form
                                                            onSubmit={
                                                                handleSubmit
                                                            }
                                                        >
                                                            <div className="input_group_secure">
                                                                <span>
                                                                    Mot de Passe
                                                                </span>
                                                                <input type="password" />
                                                            </div>
                                                            <div className="input_group_secure">
                                                                <span>
                                                                    Confirmation
                                                                    Mot de Passe
                                                                </span>
                                                                <input type="password" />
                                                            </div>

                                                            <button>
                                                                Enregistrez
                                                            </button>
                                                        </form>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                    {setting == "activity" && (
                                        <div className="container_bsetting">
                                            <h5>
                                                Aucune Activité pour le moment
                                            </h5>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

Setting.propTypes = {
    hide: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
};

export default Setting;
