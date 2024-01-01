import PropTypes from "prop-types";
import "./css/taxis.css";
import taxis from "../assets/taxi_right.png";
import bus from "../assets/bus_hiace.png";
import coaster from "../assets/coater_toyata_2.png";
import { useNavigate } from "react-router-dom";
import UseIcons from "../Hooks/UseIcons";

const Taxis = ({ hide }) => {
    const navigate = useNavigate();
    const { Search, Plus } = UseIcons();
    const handleDetail = (id) => {
        navigate(`/taxis/${id}`);
    };

    const handleAddTaxis = ()=>{
        navigate('/taxis/ajout')
    }
    return (
        <div className={`taxis_list_content ${hide && "taxis_isActive"}`}>
            <div className="container_taxis_list">
                <div className="content_taxis">
                    <h1 className="text-center">Taxi Details</h1>
                    <div className="content_taxiDetail">
                        <div className="taxiDetail_header">
                            <div className="research_driver">
                                <span className="icon_research">
                                    <Search />
                                </span>
                                <input type="text" placeholder="Recherche..." />
                            </div>
                            <button className="driver_add" onClick={handleAddTaxis}>
                                <span>Ajouter</span>
                                <span>
                                    <Plus />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <ul id="taxisList" className="taxis_list">
                    <li>
                        <img src={taxis} alt="" />
                        <h5>Benoit 16</h5>
                        <div>
                            <div>
                                <span>Passager : </span>
                                <span>4</span>
                            </div>
                            <div>
                                <span>Status : </span>
                                <span>Garage</span>
                            </div>
                        </div>
                        <button onClick={() => handleDetail(1)}>Détail</button>
                    </li>
                    <li>
                        <img src={bus} alt="" />
                        <h5>Benoit 16</h5>
                        <div>
                            <div>
                                <span>Passager : </span>
                                <span>4</span>
                            </div>
                            <div>
                                <span>Status : </span>
                                <span>Garage</span>
                            </div>
                        </div>
                        <button>Détail</button>
                    </li>
                    <li>
                        <img src={taxis} alt="" />
                        <h5>Benoit 16</h5>
                        <div>
                            <div>
                                <span>Passager : </span>
                                <span>4</span>
                            </div>
                            <div>
                                <span>Status : </span>
                                <span>Garage</span>
                            </div>
                        </div>
                        <button>Détail</button>
                    </li>
                    <li>
                        <img src={coaster} alt="" />
                        <h5>Benoit 16</h5>
                        <div>
                            <div>
                                <span>Passager : </span>
                                <span>4</span>
                            </div>
                            <div>
                                <span>Status : </span>
                                <span>Garage</span>
                            </div>
                        </div>
                        <button>Détail</button>
                    </li>
                    <li>
                        <img src={taxis} alt="" />
                        <h5>Benoit 16</h5>
                        <div>
                            <div>
                                <span>Passager : </span>
                                <span>4</span>
                            </div>
                            <div>
                                <span>Status : </span>
                                <span>Garage</span>
                            </div>
                        </div>
                        <button>Détail</button>
                    </li>
                    <li>
                        <img src={taxis} alt="" />
                        <h5>Benoit 16</h5>
                        <div>
                            <div>
                                <span>Passager : </span>
                                <span>4</span>
                            </div>
                            <div>
                                <span>Status : </span>
                                <span>Garage</span>
                            </div>
                        </div>
                        <button>Détail</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

Taxis.propTypes = {
    hide: PropTypes.bool.isRequired,
};

export default Taxis;
