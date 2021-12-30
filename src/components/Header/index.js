import React from 'react';
import { Link } from "react-router-dom";

import AppContext from "../../context";
import styles from "./Header.module.scss";

function Header() {
    const { totalPrice, handleOpenCart } = React.useContext(AppContext);

    return (
        <header className={styles.header}>
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={84} src="./images/logo-sneakers.svg" alt="My Shop Logo" />
                    <div className="headerInfo">
                        <h1 className="text-uppercase">React Shoe Store</h1>
                        <p className="opacity-5">Магазин лучших кросовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li onClick={handleOpenCart} className="mr-30 button">
                    <img width={18} src="images/icon-cart.svg" alt="Cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width={18} src="images/icon-heart.svg" alt="Favorite Goods" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} src="images/icon-user.svg" alt="User Account" />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
