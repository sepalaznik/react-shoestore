import React from "react";
import Card from "../components/Card";

function Home({ items, searchValue, setSearchValue, onChangeSearchValue, isLoading }) {

    const renderCards = () => {
        const filtredItems = items.filter((item) => 
            item.name.toLowerCase().includes(searchValue.toLowerCase()),
        );

        return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                loading={isLoading}
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
                {renderCards()}
            </div>
        </section>
    )
};

export default Home;
