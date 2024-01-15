import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import PropTypes from "prop-types";
import DriverPage from "../Pages/DriverPage";
import DriverPageDetail from "../Pages/DriverPageDetail";
import DriverPageEdit from "../Pages/DriverPageEdit";
import Setting from "../Pages/Setting";
import Taxis from "../Pages/Taxis";
import SignUp from "../Pages/SignUp";
import PrivateRouter from "./PrivateRouter";
import TaxisDetail from "../Pages/TaxisDetail";
import AddTaxis from "../Pages/AddTaxis";
import Clients from "../Pages/Clients";

const Routers = ({ hide, show }) => {
    return (
        <>
            <Routes>
                
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Navigate to="home" />} />
                <Route element={<PrivateRouter />}>
                    <Route path="home" element={<Dashboard hide={hide} show={show} />} />
                    <Route
                        path="chauffeur"
                        element={<DriverPage hide={hide} show={show}  />}
                    />
                    <Route
                        path="clients"
                        element={<Clients hide={hide} show={show}  />}
                    />
                    <Route
                        path="parametres"
                        element={<Setting hide={hide} show={show}  />}
                    />
                    <Route path="taxis" element={<Taxis hide={hide}  show={show} />} />
                    <Route
                        path="taxis/:id"
                        element={<TaxisDetail hide={hide}  />}
                    />
                    <Route
                        path="taxis/ajout"
                        element={<AddTaxis hide={hide}  show={show}  />}
                    />
                    <Route
                        path="chauffeur/:id"
                        element={<DriverPageDetail hide={hide} show={show} />}
                    />
                    <Route
                        path="chauffeur/edit/:id"
                        element={<DriverPageEdit hide={hide} show={show} />}
                    />
                </Route>
                
            </Routes>
        </>
    );
};

Routers.propTypes = {
    hide: PropTypes.bool,
    show: PropTypes.bool,
};

export default Routers;


