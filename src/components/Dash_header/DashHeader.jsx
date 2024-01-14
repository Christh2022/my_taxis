import UseIcons from "../../Hooks/UseIcons";
import UseVariables from "../../Hooks/UseVariables";
import UserAuth from "../../Hooks/UserAuth";
import "./dashheader.css";

const DashHeader = () => {
    const { Search } = UseIcons();
    const { currentUser } = UserAuth();
    const { tab } = UseVariables();

    
    const user = tab?.find((item) => item.id === currentUser.uid)
    
    return (
        <div className="top_dashboard">
            <div className="info_dash">
                <span>Salut {user?.prenom}</span>
                <h3>Bienvenue sur My TAXI</h3>
            </div>
            <div className="search_dash">
                <div className="content_search">
                    <span>
                        <Search />
                    </span>
                    <input type="text" placeholder="Rechercher ..." />
                </div>
            </div>
        </div>
    );
};

export default DashHeader;
