import classes from "./FootButtons.module.css";
import closeButton from "../../assets/shuffle-btn.png";
import infoButton from "../../assets/enter-btn.png";
import homeButton from "../../assets/delete-btn.png";

const FootButtons = () => {
   return (
      <div className={classes.root}>
         <img src={homeButton} />
         <img src={infoButton} />
         <img src={closeButton} />
      </div>
   );
};

export default FootButtons;
