import styles from "./ButtonGreen.module.scss";

function ButtonGreen(props) {
    return (
        <button className={styles.buttonGreen}>
            {props.text}
            <img src="./images/icon-arrow.svg" alt="Checkout" />
        </button>
    )
}

export default ButtonGreen;
