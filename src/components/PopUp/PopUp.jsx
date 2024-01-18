import UseIcons from "../../Hooks/UseIcons";
import PropTypes from "prop-types";
import "./popup.css";
import { useEffect, useState } from "react";
import UseVariables from "../../Hooks/UseVariables";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../Firebase.config";
import UseFonction from "../../Hooks/UseFonction";
const PopUp = ({ showImage, setShowImage }) => {
    const { Plus } = UseIcons();
    const [imageTab, setImageTab] = useState([]);
    const [size, setSize] = useState(false);
    const { tab } = UseVariables();
    const { linkTab } = UseFonction();

    useEffect(() => {
        const seeLink = async () => {
            setSize(window.innerWidth > 560);
            console.log(
                tab[0]?.info_entreprise.taxis?.find(
                    (item) => item.numeroSerie === showImage[3]
                )
            );
        };

        seeLink();
    });

    const handleChange = (e) => {
        const value = e.target.files;
        for (let i = 0; i < value.length; i++) {
            const newImage = value[i];
            newImage["id"] = Math.random();
            setImageTab((prevState) => [...prevState, newImage]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageTab?.length > 0) {
            const table = [];
            const car = tab[0]?.info_entreprise.taxis?.find(
                (item) => item.numeroSerie === showImage[3]
            );

            car?.Car_Document.forEach((item) => {
                table.push(item);
            });
            const newTab = await linkTab(imageTab);
            newTab.forEach((item) => {
                table.push(item);
            });
            console.log(table);
            let docs;

            if (showImage[2]?.toLowerCase().includes("document")) {
                docs = "Document";
            } else if (showImage[2]?.toLowerCase().includes("images"))
                docs = "Images";
            const newCar = [];
            tab[0]?.info_entreprise.taxis.forEach((val) => {
                if (val.numeroSerie === showImage[3]) {
                    docs === "Document" &&
                        newCar.push({ ...val, Car_Document: table });
                    docs === "Images" &&
                        newCar.push({ ...val, Car_Images: table });
                } else newCar.push(val);
            });

            await updateDoc(doc(firestore, "utilisateur", tab[0].id), {
                info_entreprise: {
                    taxis: newCar,
                    chauffeur: tab[0]?.info_entreprise.chauffeur,
                },
            });
            toast.success(`vous venez de rajouter un document`);
            setShowImage([false, [], "", ""]);
        } else toast.warn("aucun document n'a été ajouté ");
    };

    const downloadImage = (url, fileName) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    return (
        <div className="popup_table">
            <div className="popup_container">
                <div className="tilte_popup">
                    <h3>Ajoutez {showImage[2]}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input_form_popup">
                            <input
                                type="file"
                                multiple
                                onChange={handleChange}
                            />
                        </div>
                        <button>Enregistrez</button>
                    </form>
                </div>
                <span className="icon_close_popup">
                    <Plus onClick={() => setShowImage([false, [], "", ""])} />
                </span>
                <div
                    className="image_list"
                    style={
                        showImage[1].length <= 4 && size
                            ? { gridTemplateColumns: "repeat(4, 1fr)" }
                            : {}
                    }
                >
                    {showImage[1]
                        ?.sort((a, b) => b.date - a.date)
                        .map((item, index) => (
                            <div key={index} className="img_content">
                                    <img src={item.url} alt="/" onClick={()=>downloadImage(item.url, index)} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

PopUp.propTypes = {
    showImage: PropTypes.array,
    setShowImage: PropTypes.func,
};

export default PopUp;
