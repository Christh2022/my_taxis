import UseIcons from "../../Hooks/UseIcons";
import "./dashcontent.css";

const DashContent = () => {
    const { Depense, Revenu, Driver, Recette, Arrow } = UseIcons();
    return (
        <div className="card_dash_stat">
            <div className="card_dash_stat_left">
                <div className="card_dash_stat_box">
                    <div className="card_dash_stat_item">
                        <div className="text_dash">
                            <span>Dépenses</span>
                            <h3>20.000 XAF</h3>
                        </div>
                        <div className="icon_dash">
                            <span>
                                <Depense />
                            </span>
                        </div>
                    </div>
                    <div className="card_dash_stat_item">
                        <div className="text_dash">
                            <span>Revenues</span>
                            <h3>120.000 XAF</h3>
                        </div>
                        <div className="icon_dash">
                            <span>
                                <Revenu />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card_dash_stat_box">
                    <div className="card_dash_stat_item">
                        <div className="text_dash">
                            <span>Conducteurs</span>
                            <h3>1</h3>
                        </div>
                        <div className="icon_dash">
                            <span>
                                <Driver />
                            </span>
                        </div>
                    </div>
                    <div className="card_dash_stat_item">
                        <div className="text_dash">
                            <span>Bénéfices</span>
                            <h3>-1.500.000 XAF</h3>
                        </div>
                        <div className="icon_dash">
                            <span>
                                <Recette />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card_dash_stat_right">
                <h2>Recettes par Jour </h2>
                <div className="card_day_recette_info">
                    <div className="card_day_recette_item">
                        <p>Lundi : 8.000 XAF</p>
                        <span><Arrow/></span>
                    </div>
                    <div className="card_day_recette_item">
                        <p>Lundi : 8.000 XAF</p>
                        <span><Arrow/></span>
                    </div>
                    <div className="card_day_recette_item">
                        <p>Lundi : 8.000 XAF</p>
                        <span><Arrow/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashContent;
