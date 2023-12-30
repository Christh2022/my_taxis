import { useEffect, useRef, useState } from "react";
import "./css/drivepagedetail.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import UseVariables from "../Hooks/UseVariables";
import UseFonction from "../Hooks/UseFonction";
import UserAuth from "../Hooks/UserAuth";
const DriverPageDetail = ({ hide, show }) => {
    const [tableau, setTableau] = useState([]);
    const [add, setAdd] = useState(false);
    const [recette, setRecette] = useState();
    const [depense, setDepense] = useState();
    const [motifDepense, setMotifDepense] = useState();
    const [date, setDate] = useState();
    const scrollRef = useRef();
    const { id } = useParams();
    const { drivertab } = UseVariables();
    const { currentUser } = UserAuth();
    const navigate = useNavigate();
    const { createTableRecettesDepenses, formatterNombre, addRecette } =
        UseFonction();

    useEffect(() => {
        setTableau(createTableRecettesDepenses(drivertab, id));
    }, []);

    const handleAdd = () => {
        setAdd(!add);
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (date && recette && depense && motifDepense) {
            const newRecette = Number(recette);
            const newDepense = Number(depense);
            const datTab = date.replace(/-/g, " ").split(" ").reverse();
            const newData = {
                day: Number(datTab[0]),
                month: Number(datTab[1]),
                year: Number(datTab[2]),
            };

            if (
                typeof newRecette === "number" &&
                typeof newDepense === "number" &&
                typeof newData === "object"
            ) {
                handleAdd();
                addRecette(
                    newData,
                    newRecette,
                    newDepense,
                    currentUser.uid,
                    id
                );
                toast.success("vous venez de rajouter une recette");
                navigate('/')
            } else
                toast.error(
                    "la recette et les dépenses doivent etre des nombres allant de 0 à l'infini"
                );
        } else toast.error("Tous les champs doivent être remplis");
    };

    return (
        <>
            {show && (
                <div
                    ref={scrollRef}
                    className={` drivepageDetail ${
                        hide && "driver_page_isActive"
                    }`}
                >
                    {drivertab?.length > 0 && (
                        <>
                            <h1 className="drivepageDetail_title">
                                Information Chauffeur
                            </h1>
                            <div className="info_drivepagedetail_info">
                                {drivertab
                                    ?.filter((item) => item.id === id)
                                    ?.map((value) => (
                                        <div
                                            key={value.id}
                                            className="personal_info_driver"
                                        >
                                            <div className="personol_item_info">
                                                <span>Nom : </span>
                                                <span>{value.nom}</span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>Prenom : </span>
                                                <span>{value.prenom}</span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>Age : </span>
                                                <span>{value.age}</span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>Adresse : </span>
                                                <span>{value.adresse}</span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>N° matricule : </span>
                                                <span>{value.matricule}</span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>Téléphone : </span>
                                                <span>{value.tel}</span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>Statut Marital : </span>
                                                <span>
                                                    {value.statut_marital}
                                                </span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>
                                                    Nombre d&#39;enfants :{" "}
                                                </span>
                                                <span>
                                                    {value.nombre_d_enfant}
                                                </span>
                                            </div>
                                            <div className="personol_item_info">
                                                <span>
                                                    Date de prise de Post :{" "}
                                                </span>
                                                <span>
                                                    {
                                                        value.date_de_prise_de_post
                                                    }
                                                </span>
                                            </div>
                                            <div
                                                className={`personol_item_info ${
                                                    value.statut?.toLowerCase() ==
                                                    "actif".toLowerCase()
                                                        ? "isWorking"
                                                        : "isNotWorking"
                                                }`}
                                            >
                                                <span>Statut : </span>
                                                <span>{value.statut}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="info_drivepagedetail_recette">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Recette</th>
                                            <th>Dépense</th>
                                            <th>Bénéfices</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableau?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {item.date?.day +
                                                        "/" +
                                                        item.date?.month +
                                                        "/" +
                                                        item.date?.year}
                                                </td>
                                                <td>
                                                    {formatterNombre(
                                                        item.montantRecette
                                                    )}{" "}
                                                    XAF
                                                </td>
                                                <td>
                                                    {formatterNombre(
                                                        item.montantDepense
                                                    )}{" "}
                                                    XAF
                                                </td>
                                                <td>
                                                    {formatterNombre(
                                                        item.montantRecette -
                                                            item.montantDepense
                                                    )}{" "}
                                                    XAF
                                                </td>
                                                <td>
                                                    <button title="voir les informations sur les dépenses éffectuées">
                                                        info
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="btn_add_day">
                                {add ? (
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="input_group">
                                            <span>Jour</span>
                                            <input
                                                type="date"
                                                onChange={(e) =>
                                                    setDate(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="input_group">
                                            <span>Recette</span>
                                            <input
                                                type="text"
                                                onChange={(e) =>
                                                    setRecette(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="input_group">
                                            <span>Depénse</span>
                                            <input
                                                type="text"
                                                onChange={(e) =>
                                                    setDepense(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="input_group">
                                            <span>Motif du dépense</span>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="30"
                                                rows="10"
                                                onChange={(e) =>
                                                    setMotifDepense(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <button>Enregistrez</button>
                                    </form>
                                ) : (
                                    <button
                                        onClick={handleAdd}
                                        title="ajoutez une date indiquant si l'employé a travailler ou pas "
                                    >
                                        ajoutez +
                                    </button>
                                )}
                            </div>
                            <div className="total_driverpagedetail_recette">
                                <div className="statistique_benefice">
                                    <span>Total des Jours Travaillé : </span>
                                    <span>
                                        {formatterNombre(tableau?.length)}
                                    </span>
                                </div>
                                <div className="statistique_benefice">
                                    <span>Total des Dépenses : </span>
                                    <span>
                                        {tableau && tableau.length > 0
                                            ? formatterNombre(
                                                  tableau.reduce(
                                                      (acc, val) =>
                                                          acc +
                                                          val.montantDepense,
                                                      0
                                                  )
                                              )
                                            : 0}{" "}
                                        XAF
                                    </span>
                                </div>
                                <div className="statistique_benefice">
                                    <span>Total des Bénéfices : </span>
                                    <span>
                                        {tableau && tableau.length > 0
                                            ? formatterNombre(
                                                  tableau.reduce(
                                                      (acc, val) =>
                                                          acc +
                                                          val.montantRecette -
                                                          val.montantDepense,
                                                      0
                                                  )
                                              )
                                            : 0}{" "}
                                        XAF
                                    </span>
                                </div>

                                <div className="statistique_benefice">
                                    <span>Salaire par mois : </span>
                                    <span>
                                        {formatterNombre(
                                            tableau?.length * 4000
                                        )}{" "}
                                        XAF
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

DriverPageDetail.propTypes = {
    hide: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
};

export default DriverPageDetail;
