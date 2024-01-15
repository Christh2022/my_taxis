import PropTypes from "prop-types";

const Clients = ({ hide }) => {
    return (
        <div className={`Driver_list_content ${hide && "driver_isActive"}`}>
            Cette page est en maintenance veuillez nous excuser pour le désagrement 
        </div>
    );
};

Clients.propTypes = {
    hide: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
};

export default Clients;
