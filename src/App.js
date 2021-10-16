import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import AppContext from "./context";
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
    const [isLoading, setIsLoading] = React.useState(true);
 
    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const cartResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/cart");
                const favoritesResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/favorites");
                const itemsResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/items");
    
                setIsLoading(false);
    
                setCartItems(cartResponse.data);
                setFavoriteItems(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert("Ошибка загрузки данных :(");
            }
        }
        fetchData();
    }, []);

    const handleAddToCart = (obj) => {
        try {
            if (cartItems.find((cartObj) => Number(cartObj.id) === Number(obj.id) )) {
                axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/cart/${Number(obj.id)}`);
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
        axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/cart/${Number(id)}`);
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id) ));
    };

    const handleAddToFavorite = (obj) => {
        try {
            if (favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id) )) {
                axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/favorites/${Number(obj.id)}`);
                setFavoriteItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id) ));
            } else {
                axios.post("https://6160a822faa03600179fbb5f.mockapi.io/favorites", obj);
                setFavoriteItems((prev) => [ ...prev, obj]);
            }
        } catch (error) {
            alert("Не удалось добавить товар в избранное")
        }    
    };

    // const handleAddToFavorite = async (obj) => {
    //     try {
    //         if (favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id) )) {
    //             axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/favorites/${Number(obj.id)}`);
    //             setFavoriteItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id) ));
    //         } else {
    //             const { data } = await axios.post("https://6160a822faa03600179fbb5f.mockapi.io/favorites", obj);
    //             setFavoriteItems((prev) => [ ...prev, data]);
    //         }
    //     } catch (error) {
    //         alert("Не удалось добавить товар в избранное")
    //     }    
    // };

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    };

    const isItemFavorited = (id) => {
        return favoriteItems.some((obj) => Number(obj.id) === Number(id));
    };

    const handleCloseCart = () => {
        setCartOpened(false);
    };

    return (
        <AppContext.Provider value={{ 
            items, 
            cartItems, 
            setCartItems,
            favoriteItems, 
            isItemAdded, 
            isItemFavorited, 
            handleAddToCart,
            handleAddToFavorite, 
            setCartOpened,
            handleCloseCart
        }}>
            <div className="appWrapper clear">
                {cartOpened && <Drawer 
                    items={cartItems} 
                    onRemove={onRemoveFromCart} /> }
                <Header handleClickCart={() => setCartOpened(true)} />
                <Route path="/favorites" exact>
                    <Favorites />
                </Route>
                <Route path="/" exact>
                    <Home 
                        items={items} 
                        cartItems={cartItems}
                        favoriteItems={favoriteItems}
                        searchValue={searchValue} 
                        setSearchValue={setSearchValue} 
                        onChangeSearchValue={onChangeSearchValue}
                        isLoading={isLoading}
                    />    
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
