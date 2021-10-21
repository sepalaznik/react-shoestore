import React from "react";

import Card from "../components/Card";
import AppContext from "../context";

function Home({ searchValue, setSearchValue, onChangeSearchValue, isLoading }) {
    const { items, favoriteItems, isItemAdded, handleAddToCart, handleAddToFavorite } = React.useContext(AppContext);

    const renderCards = () => {
        const filtredItems = items.filter((item) => 
            item.name.toLowerCase().includes(searchValue.toLowerCase()),
        );

        return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                loading={isLoading}
                isItemAdded={isItemAdded}
                favorited={favoriteItems.some((obj) => Number(obj.parentId) === Number(item.id))}
                onClickAdd={(item) => handleAddToCart(item)}
                onClickFavorite={(item) => handleAddToFavorite(item)}
                {...item}
            />
        ));
    };

    return (
        <section className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h2>{searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}</h2>
                <div className="searchBlock d-flex">
                    <img
                        className="cu-p"
                        src="images/icon-search.svg"
                        alt="Search" />
                    {searchValue && <img
                        onClick={() => setSearchValue("")}
                        className="clear"
                        src="images/btn-remove.svg"
                        alt="Clear Search" />}
                    <input
                        onChange={onChangeSearchValue}
                        value={searchValue}
                        placeholder="Поиск..." />
                </div>
            </div>
            <div className="cardContent">
                {renderCards()}
            </div>
        </section>
    )
};

export default Home;
