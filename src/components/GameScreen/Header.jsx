import classes from "./Header.module.css";
import closeButton from "../../assets/close-btn.png";
import infoButton from "../../assets/info-btn.png";
import homeButton from "../../assets/home-btn.png";
import logo from "../../assets/logo.png";

const Header = () => {
   return (
      <div className={classes.root}>
         <div className={classes.left}>
            <img src={logo} />
         </div>

         <div className={classes.right}>
            <img src={homeButton} />
            <img src={infoButton} />
            <img src={closeButton} />
         </div>
      </div>
   );
};

export default Header;
