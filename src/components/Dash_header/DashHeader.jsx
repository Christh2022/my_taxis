import UseIcons from "../../Hooks/useIcons";
import './dashheader.css'

const DashHeader = () => {
    const { Search } = UseIcons();
    return (
        <div className="top_dashboard">
            <div className="info_dash">
                <span>Salut Christh</span>
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
