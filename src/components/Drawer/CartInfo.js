import React from 'react';

import AppContext from '../../context';
import styles from "./Drawer.module.scss";
import ButtonGreen from "../ButtonGreen";

export const CartInfo = ({ title, image, description }) => {
    const { handleCloseCart } = React.useContext(AppContext);

    return (
        <div className={styles.cartEmpty}>
            <h2 className="d-flex justify-between mb-30">
                { title }
                <img 
                    className={styles.buttonGray} 
                    onClick={handleCloseCart}
                    width={32} 
                    src="images/btn-remove.svg" 
                    alt="Close Cart" />
            </h2>
            <div className={styles.cartEmptyImage}>
                <img width={120} src={image} alt="Cart Info" />
                <p className="opacity-6">{description}</p>
            </div>
            <ButtonGreen text="Вернуться в каталог" onClick={handleCloseCart} />
        </div>
    )
};

export default CartInfo;
