import { useEffect } from "react";
import UseTable from "../../Hooks/UseTable";
import logo from "../../assets/my_taxi.png";
import "./navbar.css";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import UseIcons from "../../Hooks/UseIcons";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase.config";
import { toast } from "react-toastify";

const NavBar = ({ hide, setHide, HideMenu }) => {
    const { table } = UseTable();
    const { Logout, Menu } = UseIcons();
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 561) setHide(false);
        });
    });

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Déconnexion réussie");
            navigate("/login");
        } catch (error) {
            toast.error("une erreur s'est produite");
        }
    };

    return (
        <>
            <div className={`navbar ${hide && "hide"}`}>
                <div className="bar_top">
                    <img src={logo} alt="" />
                    <ul>
                        {table?.map((value) => (
                            <li className="nav_item" key={value.id}>
                                <NavLink
                                    to={value.Path}
                                    className={(navClass) =>
                                        navClass.isActive ? "isActive" : ""
                                    }
                                >
                                    <span className="icon">
                                        <value.Icon />
                                    </span>
                                    <span className="title">{value.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bar_bottom">
                    <div className="logo_content">
                        <img src={logo} alt="" />
                    </div>
                    <div className="content" onClick={handleLogout}>
                        <span className="icon">
                            <Logout />
                        </span>
                        <span className="title">Deconnexion</span>
                    </div>
                </div>
            </div>
            <div
                className={`menu_button ${hide && "getClose"}`}
                onClick={HideMenu}
            >
                <span>
                    <Menu />
                </span>
            </div>
        </>
    );
};

NavBar.propTypes = {
    hide: PropTypes.bool.isRequired,
    setHide: PropTypes.func,
    HideMenu: PropTypes.func,
};

export default NavBar;
