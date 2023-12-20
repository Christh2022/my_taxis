import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import PropTypes from "prop-types";
import DriverPage from "../Pages/DriverPage";
import DriverPageDetail from "../Pages/DriverPageDetail";
import DriverPageEdit from "../Pages/DriverPageEdit";
import Setting from "../Pages/Setting";
import Taxis from "../Pages/Taxis";

const Routers = ({ hide }) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="home" />} />
                <Route path="home" element={<Dashboard hide={hide} />} />
                <Route path="login" element={<Login />} />
                <Route path="chauffeur" element={<DriverPage  hide={hide}/>} />
                <Route path="parametres" element={<Setting  hide={hide}/>} />
                <Route path="taxis" element={<Taxis  hide={hide}/>} />
                <Route path="chauffeur/:id" element={<DriverPageDetail hide={hide} />} />
                <Route path="chauffeur/edit/:id" element={<DriverPageEdit hide={hide} />} />
            </Routes>
        </>
    );
};

Routers.propTypes = {
    hide: PropTypes.bool.isRequired,
};

export default Routers;
