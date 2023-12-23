import { useEffect, useState } from "react";
import UseGetData from "../../Hooks/UseGetData";
import UseIcons from "../../Hooks/UseIcons";
import UserAuth from "../../Hooks/UserAuth";
import "./dashcontent.css";

const DashContent = () => {
    const { Depense, Revenu, Driver, Recette, Arrow } = UseIcons();
    const { data } = UseGetData("utilisateur");
    const { currentUser } = UserAuth();
    const [tab, setTab] = useState([]);
    const [depense, setDepense] = useState(0);
    const [recette, setRecette] = useState(0);
    const [recetteDay, setRecetteDay] = useState([]);
    const [depenseGreen, setDepenseGreen] = useState(false);
    const [benefice, setBenefice] = useState(0);
    const [conducteur, setConducteur] = useState(0);

    const formatterNombre = (n) => {
        if (n > 999) {
            //convertir le nombre en chaine dde caractères
            const str = String(n);

            //créer un tableau vide
            const parts = [];

            for (let i = str.length; i > 0; i -= 3) {
                //prendre des groupes de 3 chiffres à partir de la droite
                parts.unshift(str.substring(Math.max(0, i - 3), i));
            }
            return parts.join("."); //joindre les parties avec un point
        } else return n;
    };

    useEffect(() => {
        console.log(data);
        const newTab = data?.filter((item) => item.id === currentUser.uid);
        setTab(newTab);

        if (data && data.length > 0) {
            let newTabDepense = [];
            let newTabRecette = [];

            for (let i = 0; i < tab[0]?.info_entreprise.chauffeur.length; i++) {
                newTabDepense.push(
                    tab[0]?.info_entreprise.chauffeur[i]?.depense[i]
                );
                newTabRecette = tab[0]?.info_entreprise.chauffeur[i]?.recette;
            }

            setRecette(
                newTabRecette.reduce((acc, val) => acc + val.montant, 0)
            );

            setDepense(
                newTabDepense.reduce((acc, val) => acc + val.montant, 0) +
                    tab[0]?.info_entreprise.taxis.reduce(
                        (acc, val) => acc + val.price,
                        0
                    )
            );

            setRecetteDay(newTabRecette);
            console.log(newTabRecette[0]);

            // console.log(recette);
            if (recette - depense === 0) {
                setDepenseGreen(false);
            }
            if (recette - depense < 0) {
                setBenefice(depense - recette);
                setDepenseGreen(false);
            } else {
                setDepenseGreen(false);
                setBenefice(recette - depense);
            }
            setConducteur(tab[0]?.info_entreprise.chauffeur.length);
            // console.log(recette);
        } else {
            console.log("erreur");
        }
    }, [data, currentUser.uid, depense, recette, benefice]);
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
                    {recetteDay ?.map((item, index) => (
                        <div key={index} className="card_day_recette_item">
                            <p>
                                {item.date} : {formatterNombre(item.montant)}{" "}
                                XAF
                            </p>
                            <span>
                                <Arrow />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashContent;
