import React from "react";
import styles from "./Card.module.scss";

function Card(props) {
    const [isAddedGoods, setIsAddedGoods] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleClickAdd = () => {
        setIsAddedGoods(!isAddedGoods);
    };
    const handleClickFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img 
                    className="button" 
                    width={32} 
                    onClick={handleClickFavorite} 
                    src={isFavorite ? "./images/heart-liked.svg" : "./images/heart-unliked.svg"} 
                    alt="Like Goods" />
            </div>
            <img width={178} height={150} src={props.imageUrl} alt="Sneakers" />
            <h3>{props.name}</h3>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{props.price} руб.</b>
                </div>
                <img 
                    className="button" 
                    width={32} 
                    onClick={handleClickAdd} 
                    src={isAddedGoods ? "./images/btn-checked.svg" : "./images/btn-plus.svg"} 
                    alt="Add Goods to Cart" />
            </div>
        </div>
    );
}

export default Card;
