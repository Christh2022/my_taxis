import { useState } from "react";
import Driver from "../components/Driver/Driver";
import "./css/driverpage.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const DriverPage = ({ hide }) => {
    const [add, setAdd] = useState(false);
    const handleAddDriver = () => {
        !add && setAdd(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        add && setAdd(false);
        toast.success("le chauffeur a été ajouté avec success");
    };
    return (
        <div className={`Driver_list_content ${hide && "driver_isActive"}`}>
            <Driver handleAddDriver={handleAddDriver} />
            {add && (
                <div className="add_new_driver" >
                    <h3>Ajoutez un nouveau chauffeur</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input_box_add">
                            <input type="text" placeholder="Nom" />
                        </div>
                        <div className="input_box_add">
                            <input type="text" placeholder="Prenom" />
                        </div>
                        <div className="input_box_add">
                            <input type="text" placeholder="Age" />
                        </div>
                        <div className="input_box_add">
                            <input type="text" placeholder="Nombre d'enfant" />
                        </div>
                        <div className="input_box_add">
                            <input type="text" placeholder="Statut Marital" />
                        </div>
                        <div className="input_box_add">
                            <input
                                type="text"
                                placeholder="Date de prise de post"
                            />
                        </div>
                        <div className="input_box_add">
                            <input type="text" placeholder="statut" />
                        </div>
                        <button>Ajouter </button>
                    </form>
                </div>
            )}
        </div>
    );
};

DriverPage.propTypes = {
    hide: PropTypes.bool.isRequired,
};

export default DriverPage;
