const UseFonction = () => {
    //ecrire le nombre sous forme de 1.000.000
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

    //envoyer la date actuelle
    const handleDay = (a) => {
        let date = new Date();
        let day = date.getDate() - a;
        let month = 1 + date.getMonth();
        let year = date.getFullYear();

        const object = {
            day,
            month,
            year,
        };

        return object;
    };

    //comparer la date de la recette et la date d'aujourd'hui
    const handleDateRecette = (a) => {
        let date = new Date();
        let day = date.getDate();

        if (day === a.day) {
            return "Auj";
        } else if (day === a.day + 1) {
            return "Hier";
        } else if (day === a.day + 2) {
            return "Avant-hier";
        } else return "delete";
    };

    //Gérer les pourcentages des bénéfices du mois
    const handleBenefPercent = (a) => {
        let percent = 0;

        const date = new Date();
        // Mois en JavaScript est indexé de 0 à 11, donc vous devrez ajouter 1 au mois
        // Crée un nouvel objet Date avec l'année et le mois spécifiés et le jour 0 pour obtenir le dernier jour du mois
        // En utilisant getDate(), récupère le nombre de jours dans le mois
        const DayNbrperMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();
        percent = (a / (15000 * DayNbrperMonth)).toFixed(2);

        return percent;
    };

    //vous avez fourni et renvoie un tableau contenant les sommes des montants pour chaque date.
    const regrouperParDate = (tableau) => {
        let montantsParDate = {};

        tableau.forEach((objet) => {
            let dateKey = `${objet.date.year}-${objet.date.month}-${objet.date.day}`;

            if (!montantsParDate[dateKey]) {
                montantsParDate[dateKey] = {
                    montantTotal: objet.montant,
                    date: objet.date,
                };
            } else {
                montantsParDate[dateKey].montantTotal += objet.montant;
            }
        });

        return Object.values(montantsParDate);
    };

    //Créer un tableau comportons les informations de la recette et des dépense
    const createTableRecettesDepenses = (drivertab, id) => {
        if (drivertab) {
            const transactions = [];

            drivertab
                ?.filter((item) => item.id === id)[0]
                ?.recette.forEach((recette) => {
                    const macthingDepense = drivertab
                        ?.filter((item) => item.id === id)[0]
                        .depense.find(
                            (depense) => depense.date.day === recette.date.day
                        );
                    if (macthingDepense) {
                        transactions.push({
                            date: recette.date,
                            montantRecette: recette.montant,
                            montantDepense: macthingDepense.montant,
                        });
                    }
                });

            return transactions;
        }
    };

    //enregistrée un nouvel employé
    const addEmployee = (
        nom,
        prenom,
        age,
        tel,
        nombre_d_enfant,
        statut_marital,
        date_de_prise_de_post,
        statut
    ) => {
        if (
            nom &&
            prenom &&
            age &&
            tel &&
            nombre_d_enfant &&
            statut_marital &&
            date_de_prise_de_post &&
            statut
        ) {
            const newEmploye = {
                nom,
                prenom,
                age,
                tel,
                nombre_d_enfant,
                statut_marital,
                date_de_prise_de_post,
                statut,
            };

            return newEmploye
        }
    };

    return {
        formatterNombre,
        handleDay,
        handleDateRecette,
        handleBenefPercent,
        regrouperParDate,
        createTableRecettesDepenses,
    };
};

export default UseFonction;
