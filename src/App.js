import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites"
import Home from "./pages/Home"

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
 
    React.useEffect(() => {
         async function fetchData() {
            const cartResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/cart");
            const favoritesResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/favorites");
            const itemsResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/items");
            setCartItems(cartResponse.data);
            setFavoriteItems(favoritesResponse.data);
            setItems(itemsResponse.data);
        }
        fetchData();
    }, []);

    const handleAddToCart = (obj) => {
        try {
            if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id) )) {
                axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/cart/${obj.id}`);
                setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id) ));
            } else {
                axios.post("https://6160a822faa03600179fbb5f.mockapi.io/cart", obj);
                setCartItems((prev) => [ ...prev, obj]);
            }
        } catch (error) {
            alert("Не удалось добавить товар в корзину")
        }
    };

    const onRemoveFromCart = (id) => {
        axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id) ));
    };

    const handleAddToFavorite = async (obj) => {
        try {
            if (favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id) )) {
                axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/favorites/${obj.id}`);
                setFavoriteItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id) ));
            } else {
                const { data } = await axios.post("https://6160a822faa03600179fbb5f.mockapi.io/favorites", obj);
                setFavoriteItems((prev) => [ ...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить товар в избранное")
        }    
    };

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="appWrapper clear">
            {cartOpened && <Drawer 
                items={cartItems} 
                handleCloseCart={() => setCartOpened(false)} 
                onRemove={onRemoveFromCart} /> }
            <Header handleClickCart={() => setCartOpened(true)} />
            <Route path="/favorites" exact>
                <Favorites 
                    items={favoriteItems} 
                    cartItems={cartItems}
                    handleAddToCart={handleAddToCart}
                    handleAddToFavorite={handleAddToFavorite}
                />
            </Route>
            <Route path="/" exact>
                <Home 
                    items={items} 
                    cartItems={cartItems}
                    favoriteItems={favoriteItems}
                    searchValue={searchValue} 
                    setSearchValue={setSearchValue} 
                    onChangeSearchValue={onChangeSearchValue}
                    handleAddToCart={handleAddToCart}
                    handleAddToFavorite={handleAddToFavorite}
                />    
            </Route>
        </div>
    );
}

export default App;
