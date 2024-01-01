import UseIcons from "../../Hooks/UseIcons";
import "./dashcontent.css";
import UseFonction from "../../Hooks/UseFonction";
import UseVariables from "../../Hooks/UseVariables";

const DashContent = () => {
    const { Depense, Revenu, Driver, Recette, Arrow } = UseIcons();

    const { formatterNombre, handleDateRecette, regrouperParDate } =
        UseFonction();
    const { depense, recette, recetteDay, depenseGreen, benefice, conducteur } =
        UseVariables();

    return (
        <div className="card_dash_stat">
            <div className="card_dash_stat_left">
                <div className="card_dash_stat_box">
                    <div className="card_dash_stat_item">
                        <div className="text_dash">
                            <span>Dépenses</span>
                            <h3>{formatterNombre(depense)} XAF</h3>
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
                            <h3>{formatterNombre(recette)} XAF</h3>
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
                            <h3>{formatterNombre(conducteur)}</h3>
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
                            <h3
                                style={
                                    benefice !== 0
                                        ? depenseGreen
                                            ? { color: "#2ECC71" }
                                            : { color: "#FB1212" }
                                        : { color: "white" }
                                }
                            >
                                {benefice !== 0
                                    ? depenseGreen
                                        ? ` ${formatterNombre(benefice)}`
                                        : `- ${formatterNombre(benefice)}`
                                    : 0}{" "}
                                XAF
                            </h3>
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
                    {regrouperParDate(recetteDay).sort((a, b) =>{
                        const dateA = new Date(
                            a.date.year,
                            a.date.month - 1,
                            a.date.day
                        );
                        const dateB = new Date(
                            b.date.year,
                            b.date.month - 1,
                            b.date.day
                        );
                        return dateB - dateA;
                    })?.map(
                        (item, index) =>
                            handleDateRecette(item.date) !== "delete" && (
                                <div
                                    key={index}
                                    className="card_day_recette_item"
                                >
                                    <p>
                                        {handleDateRecette(item.date)} :{" "}
                                        {formatterNombre(item.montantTotal)} XAF
                                    </p>
                                    <span>
                                        <Arrow />
                                    </span>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashContent;
