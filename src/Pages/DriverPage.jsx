import { useState } from "react";
import Driver from "../components/Driver/Driver";
import "./css/driverpage.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import UseFonction from "../Hooks/UseFonction";
import { firestore } from "../Firebase.config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import UserAuth from "../Hooks/UserAuth";

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
    const handleAddDriver = () => {
        !add && setAdd(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            nom &&
            prenom &&
            age &&
            tel &&
            nombre_d_enfant &&
            statut_marital &&
            date_de_prise_de_post &&
            statut
        ) {
            const newEmploye = {
                id: '156aqdqsdq8dqs6dqsq6d',
                nom,
                prenom,
                age,
                tel,
                nombre_d_enfant,
                statut_marital,
                date_de_prise_de_post,
                statut,
                depense: [],
                recette: []
            };

            const documentSnapshot = await getDocs(
                collection(firestore, "utilisateur")
            );
            try {
                if (documentSnapshot) {
                    const list = [];
                    documentSnapshot.forEach((doc) => {
                        list.push({ ...doc.data() });
                    });
                    const data = list.filter(
                        (item) => item.id === currentUser.uid
                    );

                    const newDriver = [];
                    data[0].info_entreprise.chauffeur.forEach((item) => {
                        newDriver.push(item);
                    });

                    if (
                        data[0].info_entreprise.chauffeur.length ===
                        newDriver.length
                    ) {
                        newDriver.push(newEmploye);
                        toast.success("le chauffeur a été ajouté avec success");
                        // console.log(newDriver);
                        updateDoc(doc(firestore, "utilisateur", currentUser.uid), {
                            info_entreprise: {
                                taxis: [
                                    {
                                        title: "benoit 16",
                                        shortDesc: "",
                                        description: "",
                                        price: 1850000,
                                    },
                                    {
                                        title: "benoit 16",
                                        shortDesc: "",
                                        description: "",
                                        price: 1850000,
                                    },
                                    {
                                        title: "benoit 16",
                                        shortDesc: "",
                                        description: "",
                                        price: 2850000,
                                    },
                                ],
                                chauffeur: newDriver
                            },
                        });
                    }


                    // console.log(documentSnapshot);
                    // add && setAdd(false);
                } else {
                    console.log("Le document spécifié n'existe pas.");
                }
            } catch (e) {}
            // return newEmploye
            // console.log(documentSnapshot.exist, newEmploye);
        } else {
            console.log("error");
        }
    };


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
                                        placeholder="statut"
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    />
                                </div>
                                <button>Ajouter </button>
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
