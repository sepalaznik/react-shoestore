import styles from "./Drawer.module.scss";
import ButtonGreen from "../ButtonGreen";

function Drawer({ handleCloseCart, onRemove, items = [] }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.visible}>
                {
                    items.length > 0 ? <div className={styles.drawer}>
                        <h2 className="d-flex justify-between mb-30">
                            Корзина
                            <img 
                                className={styles.buttonGray} 
                                onClick={handleCloseCart}
                                width={32} 
                                src="./images/btn-remove.svg" 
                                alt="Close Cart" />
                        </h2>
                        <div className={styles.items}>
                        {items.map((obj) => 
                            <div key={obj.id} className={styles.cartItem}>
                                <img className="mb-15" width={80} height={68} src={obj.imageUrl} alt="Выбранные кроссовки" />
                                <div className="d-flex flex-column mr-20 ml-20">
                                    <span className="mb-5">{obj.name}</span>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img 
                                    className={styles.buttonGray} 
                                    onClick={() => onRemove(obj.id)}
                                    width={32} 
                                    src="./images/btn-remove.svg" 
                                    alt="Remove Goods from Cart" />
                            </div>
                        )}
                    </div> 
                    <div className={styles.totalCost}>
                        <span>Итого:</span>
                        <b>1 520 руб.</b>
                    </div>
                    <ButtonGreen text="Оформить заказ" />
                </div>
                : <div className={styles.cartEmpty}>
                    <h2 className="d-flex justify-between mb-30">
                        Корзина пустая
                        <img 
                            className={styles.buttonGray} 
                            onClick={handleCloseCart}
                            width={32} 
                            src="./images/btn-remove.svg" 
                            alt="Close Cart" />
                    </h2>
                    <div className={styles.cartEmptyImage}>
                        <img width={120} height={120} src="./images/empty-cart.jpg" alt="Cart is Empty" />
                        <p className="opacity-6">У вас нет товаров в корзине</p>
                    </div>
                    <ButtonGreen text="Вернуться в каталог" />
                </div>
                }
            </div>
        </div>
    )
}

export default Drawer;
