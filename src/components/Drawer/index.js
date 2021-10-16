import React from 'react';
import AppContext from "../../context";
import axios from 'axios';

import styles from "./Drawer.module.scss";
import ButtonGreen from "../ButtonGreen";
import CartInfo from "./cart-info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onRemove, items = [] }) {
    const { handleCloseCart, cartItems, setCartItems } = React.useContext(AppContext);
    const [ orderId, setOrderId ] = React.useState(null);
    const [ isOrderComplete, setIsOrderComplete ] = React.useState(false);


    const onClickOrder = async () => {
        try {
            const { data } = await axios.post("https://6160a822faa03600179fbb5f.mockapi.io/orders", {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete("https://6160a822faa03600179fbb5f.mockapi.io/cart/" + item.id);
                await delay(400);
            }
        } catch (error) {
            alert("Не удалось оформить заказ")
        }
    };

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
                        {items.map((obj, index) => 
                            <div key={index} className={styles.cartItem}>
                                <img className="mb-15" width={80} height={68} src={obj.imageUrl} alt="Товар в корзине" />
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
                    <ButtonGreen text="Оформить заказ" onClick={onClickOrder} />
                </div>
                : <CartInfo 
                    title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"} 
                    image={isOrderComplete ? "./images/complete-order.jpg" : "./images/empty-cart.jpg"}
                    description={isOrderComplete ? `Ваш заказ № ${orderId} отправлен в службу доставки!` : "У вас нет товаров в корзине!" }
                    />
                }
            </div>
        </div>
    )
}

export default Drawer;
