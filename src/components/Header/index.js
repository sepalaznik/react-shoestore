import styles from "./Header.module.scss";

function Header() {
    return (
        <header className={styles.header}>
            <div className="d-flex align-center">
                <img width={84} src="./images/logo-sneakers.svg" alt="My Shop Logo" />
                <div className="headerInfo">
                    <h1 className="text-uppercase">React Shoe Store</h1>
                    <p className="opacity-5">Магазин лучших кросовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li className="mr-30 button">
                    <img width={18} src="./images/icon-cart.svg" alt="Cart" />
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img width={18} src="./images/icon-heart.svg" alt="Favorite Goods" />
                </li>
                <li>
                    <img width={18} src="./images/icon-user.svg" alt="User Account" />
                </li>
            </ul>
        </header>
    );
}

export default Header;
