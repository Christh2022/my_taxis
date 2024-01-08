import PropTypes from "prop-types";
// import UseIcons from "../Hooks/UseIcons";
import "./css/taxisdetail.css";
import UseVariables from "../Hooks/UseVariables";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UseFonction from "../Hooks/UseFonction";
import UseIcons from "../Hooks/UseIcons";
import UserAuth from "../Hooks/UserAuth";
import { toast } from "react-toastify";

const TaxisDetail = ({ hide }) => {
    const [date, setDate] = useState();
    const [price, setPrice] = useState();
    const [motif, setMotif] = useState();
    const [depenseTab, setDepenseTab] = useState();
    const [addMotifDepense, setAddMotifDepense] = useState(false);
    const { tab, carTab, drivertab } = UseVariables();
    const { Plus, Pencil } = UseIcons();
    const { id } = useParams();
    const {
        formatterNombre,
        handleNewDepense,
        driverAddTaxi,
        changeStatut,
        changeAssuranceDate,
    } = UseFonction();
    const { currentUser } = UserAuth();
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);
    const [changeDate, setChangeDate] = useState(false);
    const [newChauffeur, setChauffeur] = useState();
    const [newSatus, setNewSatus] = useState();
    const [newAs_Date, setNewAs_Dater] = useState();

    useEffect(() => {
        setTimeout(() => {
            if (addMotifDepense) {
                const bottomOfPage = document.getElementById("bottomOfPage");
                bottomOfPage &&
                    bottomOfPage.scrollIntoView({ behavior: "smooth" });
            }
        }, 0);

        setDepenseTab(
            carTab?.filter((item) => item.numeroSerie === id)[0]?.motifDepense
        );
    }, [addMotifDepense, carTab, id]);

    const handleAddMotifDepense = () => {
        setAddMotifDepense(!addMotifDepense);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddMotifDepense();
        handleNewDepense(date, price, motif, currentUser.uid, id);
        toast.success(
            `vous venez de rajouter une depense que vous avez éffectuer pour la date du ${date}`
        );
        navigate("/");
    };

    const handleFindDriver = (id) => {
        return (
            drivertab?.filter((item) => item.id === id)[0]?.nom +
            " " +
            drivertab?.filter((item) => item.id === id)[0]?.prenom
        );
    };

    const handleSort = (transactions) => {
        const sortedData = transactions?.sort((a, b) => {
            const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
            const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);
            return dateB - dateA;
        });

        return sortedData;
    };

    const changeInfo = () => {
        setChange(true);
    };

    const handleSaveDriver = () => {
        if (newChauffeur) {
            driverAddTaxi(newChauffeur, id, currentUser.uid);
        } else {
            toast.warning("aucune modification n'a été éffectuée");
        }
        setChange(false);
    };

    const handleChangeStatus = () => {
        setChangeStatus(false);

        if (newSatus) {
            changeStatut(id, newSatus, currentUser.uid)
            toast.success("vous venez de modifier le statut du véhicule")
        } else toast.warning("aucune modification n'a éffectué");
    };

    const handleChangeDate = () => {
        setChangeDate(false);
        if (newAs_Date) {
            changeAssuranceDate(id, newAs_Date, currentUser.uid)
            toast.success("vous venez de modifier la date de fin de validité de votre assurance")
        } else toast.warning("aucune modification n'a éffectué");
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
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    {!changeDate ? (
                                        <span style={{ fontWeight: "100" }}>
                                            {item.assurance_date}
                                        </span>
                                    ) : (
                                        <input
                                            type="date"
                                            onChange={(e) =>
                                                setNewAs_Dater(e.target.value)
                                            }
                                            className="chauffeurChange"
                                        />
                                    )}
                                    <span
                                        style={{
                                            color: "#fad02c",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {" "}
                                        {!changeDate ? (
                                            <Pencil
                                                onClick={() =>
                                                    setChangeDate(true)
                                                }
                                            />
                                        ) : (
                                            <button className="editebutton_taxis" onClick={handleChangeDate}>
                                                Enregistrez
                                            </button>
                                        )}
                                    </span>
                                </span>
                            </div>
                            <div className="personol_item_info">
                                <span>Chauffeur : </span>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    {!change ? (
                                        <span style={{ fontWeight: "100" }}>
                                            {item.chauffeur !==
                                            "aucun chauffeur disponible"
                                                ? handleFindDriver(
                                                      item.chauffeur
                                                  )
                                                : "Aucun Chauffeur Disponible"}
                                        </span>
                                    ) : (
                                        <select
                                            onChange={(e) =>
                                                setChauffeur(e.target.value)
                                            }
                                            className="chauffeurChange"
                                        >
                                            <option value="">
                                                veuillez choisir un chauffeur
                                            </option>
                                            {drivertab?.filter(
                                                (item) =>
                                                    item.statut.toLowerCase() ===
                                                    "inactif"
                                            )?.length >= 1 ? (
                                                <>
                                                    {drivertab
                                                        ?.filter(
                                                            (item) =>
                                                                item.statut.toLowerCase() ===
                                                                "inactif"
                                                        )
                                                        .map((val) => (
                                                            <option
                                                                key={val.id}
                                                                value={val.id}
                                                            >
                                                                {handleFindDriver(
                                                                    val.id
                                                                )}
                                                            </option>
                                                        ))}{" "}
                                                </>
                                            ) : (
                                                <option value="aucun chauffeur disponible">
                                                    {" "}
                                                    Aucun Chauffeur Disponible
                                                </option>
                                            )}
                                        </select>
                                    )}
                                    <span
                                        style={{
                                            color: "#fad02c",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {" "}
                                        {!change ? (
                                            <Pencil onClick={changeInfo} />
                                        ) : (
                                            <button className="editebutton_taxis" onClick={handleSaveDriver}>
                                                Enregistrez
                                            </button>
                                        )}
                                    </span>
                                </span>
                            </div>
                            <div className="personol_item_info">
                                <span>Statut : </span>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    {<span></span>}
                                    {!changeStatus ? (
                                        <span
                                            style={
                                                item.statut === "garage"
                                                    ? {
                                                          fontWeight: "100",
                                                          color: "rgb(255 0 0)",
                                                      }
                                                    : item.statut === "active"
                                                    ? {
                                                          fontWeight: "100",
                                                          color: "rgb(46, 204, 113)",
                                                      }
                                                    : { fontWeight: "100" }
                                            }
                                        >
                                            {item.statut}
                                        </span>
                                    ) : (
                                        <select
                                            className="chauffeurChange"
                                            onChange={(e) =>
                                                setNewSatus(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Veuillez choisir un statut
                                            </option>
                                            <option value="parking">
                                                Parking
                                            </option>
                                            <option value="garage">
                                                Garage
                                            </option>
                                            <option value="active">
                                                Active
                                            </option>
                                        </select>
                                    )}
                                    <span
                                        style={{
                                            color: "#fad02c",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {" "}
                                        {!changeStatus ? (
                                            <Pencil
                                                onClick={() =>
                                                    setChangeStatus(true)
                                                }
                                            />
                                        ) : (
                                            <button
                                            className="editebutton_taxis"
                                                onClick={handleChangeStatus}
                                            >
                                                Enregistrez
                                            </button>
                                        )}
                                    </span>
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
                                {handleSort(depenseTab)?.map((value, index) => (
                                    <tr key={index}>
                                        <td>
                                            {(String(value.date.day).length > 1
                                                ? value.date?.day
                                                : `0${value.date.day}`) +
                                                "/" +
                                                (String(value.date.month)
                                                    .length > 1
                                                    ? value.date.month
                                                    : `0${value.date.month}`) +
                                                "/" +
                                                value.date?.year}
                                        </td>
                                        <td>
                                            {formatterNombre(value.price)} XAF
                                        </td>
                                        <td>{value.motif}</td>
                                    </tr>
                                ))}
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
