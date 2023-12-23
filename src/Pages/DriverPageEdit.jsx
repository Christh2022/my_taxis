import PropTypes from "prop-types";
import "./css/driverpageedit.css";

const DriverPageEdit = ({ hide, show }) => {
    return (
        <>
            {show && <div className={`drivepageEdit ${hide && "driver_page_isActive"}`}>
                <h1>Modifier les informations de l&#39;employé</h1>
                <form>
                    <div className="input_group_edit">
                        <span>Nom </span>
                        <input type="text" />
                    </div>

                    <div className="input_group_edit">
                        <span>Prenom </span>
                        <input type="text" />
                    </div>

                    <div className="input_group_edit">
                        <span>Adresse </span>
                        <input type="text" />
                    </div>

                    <div className="input_group_edit">
                        <span>Téléphone </span>
                        <input type="text" />
                    </div>

                    <div className="input_group_edit">
                        <span>Nombre denfants </span>
                        <input type="text" />
                    </div>

                    <div className="input_group_edit">
                        <span>Satut Marital</span>
                        <select id="genre" name="genre">
                            <option value="homme">Marié</option>
                            <option value="femme">Célibataire</option>
                        </select>
                    </div>

                    <div className="input_group_edit">
                        <span>Satut </span>
                        <select id="genre" name="genre">
                            <option value="homme">En post</option>
                            <option value="femme">En Arret</option>
                        </select>
                    </div>

                    <div className="input_group_edit">
                        <span>Numero de la Matricule </span>
                        <input type="text" />
                    </div>
                    <button>Enregistrez</button>
                </form>
            </div>}
        </>
    );
};

DriverPageEdit.propTypes = {
    hide: PropTypes.bool,
    show: PropTypes.bool,
};

export default DriverPageEdit;
