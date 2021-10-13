import Card from "../components/Card";

function Home({ items, cartItems, favoriteItems, searchValue, setSearchValue, onChangeSearchValue, handleAddToCart, handleAddToFavorite }) {
    return (
        <section className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h2>{searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}</h2>
                <div className="searchBlock d-flex">
                    <img
                        className="cu-p"
                        src="./images/icon-search.svg"
                        alt="Search" />
                    {searchValue && <img
                        onClick={() => setSearchValue("")}
                        className="clear"
                        src="./images/btn-remove.svg"
                        alt="Clear Search" />}
                    <input
                        onChange={onChangeSearchValue}
                        value={searchValue}
                        placeholder="Поиск..." />
                </div>
            </div>
            <div className="cardContent d-flex">
                {items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        favorited={favoriteItems.some((obj) => Number(obj.id) === Number(item.id))}
                        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                        onClickAdd={(obj) => handleAddToCart(obj)}
                        onClickFavorite={(obj) => handleAddToFavorite(obj)}
                    />
                ))}
            </div>
        </section>
    )
};

export default Home;
