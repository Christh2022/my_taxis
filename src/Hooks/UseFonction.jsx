const UseFonction = () => {
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

    const handleDateRecette = (a) => {
        let date = new Date();
        let day = date.getDate();

        if(day === a.day){
            return "aujourd'hui"
        } else if (day === a.day + 1){
            return "hier"
        }else if (day === a.day + 2){
            return "avant-hier"
        } else return "delete";
    };
    return { formatterNombre, handleDay, handleDateRecette };
};

export default UseFonction;
