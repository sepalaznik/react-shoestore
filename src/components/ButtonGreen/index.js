import React from 'react';

import styles from "./ButtonGreen.module.scss";

function ButtonGreen(props) {
    return (
        <button className={styles.buttonGreen} onClick={props.onClick}>
            {props.text}
            <img src="./images/icon-arrow.svg" alt="Checkout" />
        </button>
    )
}

export default ButtonGreen;
