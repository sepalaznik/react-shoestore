import React from "react";
import styles from "./Card.module.scss";

function Card({ title, imageUrl, price, onClickFavorite, onClickAdd }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleClickAdd = () => {
        onClickAdd({ title, imageUrl, price });
        setIsAdded(!isAdded);
    };
    
    const handleClickFavorite = () => {
        onClickFavorite({ title, imageUrl, price });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img 
                    className="button" 
                    width={32} 
                    onClick={handleClickFavorite} 
                    src={isFavorite ? "./img/heart-liked.svg" : "./img/heart-unliked.svg"} 
                    alt="Like Goods" />
            </div>
            <img width={178} height={150} src={imageUrl} alt="Sneakers" />
            <h3>{title}</h3>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img 
                    className="button" 
                    width={32} 
                    onClick={handleClickAdd} 
                    src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"} 
                    alt="Add Goods to Cart" />
            </div>
        </div>
    );
}

export default Card;
