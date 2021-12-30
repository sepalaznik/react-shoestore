import React from "react";

import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
    const { favoriteItems, isItemAdded, handleAddToCart, handleRemoveFromFavorite } = React.useContext(AppContext);

    return (
        <section className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h2>Мои избранные закладки</h2>
            </div>
            {
                favoriteItems.length > 0 ? <div className="cardContent">
                    {favoriteItems.map((item, index) => (
                        <Card
                            key={index}
                            isItemAdded={(item) => isItemAdded(item.vendorCode)}
                            favorited={true}
                            onClickAdd={(item) => handleAddToCart(item)}
                            onClickFavorite={(item) => handleRemoveFromFavorite(item)}
                            {...item}
                        />
                    ))}
                </div>
                : <div className="d-flex flex-column align-center justify-center">
                    <img width={120} src="images/empty-cart.jpg" alt="Orders is Empty"></img>
                    <p className="opacity-6 mt-40 mb-40">У вас нет избранных товаров!</p>
                </div>
            }
        </section>
    )
};

export default Favorites;
