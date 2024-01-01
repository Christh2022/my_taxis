import PropTypes from "prop-types";
import "./css/taxis.css";
import taxis from "../assets/taxi_right.png";
import bus from "../assets/bus_hiace.png";
import coaster from "../assets/coater_toyata_2.png";
import { useNavigate } from "react-router-dom";
import UseIcons from "../Hooks/UseIcons";
import UseVariables from "../Hooks/UseVariables";

const Taxis = ({ hide }) => {
    const navigate = useNavigate();
    const { Search, Plus } = UseIcons();
    const { carTab } = UseVariables();
    const handleDetail = (id) => {
        navigate(`/taxis/${id}`);
    };

    const handleAddTaxis = ()=>{
        navigate('/taxis/ajout')
    }

    const seeImage = (a)=>{
        if (a?.toLowerCase() === 'taxis'.toLowerCase()) {
          return taxis
        } else if(a?.toLowerCase() === 'bus'.toLowerCase()) {
            return bus
        } else if (a?.toLowerCase() === 'coaster'.toLowerCase()) return coaster
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
                    {carTab?.map((item) => <li key={item.numeroSerie}>
                        <img src={seeImage(item.type)} alt="" />
                        <h5>{item.modele}</h5>
                        <div>
                            <div>
                                <span>Sieges : </span>
                                <span>{item.places}</span>
                            </div>
                            <div>
                                <span>Status : </span>
                                <span>{item.statut}</span>
                            </div>
                        </div>
                        <button onClick={() => handleDetail(`${item.numeroSerie}`)}>Détail</button>
                    </li>)}
                    
                </ul>
            </div>
        </div>
    );
};

Taxis.propTypes = {
    hide: PropTypes.bool.isRequired,
};

export default Taxis;
