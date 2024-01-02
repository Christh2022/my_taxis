import PropTypes from "prop-types";
// import UseIcons from "../Hooks/UseIcons";
import "./css/taxisdetail.css";
import UseVariables from "../Hooks/UseVariables";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UseFonction from "../Hooks/UseFonction";
import UseIcons from "../Hooks/UseIcons";

const TaxisDetail = ({ hide }) => {
    const [date, setDate] = useState();
    const [price, setPrice] = useState();
    const [motif, setMotif] = useState();
    const [addMotifDepense, setAddMotifDepense] = useState(false);
    const { tab } = UseVariables();
    const { Plus } = UseIcons();
    const { id } = useParams();
    const { formatterNombre } = UseFonction();

    useEffect(() => {
        setTimeout(() => {
            if (addMotifDepense) {
                const bottomOfPage = document.getElementById("bottomOfPage");
                bottomOfPage &&
                    bottomOfPage.scrollIntoView({ behavior: "smooth" });
            }
        }, 1);
    }, [addMotifDepense]);

    const handleAddMotifDepense = () => {
        setAddMotifDepense(!addMotifDepense);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddMotifDepense();
        const obj = {
            date, price, motif
        }

        console.log(obj);
    };

    return (
        <div
            className={`taxis_list_content content_taxis ${
                hide && "taxis_isActive"
            }`}
        >
            <h1 className="text-center">Taxi Details</h1>
            <div className="content_taxiDetail">
                {tab[0]?.info_entreprise.taxis
                    .filter((item) => item.numeroSerie === id)
                    .map((item) => (
                        <div
                            key={item.numeroSerie}
                            className="taxis_info_detail"
                        >
                            <div className="personol_item_info">
                                <span>Marque : </span>
                                <span>{item.marque}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Modele : </span>
                                <span>{item.modele}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Type : </span>
                                <span>{item.type}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Fabriqué en : </span>
                                <span>{item.madeYear}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Sièges : </span>
                                <span>{item.places}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Carburant : </span>
                                <span>{item.carburant}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Kilométrage : </span>
                                <span>{formatterNombre(item.kilometrage)}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>N° matricule : </span>
                                <span>{item.n_matricule}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Date d&#39;inspection : </span>
                                <span>
                                    {item.date_inspection
                                        .replace(/-/g, " ")
                                        .split(" ")
                                        .reverse()
                                        .join(" / ")}
                                </span>
                            </div>
                            <div className="personol_item_info">
                                <span>Prix d&#39;achat : </span>
                                <span>{formatterNombre(item.price)} XAF</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Date de Fin de l&#39;assurance : </span>
                                <span>{item.assurance_date}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Chauffeur : </span>
                                <span>{item.chauffeur}</span>
                            </div>
                            <div className="personol_item_info">
                                <span>Chauffeur : </span>
                                <span
                                    style={
                                        item.statut === "garage"
                                            ? { color: "rgb(251, 18, 18)" }
                                            : item.statut === "active"
                                            ? { color: "15.000 XAF" }
                                            : {}
                                    }
                                >
                                    {item.statut}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="depense_taxi">
                <h3>Dépenses</h3>
                {!tab[0]?.info_entreprise.taxis
                    .filter((item) => item.numeroSerie === id)
                    .map((item) => {
                        if (item.depense && item.depnse?.length > 0) {
                            return true;
                        } else return false;
                    })[0] ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Montant</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tab[0]?.info_entreprise.taxis
                                    .filter((item) => item.numeroSerie === id)
                                    .map((item) =>
                                        item.depnse?.map((value) => {
                                            <tr key={value.id_depense}>
                                                <td>{value.date}</td>
                                                <td>{value.montant} XAF</td>
                                                <td>{value.motif}</td>
                                            </tr>;
                                        })
                                    )}
                            </tbody>
                        </table>
                        {!addMotifDepense && (
                            <div className="add_depense_detail_taxis">
                                <button onClick={handleAddMotifDepense}>
                                    <span>Ajouter une dépense</span>{" "}
                                    <span>
                                        <Plus />
                                    </span>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <p>
                            {" "}
                            Aucune dépense n&#39;a été éffectué en lien avec ce
                            véhicule
                        </p>
                        {!addMotifDepense && (
                            <div className="add_depense_detail_taxis">
                                <button onClick={handleAddMotifDepense}>
                                    <span>Ajouter une dépense</span>{" "}
                                    <span>
                                        <Plus />
                                    </span>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {addMotifDepense && (
                <div className="form_depense_motif_add">
                    <form onSubmit={handleSubmit}>
                        <div className="input_field">
                            <div className="input_group_motif_depense">
                                <span>Date </span>
                                <input
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="input_group_motif_depense">
                                <span>Montant </span>
                                <input
                                    type="text"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="input_group_motif_depense">
                                <span>Description </span>
                                <textarea
                                    rows="5"
                                    onChange={(e) => setMotif(e.target.value)}
                                />
                            </div>
                        </div>
                        <button id="bottomOfPage">Enregistrez</button>
                    </form>
                </div>
            )}
        </div>
    );
};

TaxisDetail.propTypes = {
    hide: PropTypes.bool,
};

export default TaxisDetail;
