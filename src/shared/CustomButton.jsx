import classes from "./CustomButtons.module.css";
const CustomButton = ({ render, ...props }) => {
   const { className, ...rest } = props;
   return (
      <button {...rest} className={`${classes.container} ${className}`}>
         <div className={classes.darkshade} />
         <div className={classes.inner}>{render()}</div>
      </button>
   );
};

export default CustomButton;
