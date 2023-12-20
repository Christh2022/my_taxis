import PropTypes from "prop-types";
import './css/taxis.css'
import taxis from '../assets/taxi_right.png'


const Taxis = ({hide}) => {
    return (
        <div className={`taxis_list_content ${hide && "taxis_isActive"}`}>
            <div className="container_taxis_list">
                <h2>Liste des taxis</h2>
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
}

Taxis.propTypes = {
    hide: PropTypes.bool.isRequired,
};


export default Taxis;
