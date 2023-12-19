import DashHeader from "../components/Dash_header/DashHeader";
import "./css/dashboard.css";
import PropTypes from "prop-types";
import DashContent from "../components/Dash_content/Dash_content";
import DashContentTwo from "../components/Dash_content/Dash_content_two";

const Dashboard = ({ hide }) => {
    return (
        <div className={`dashboard ${hide && "dash_isActive"}`}>
            <DashHeader />
            <DashContent />
            <DashContentTwo />
        </div>
    );
};

Dashboard.propTypes = {
    hide: PropTypes.bool.isRequired,
};

export default Dashboard;
