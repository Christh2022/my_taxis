import Routers from "../../routers/Routers";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import UseVariables from "../../Hooks/UseVariables";
import { useEffect, useState } from "react";
import UserAuth from "../../Hooks/UserAuth";
import PopUp from "../PopUp/PopUp";

const Layout = () => {
    const { hide, setHide } = UseVariables();
    const location = useLocation();
    const { currentUser } = UserAuth();
    const [show, setShow] = useState(false);
    const [showImage, setShowImage] = useState([false, [], '', ''])

    useEffect(() => {
        if (Object.keys(currentUser || {}).length === 0) {
            setShow(false);
        } else setShow(true);
    }, [currentUser]);

    const HideMenu = () => {
        setHide(!hide);
    };

    return (
        <div>
            {location.pathname.startsWith("/login") ||
            location.pathname.startsWith("/signup") ? (
                <></>
            ) : (
                show && (
                    <NavBar hide={hide} setHide={setHide} HideMenu={HideMenu} />
                )
            )}
            <Routers hide={hide} setHide={setHide} show={show} showImage = { showImage} setShowImage={setShowImage} />
            {showImage[0] && <PopUp showImage = { showImage} setShowImage={setShowImage}/>}
        </div>
    );
};

export default Layout;
