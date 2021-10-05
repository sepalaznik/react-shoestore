import styles from "./ButtonGreen.module.scss";

function ButtonGreen() {
    return (
        <button className={styles.buttonGreen}>
                Оформить заказ
            <img src="./images/icon-arrow.svg" alt="Checkout" />
        </button>
    )
}

export default ButtonGreen;
