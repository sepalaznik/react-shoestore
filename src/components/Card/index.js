import React from "react";

import styles from "./Card.module.scss";
import LoadingCard from "./loading";
import AppContext from "../../context";

function Card({ id, vendorCode, name, imageUrl, price, onClickAdd, onClickFavorite, loading = false, favorited = false }) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = { id, vendorCode, name, imageUrl, price }

    const clickAdd = () => {
        onClickAdd(obj);
    };
        
    const clickFavorite = () => {
        onClickFavorite(obj);
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            {
                loading ? <LoadingCard /> : (
                    <>
                        <div className={styles.favorite}>
                            <img 
                                className="button" 
                                width={32} 
                                onClick={clickFavorite} 
                                src={isFavorite ? "images/heart-liked.svg" : "images/heart-unliked.svg"} 
                                alt="Like Goods" 
                            />
                        </div>
                        <img width={178} height={150} src={imageUrl} alt="Sneakers" />
                        <h3>{name}</h3>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            <img 
                                className="button" 
                                width={32} 
                                onClick={clickAdd} 
                                src={isItemAdded(vendorCode) ? "images/btn-checked.svg" : "images/btn-plus.svg"} 
                                alt="Add Goods to Cart" 
                            />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Card;
