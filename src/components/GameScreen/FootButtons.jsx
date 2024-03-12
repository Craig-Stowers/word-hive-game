import classes from "./FootButtons.module.css";
import shuffleButton from "../../assets/shuffle-btn.png";
import enterButton from "../../assets/enter-btn.png";
import deleteButton from "../../assets/delete-btn.png";

const FootButtons = (props) => {
   return (
      <div className={classes.root}>
         <img src={deleteButton} onClick={props.onDelete} />
         <img src={enterButton} onClick={props.onEnter} />
         <img src={shuffleButton} onClick={props.onShuffle} />
      </div>
   );
};

export default FootButtons;
