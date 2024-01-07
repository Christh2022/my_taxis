import { useEffect, useState } from "react";
import "./driver.css";
import profil from "../../assets/profil.jpg";
import { useNavigate } from "react-router-dom";
import UseIcons from "../../Hooks/UseIcons";
import PropTypes from "prop-types";
import UseVariables from "../../Hooks/UseVariables";
import UseFonction from "../../Hooks/UseFonction";
import UserAuth from "../../Hooks/UserAuth";

const Driver = ({ handleAddDriver }) => {
    const { Search, Plus, Pencil, Eye, Delete } = UseIcons();
    const [resize, setResize] = useState(true);
    const navigate = useNavigate();
    const { drivertab } = UseVariables();
    const { currentUser } = UserAuth();
    const { handleDeleteDriver } = UseFonction();
    const HandleNavigate = (link) => {
        navigate(link);
    };

    useEffect(() => {
        if (window.innerWidth < 760) {
            setResize(false);
        } else setResize(true);
    }, [resize]);

    return (
        <div className="driver_content_start">
            <h1 className="driver_content_title">Listes des chauffeurs</h1>
            <div className="btn_group_driver">
                <div className="research_driver">
                    <span className="icon_research">
                        <Search />
                    </span>
                    <input type="text" placeholder="Recherche..." />
                </div>
                <button className="driver_add" onClick={handleAddDriver}>
                    <span>Ajouter</span>
                    <span>
                        <Plus />
                    </span>
                </button>
            </div>
            <div className="table_driver">
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            {resize && <th>Numéro</th>}
                            {resize && <th>Adresse</th>}
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivertab?.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={profil} alt="" />
                                    <span>{item.nom}</span>
                                </td>
                                {resize && <td>{item.tel}</td>}
                                {resize && <td>{item.adresse}</td>}
                                <td>{item.statut}</td>
                                <td>
                                    <div className="icon_group">
                                        <span
                                            onClick={() =>
                                                HandleNavigate(
                                                    `/chauffeur/edit/${item.id} `
                                                )
                                            }
                                        >
                                            <Pencil />
                                        </span>
                                        <span
                                            onClick={() =>
                                                HandleNavigate(
                                                    `/chauffeur/${item.id} `
                                                )
                                            }
                                        >
                                            <Eye />
                                        </span>
                                        <span
                                            onClick={() =>
                                                handleDeleteDriver(
                                                    currentUser.uid,
                                                    item.id, item.nom
                                                )
                                            }
                                        >
                                            <Delete />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

Driver.propTypes = {
    handleAddDriver: PropTypes.func,
};

export default Driver;
