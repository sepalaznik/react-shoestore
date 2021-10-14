import Card from "../components/Card";

function Favorites({ items, cartItems, handleAddToCart, handleAddToFavorite }) {
    return (
        <section className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h2>Мои избранные закладки</h2>
            </div>
            <div className="cardContent d-flex">
                {items.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        favorited
                        added={cartItems.some((obj) => obj.imageUrl === item.imageUrl)}
                        onClickAdd={(obj) => handleAddToCart(obj)}
                        onClickFavorite={(obj) => handleAddToFavorite(obj)}
                    />
                ))}
            </div>
        </section>
    )
};

export default Favorites;
