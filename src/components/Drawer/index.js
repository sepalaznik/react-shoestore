import React from 'react';
import AppContext from "../../context";

import styles from "./Drawer.module.scss";
import ButtonGreen from "../ButtonGreen";
import CartInfo from "./CartInfo";
import CardMini from '../CardMini';

function Drawer({ opened }) {
    const { cartItems, handleCloseCart, orderId, isOrderComplete, onClickOrder, totalPrice } = React.useContext(AppContext);

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayOpened : ""}`}>
            <div className={styles.visibleCart}>
                {
                    cartItems.length > 0 ? <div className={styles.drawer}>
                        <h2 className="d-flex justify-between mb-30">
                            Корзина
                            <img 
                                className={styles.buttonGray} 
                                onClick={handleCloseCart}
                                width={32} 
                                src="images/btn-remove.svg" 
                                alt="Close Cart" />
                        </h2>
                        <div className={styles.items}>
                        {cartItems.map((obj, index) => 
                            <CardMini
                                key={index}
                                name={obj.name}
                                imageUrl={obj.imageUrl}
                                price={obj.price}
                                id={obj.id}
                            />
                        )}
                    </div> 
                    <div className={styles.totalCost}>
                        <span>Итого:</span>
                        <b>{totalPrice} руб.</b>
                    </div>
                    <ButtonGreen text="Оформить заказ" onClick={onClickOrder} />
                </div>
                : <CartInfo 
                    title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"} 
                    image={isOrderComplete ? "images/complete-order.jpg" : "images/empty-cart.jpg"}
                    description={isOrderComplete ? `Ваш заказ № ${orderId} отправлен в службу доставки!` : "У вас нет товаров в корзине!" }
                    />
                }
            </div>
        </div>
    )
}

export default Drawer;
