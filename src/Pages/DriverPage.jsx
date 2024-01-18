import { useEffect, useState } from "react";
import Driver from "../components/Driver/Driver";
import "./css/driverpage.css";
import PropTypes from "prop-types";
import UseFonction from "../Hooks/UseFonction";
import UserAuth from "../Hooks/UserAuth";
import { toast } from "react-toastify";

const DriverPage = ({ hide, show }) => {
    const [add, setAdd] = useState(false);
    const { addEmployee } = UseFonction();
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [age, setAge] = useState();
    const [tel, setTel] = useState();
    const [adresse, setAdresse] = useState();
    const [nombre_d_enfant, setNombre_d_enfant] = useState();
    const [statut_marital, setStatut_marital] = useState();
    const [date_de_prise_de_post, setDate_de_prise_de_post] = useState();
    const [statut, setStatus] = useState();
    const { currentUser } = UserAuth();
    const [image, setImage] = useState();
    const handleAddDriver = () => {
        !add && setAdd(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !nom &&
            !prenom &&
            !age &&
            !tel &&
            !adresse &&
            !nombre_d_enfant &&
            !statut_marital &&
            !date_de_prise_de_post &&
            !image
        ) {
            toast.warn(" aucun chauffeur n'a été ajouté ");
            setAdd(false);
        } else {
            addEmployee(
                nom,
                prenom,
                age,
                tel,
                adresse,
                nombre_d_enfant,
                statut_marital,
                date_de_prise_de_post,
                statut,
                currentUser.uid,
                image
            );

                nom &&
                prenom &&
                age &&
                tel &&
                adresse &&
                nombre_d_enfant &&
                statut_marital &&
                date_de_prise_de_post &&
                image &&
                setAdd(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            const bottomOfPage = document.getElementById("bottomOfPage");
            bottomOfPage && bottomOfPage.scrollIntoView({ behavior: "smooth" });
        }, 0);
        return () => {};
    }, [add]);

    return (
        <>
            {show && (
                <div
                    className={`Driver_list_content ${
                        hide && "driver_isActive"
                    }`}
                >
                    <Driver handleAddDriver={handleAddDriver} />
                    {add && (
                        <div className="add_new_driver">
                            <h3>Ajoutez un nouveau chauffeur</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Prenom"
                                        onChange={(e) =>
                                            setPrenom(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Age"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Téléphone"
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Nombre d'enfant"
                                        onChange={(e) =>
                                            setNombre_d_enfant(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Statut Marital"
                                        onChange={(e) =>
                                            setStatut_marital(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Date de prise de post"
                                        onChange={(e) =>
                                            setDate_de_prise_de_post(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="Adresse"
                                        onChange={(e) =>
                                            setAdresse(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="input_box_add">
                                    <input
                                        type="text"
                                        placeholder="statut : inactif"
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        disabled
                                    />
                                </div>
                                <div
                                    className="input_box_add"
                                    style={{
                                        background: "#555",
                                        maxWidth: "520px",
                                        padding: ".2rem .0",
                                        borderRadius: ".3rem",
                                        height: "30px",
                                    }}
                                >
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                        multiple
                                        style={{
                                            height: "24px",
                                            padding: "0 .3rem",
                                        }}
                                        accept="image/*"
                                    />
                                </div>
                                <button id="bottomOfPage">Ajouter </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

DriverPage.propTypes = {
    hide: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
};

export default DriverPage;
