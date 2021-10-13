import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

function Header(props) {
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
                <li onClick={props.handleClickCart} className="mr-30 button">
                    <img width={18} src="./images/icon-cart.svg" alt="Cart" />
                    <span>1205 руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width={18} src="./images/icon-heart.svg" alt="Favorite Goods" />
                    </Link>
                </li>
                <li>
                    <img width={18} src="./images/icon-user.svg" alt="User Account" />
                </li>
            </ul>
        </header>
    );
}

export default Header;
