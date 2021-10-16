import React from "react";
import styles from "./Card.module.scss";
import LoadingCard from "./loading";
import AppContext from "../../context";

function Card({ id, name, imageUrl, price, loading = false }) {
    const { isItemAdded, isItemFavorited, handleAddToCart, handleAddToFavorite } = React.useContext(AppContext);

    const handleClickAdd = () => {
        handleAddToCart({ id, name, imageUrl, price });
    };
    
    const handleClickFavorite = () => {
        handleAddToFavorite({ id, name, imageUrl, price });
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
                                onClick={handleClickFavorite} 
                                src={isItemFavorited(id) ? "./images/heart-liked.svg" : "./images/heart-unliked.svg"} 
                                alt="Like Goods" />
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
                                onClick={handleClickAdd} 
                                src={isItemAdded(id) ? "./images/btn-checked.svg" : "./images/btn-plus.svg"} 
                                alt="Add Goods to Cart" />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Card;
