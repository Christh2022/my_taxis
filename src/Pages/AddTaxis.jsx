import PropTypes from "prop-types";
import "./css/addtaxis.css";
import { useEffect, useState } from "react";
const AddTaxis = ({ hide }) => {
    const [marque, setMarque] = useState();
    const [modele, setModele] = useState();
    const [type, setType] = useState();
    const [madeYear, setMadeYear] = useState();
    const [numeroSerie, setNumeroSerie] = useState();
    const [carburant, setCarburant] = useState();
    const [kilometrage, setKilometrage] = useState();
    const [n_matricule, setN_matricule] = useState();
    const [date_inspection, setDate_inspection] = useState();
    const [achat_date, setAChat_date] = useState();
    const [prix_achat, setPrix_achat] = useState();

    useEffect(() => {
        const obj = {
            marque,
            modele,
            type,
            madeYear,
            numeroSerie,
            carburant,
            kilometrage,
            n_matricule,
            date_inspection,
            achat_date,
            prix_achat
        };
        console.log(obj);
    });
    return (
        <div
            className={`taxis_list_content addtaxis ${
                hide && "taxis_isActive"
            }`}
        >
            <h2>Ajouter un véhicule</h2>

            <form>
                <div className="goup_of_input">
                    <div className="input_gruop">
                        <label htmlFor="marque">Marque du véhicule :</label>
                        <select
                            id="marque"
                            name="marque"
                            onChange={(e) => setMarque(e.target.value)}
                        >
                            <option>veuillez choisisr une marque</option>
                            <option value="toyota">Toyota</option>
                            <option value="Honda">Honda</option>
                            <option value="Ford">Ford</option>
                        </select>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="modele">Modèle :</label>
                        <input type="text" id="modele" name="modele" onChange={(e)=>setModele(e.target.value)} />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="type">Type :</label>
                        <select
                            id="type"
                            name="type"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option>
                                veuillez choisisr un type de voiture
                            </option>
                            <option value="bus_hiace">Bus Hiace</option>
                            <option value="coaster">Coaster</option>
                            <option value="taxis">Taxis</option>
                        </select>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="annee">Année de fabrication (facultatif) :</label>
                        <input type="number" id="annee" name="annee" onChange={(e)=>setMadeYear(e.target.value)} />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="vin">Numéro de série (VIN) :</label>
                        <input type="text" id="vin" name="vin" onChange={(e)=>setNumeroSerie(e.target.value)}/>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="carburant">Type de carburant :</label>
                        <select id="carburant" name="carburant" onChange={(e)=>setCarburant(e.target.value)}>
                            <option>veuillez choisir le carburant utilisé</option>
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
                            onChange={(e)=>setKilometrage(e.target.value)}
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
                            onChange={(e)=>setN_matricule(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_achat">Date d&#39;achat :</label>
                        <input type="date" id="date_achat" name="date_achat" onChange={(e)=>setAChat_date(e.target.value)}/>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_achat">Prix d&#39;achat :</label>
                        <input type="number" id="date_achat" name="date_achat" onChange={(e)=>setPrix_achat(e.target.value)}/>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_inspection">
                            Date de la dernière inspection technique :
                        </label>
                        <input
                            type="date"
                            id="date_inspection"
                            name="date_inspection"
                            onChange={(e)=>setDate_inspection(e.target.value)}
                        />
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="date_assurance">
                            Date d&#39;expiration de l&#39;assurance :
                        </label>
                        <input
                            type="date"
                            id="date_assurance"
                            name="date_assurance"
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
                        <select id="statut" name="statut">
                            <option value="pas_de_chauffeur">
                                Aucun Chauffeur
                            </option>
                            <option value="parking">Mampassi Moukietou</option>
                            <option value="garage">Mampassi Christh</option>
                            <option value="active">Mampassi Roldi</option>
                        </select>
                    </div>
                    <div className="input_gruop">
                        <label htmlFor="statut">Satut :</label>
                        <select id="statut" name="statut">
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
