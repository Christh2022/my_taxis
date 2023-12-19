import { useEffect, useState } from "react";
import "./driver.css";
import profil from "../../assets/profil.jpg";
import { useNavigate } from "react-router-dom";
import UseIcons from "../../Hooks/UseIcons";
import PropTypes from "prop-types";

const Driver = ({ handleAddDriver }) => {
    const { Search, Plus, Pencil, Eye, Delete } = UseIcons();
    const [resize, setResize] = useState(true);
    const navigate = useNavigate();

    const HandleNavigate = (link) => {
        console.log("hello");
        navigate(link);
    };

    useEffect(() => {
        if (window.innerWidth < 760) {
            setResize(false);
        } else setResize(true);
    }, []);

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
                        <tr>
                            <td>
                                <img src={profil} alt="" />
                                <span>John Doe</span>
                            </td>
                            {resize && <td>12345</td>}
                            {resize && <td>123 Rue de la Fontaine</td>}
                            <td>Actif</td>
                            <td>
                                <div className="icon_group">
                                    <span
                                        onClick={() =>
                                            HandleNavigate("/chauffeur/edit/1")
                                        }
                                    >
                                        <Pencil />
                                    </span>
                                    <span
                                        onClick={() =>
                                            HandleNavigate("/chauffeur/1")
                                        }
                                    >
                                        <Eye />
                                    </span>
                                    <span>
                                        <Delete />
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src={profil} alt="" />
                                <span>John Doe</span>
                            </td>
                            {resize && <td>67890</td>}
                            {resize && <td>456 Avenue des Fleurs</td>}
                            <td>Inactif</td>
                            <td>
                                <div className="icon_group">
                                    <span
                                        onClick={() =>
                                            HandleNavigate("/chauffeur/edit/1")
                                        }
                                    >
                                        <Pencil />
                                    </span>
                                    <span
                                        onClick={() =>
                                            HandleNavigate("/chauffeur/1")
                                        }
                                    >
                                        <Eye />
                                    </span>
                                    <span>
                                        <Delete />
                                    </span>
                                </div>
                            </td>
                        </tr>
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
