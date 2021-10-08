import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCardItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
 
    React.useEffect(() => {
        fetch("https://60d62397943aa60017768e77.mockapi.io/items")
        .then((responce) => {
            return responce.json();
        })
        .then((json) => {
            setItems(json);
        });
    });
    
    const handleAddToCart = (obj) => {
        setCardItems(prev => [ ...prev, obj]);
    };

    const handleAddToFavorite = (obj) => {
        console.log(obj);
    };

    return (
        <div className="appWrapper clear">
            {cartOpened && <Drawer items = {cartItems} handleCloseCart={() => setCartOpened(false)} /> }
            <Header handleClickCart={() => setCartOpened(true)} />
            <section className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h2>Все кроссовки</h2>
                    <div className="searchBlock d-flex">
                        <img className="cu-p" src="./img/icon-search.svg" alt="Search" />
                        <input placeholder="Поиск..." />
                    </div>
                </div>
                <div className="cardContent d-flex">

                    {items.map((item) => (
                        <Card
                            key={item.id}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            onClickAdd={(obj) => handleAddToCart(obj)}
                            onClickFavorite={(obj) => handleAddToFavorite(obj)}
                        />
                    ))}

                </div>
            </section>
        </div>
    );
}

export default App;
