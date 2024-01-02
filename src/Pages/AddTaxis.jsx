import PropTypes from "prop-types";
import "./css/addtaxis.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UseFonction from "../Hooks/UseFonction";
import UserAuth from "../Hooks/UserAuth";
import UseVariables from "../Hooks/UseVariables";
const AddTaxis = ({ hide }) => {
    const [marque, setMarque] = useState();
    const [modele, setModele] = useState();
    const [type, setType] = useState();
    const [madeYear, setMadeYear] = useState();
    const [places, setPlaces] = useState();
    const [numeroSerie, setNumeroSerie] = useState();
    const [carburant, setCarburant] = useState();
    const [kilometrage, setKilometrage] = useState();
    const [n_matricule, setN_matricule] = useState();
    const [date_inspection, setDate_inspection] = useState();
    const [achat_date, setAChat_date] = useState();
    const [prix_achat, setPrix_achat] = useState();
    const [assurance_date, setAssurance_date] = useState();
    const [chauffeur, setChauffeur] = useState();
    const [statut, setStatut] = useState();
    const navigate = useNavigate();
    const { AddNewCar } = UseFonction();
    const { tab } = UseVariables();
    const { currentUser } = UserAuth();

    const handleSend = (e) => {
        e.preventDefault();

        if (
            marque &&
            modele &&
            type &&
            madeYear &&
            numeroSerie &&
            places &&
            carburant &&
            kilometrage &&
            n_matricule &&
            date_inspection &&
            achat_date &&
            prix_achat &&
            assurance_date &&
            chauffeur &&
            statut
        ) {
            AddNewCar(
                marque,
                modele,
                type,
                madeYear,
                places,
                numeroSerie,
                carburant,
                kilometrage,
                n_matricule,
                date_inspection,
                achat_date,
                prix_achat,
                assurance_date,
                chauffeur,
                statut,
                currentUser.uid
            );
            toast.success("vous venez de rajouter un  nouveau véhicule");
            navigate("/taxis");
        } else toast.error("veuillez remplir tous les champs");
    };

    useEffect(() => {
        console.log(tab[0]?.info_entreprise.chauffeur);
    });

    const senName = (nom , prenom) => {
        const newNom = nom.split(' ')
        const newPrenom = prenom.split(" ")

        return newNom[0] + ' ' + newPrenom[0]
    }

    return (
        <div
            className={`taxis_list_content addtaxis ${
                hide && "taxis_isActive"
            }`}
        >
            <h2>Ajouter un véhicule</h2>

            <form onSubmit={handleSend}>
                <div className="goup_of_input">
                    <div className="input_gruop">
                        <label htmlFor="marque">Marque du véhicule :</label>
                        <select
                            id="marque"
                            name="marque"
                            onChange={(e) => setMarque(e.target.value)}
                        >
                            <option value="">
                                veuillez choisisr une marque
                            </option>
                            <option value="toyota">Toyota</option>
                            <option value="Honda">Honda</option>
                            <option value="Ford">Ford</option>
                        </select>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="modele">Modèle :</label>
                        <input
                            type="text"
                            id="modele"
                            name="modele"
                            onChange={(e) => setModele(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="type">Type :</label>
                        <select
                            id="type"
                            name="type"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">
                                veuillez choisisr un type de voiture
                            </option>
                            <option value="bus">Bus Hiace</option>
                            <option value="coaster">Coaster</option>
                            <option value="taxis">Taxis</option>
                        </select>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="annee">
                            Année de fabrication (facultatif) :
                        </label>
                        <input
                            type="number"
                            id="annee"
                            name="annee"
                            onChange={(e) => setMadeYear(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="vin">Nombre de places :</label>
                        <input
                            type="text"
                            id="vin"
                            name="vin"
                            onChange={(e) => setPlaces(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="vin">Numéro de série (VIN) :</label>
                        <input
                            type="text"
                            id="vin"
                            name="vin"
                            onChange={(e) => setNumeroSerie(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="carburant">Type de carburant :</label>
                        <select
                            id="carburant"
                            name="carburant"
                            onChange={(e) => setCarburant(e.target.value)}
                        >
                            <option value="">
                                veuillez choisir le carburant utilisé
                            </option>
                            <option value="Essence">Essence</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hybride">Hybride</option>
                        </select>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="kilometrage">
                            Kilométrage actuel :
                        </label>
                        <input
                            type="number"
                            id="kilometrage"
                            name="kilometrage"
                            onChange={(e) => setKilometrage(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="immatriculation">
                            Numéro d&#39;immatriculation :
                        </label>
                        <input
                            type="text"
                            id="immatriculation"
                            name="immatriculation"
                            onChange={(e) => setN_matricule(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_achat">Date d&#39;achat :</label>
                        <input
                            type="date"
                            id="date_achat"
                            name="date_achat"
                            onChange={(e) => setAChat_date(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_achat">Prix d&#39;achat :</label>
                        <input
                            type="number"
                            id="date_achat"
                            name="date_achat"
                            onChange={(e) => setPrix_achat(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_inspection">
                            Date de la dernière inspection technique :
                        </label>
                        <input
                            type="date"
                            id="date_inspection"
                            name="date_inspection"
                            onChange={(e) => setDate_inspection(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_assurance">
                            Date d&#39;expiration de l&#39;assurance :
                        </label>
                        <input
                            type="text"
                            id="date_assurance"
                            name="date_assurance"
                            onChange={(e) => setAssurance_date(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="photos_vehicule">
                            Photos du véhicule (facultatif) :
                        </label>
                        <input
                            type="file"
                            id="photos_vehicule"
                            name="photos_vehicule"
                            accept="image/*"
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="documents_scannes">
                            Documents scannés (carte grise, certificats
                            d&#39;entretien, factures) :
                        </label>
                        <input
                            type="file"
                            id="documents_scannes"
                            name="documents_scannes"
                            multiple
                            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="driver_id">Chauffeur :</label>
                        <select
                            id="statut"
                            name="statut"
                            onChange={(e) => setChauffeur(e.target.value)}
                        >
                            <option value="">
                                veuillez choisir un chauffeur
                            </option>
                            <option value="aucun chauffeu">
                                Aucun Chauffeur
                            </option>
                            {tab[0]?.info_entreprise.chauffeur?.filter((value) => value.statut !== 'actif')?.map((item) => (
                                <option value={item.nom} key={item.id}>
                                    {senName(item.nom , item.prenom)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="statut">Satut :</label>
                        <select
                            id="statut"
                            name="statut"
                            onChange={(e) => setStatut(e.target.value)}
                        >
                            <option value="">Veuillez choisir un statut</option>
                            <option value="parking">Parking</option>
                            <option value="garage">Garage</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                </div>

                <button>Ajouter</button>
            </form>
        </div>
    );
};

AddTaxis.propTypes = {
    hide: PropTypes.bool.isRequired,
};

export default AddTaxis;
