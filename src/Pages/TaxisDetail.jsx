import PropTypes from "prop-types";
import UseIcons from "../Hooks/UseIcons";
import "./css/taxisdetail.css";

const TaxisDetail = ({ hide }) => {
    const { Search, Plus } = UseIcons();
    return (
        <div className={`taxis_list_content content_taxis ${hide && "taxis_isActive"}`}>
            <h1 className="text-center">Taxi Details</h1>
            <div className="content_taxiDetail">
                
            </div>
        </div>
    );
};

TaxisDetail.propTypes = {
    hide: PropTypes.bool.isRequired,
};

export default TaxisDetail;
