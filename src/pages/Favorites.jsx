import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
    const { favoriteItems, isItemAdded, handleAddToCart, handleAddToFavorite } = React.useContext(AppContext);

    return (
        <section className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h2>Мои избранные закладки</h2>
            </div>
            <div className="cardContent d-flex">
                {favoriteItems.map((item, index) => (
                    <Card
                        key={index}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        favorited
                        added={isItemAdded(item.id)}
                        onClickAdd={(obj) => handleAddToCart(obj)}
                        onClickFavorite={(obj) => handleAddToFavorite(obj)}
                    />
                ))}
            </div>
        </section>
    )
};

export default Favorites;
