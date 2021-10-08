import styles from "./Drawer.module.scss";
import ButtonGreen from "../ButtonGreen";

function Drawer({ handleCloseCart, items = [] }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина
                    <img 
                        className={styles.buttonGray} 
                        onClick={handleCloseCart}
                        width={32} 
                        src="./img/btn-remove.svg" 
                        alt="Close Cart" /></h2>
                <div className={styles.items}>
                    {items.map((obj) => (
                        <div className="cartItem d-flex align-center p-10 mb-20">
                            <img className="mb-15" width={80} height={68} src={obj.imageUrl} alt="Выбранные кроссовки" />
                            <div className="d-flex flex-column mr-20 ml-20">
                                <span className="mb-5">{obj.title}</span>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img className={styles.buttonGray} width={32} src="./img/btn-remove.svg" alt="Remove Goods from Cart" />
                        </div>
                    ))}
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
