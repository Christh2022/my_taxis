import UseIcons from "../../Hooks/UseIcons";
import PropTypes from "prop-types";
import "./popup.css";
import { useEffect } from "react";
const PopUp = ({ showImage, setShowImage }) => {
    const { Plus } = UseIcons();
    useEffect(() => {
        console.log(showImage[1]);
    });

    return (
        <div className="popup_table">
            <div className="image_list">
                {showImage[1]?.map((item, index) => (
                    <>
                        <div key={index} className="img_content">
                            <img src={item} alt="/" />
                        </div>
                        <div key={index} className="img_content">
                            <img src={item} alt="/" />
                        </div>
                    </>
                ))}
            </div>
            <span className="icon_close_popup">
                <Plus onClick={()=>setShowImage([false, []])}/>
            </span>
        </div>
    );
};

PopUp.propTypes = {
    showImage: PropTypes.array,
    setShowImage: PropTypes.func
};

export default PopUp;
