import styles from "./Drawer.module.scss";
import ButtonGreen from "../ButtonGreen";

function Drawer() {
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина
                    <img className="btnCartClose buttonGray" width={32} src="./images/btn-remove.svg" alt="Close Cart" /></h2>
                <div className={styles.items}>
                    <div className="cartItem d-flex align-center p-10 mb-20">
                        <img className="mb-15" width={80} height={68} src="./images/sneakers/1.jpg" alt="Выбранные кроссовки" />
                        <div className="d-flex flex-column mr-20 ml-20">
                            <span className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</span>
                            <b>1 520 руб.</b>
                        </div>
                        <img className="btnRemoveItem buttonGray" width={32} src="./images/btn-remove.svg" alt="Remove Goods from Cart" />
                    </div>
                </div>
                <div className={styles.totalCost}>
                    <span>Итого:</span>
                    <div></div>
                    <b>1 520 руб.</b>
                </div>
                <ButtonGreen />
            </div>
        </div>
    )
}

export default Drawer;
