import Routers from "../../routers/Routers";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import UseVariables from "../../Hooks/UseVariables";

const Layout = () => {
    const { hide, setHide } = UseVariables();
    const location = useLocation();

    const HideMenu = () => {
        setHide(!hide);
    };

    return (
        <div>
            {location.pathname.startsWith("/login") ? (
                <></>
            ) : (
                <NavBar hide={hide} setHide={setHide} HideMenu={HideMenu} />
            )}
            <Routers hide={hide} setHide={setHide} />
        </div>
    );
};

export default Layout;
