import React from 'react';

import AppContext from '../../context';
import styles from "./CardMini.module.scss";

function CardMini({ id, vendorCode, name, imageUrl, price }) {
    const { handleRemoveFromCart, cartOpened } = React.useContext(AppContext);

    return (
        <div className={styles.cartItem}>
            <img className={styles.cartItemImg} width={80} height={68} src={imageUrl} alt="Goods in Cart" />
            <div className={styles.cartItemText}>
                <span>{name}</span>
                <b>{price} руб.</b>
            </div>
            { cartOpened ? <img 
                className={styles.buttonGray} 
                onClick={() => handleRemoveFromCart(vendorCode, id)}
                width={32} 
                src="images/btn-remove.svg" 
                alt="Remove Goods from Cart" />
            : "" }
        </div>
    )
}

export default CardMini;
