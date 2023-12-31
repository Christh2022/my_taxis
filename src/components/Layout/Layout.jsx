import Routers from "../../routers/Routers";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import UseVariables from "../../Hooks/UseVariables";
import { useEffect, useState } from "react";
import UserAuth from "../../Hooks/UserAuth";

const Layout = () => {
    const { hide, setHide } = UseVariables();
    const location = useLocation();
    const { currentUser } = UserAuth();
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (Object.keys(currentUser || {}).length === 0) {
            setShow(false);
        } else setShow(true)
    }, [currentUser]);

    const HideMenu = () => {
        setHide(!hide);
    };

    return (
        <div>
            {location.pathname.startsWith("/login") ? (
                <></>
            ) : (
                show && (<NavBar hide={hide} setHide={setHide} HideMenu={HideMenu} />) 
            )}
            {show && <Routers hide={hide} setHide={setHide} show={show}/>}
        </div>
    );
};

export default Layout;
