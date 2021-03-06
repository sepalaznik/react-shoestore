import React from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import AppContext from "./context";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
     
    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get("https://61cc9a6d198df60017aec175.mockapi.io/cart"),
                    axios.get("https://61cc9a6d198df60017aec175.mockapi.io/favorites"),
                    axios.get("https://61cc9a6d198df60017aec175.mockapi.io/items")
                ])
    // await Promise.all заменяет последовательность нескольких запросов; но он должен выполнить все свои запросы, иначе ошибка! Иногда лучше использовать отдельные запросы await!
                // const cartResponse = await axios.get("https://61cc9a6d198df60017aec175.mockapi.io/cart");
                // const favoritesResponse = await axios.get("https://61cc9a6d198df60017aec175.mockapi.io/favorites");
                // const itemsResponse = await axios.get("https://61cc9a6d198df60017aec175.mockapi.io/items");
    
                setIsLoading(false);
    
                setCartItems(cartResponse.data);
                setFavoriteItems(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert("Ошибка загрузки данных с сервера");
            }
        }
        fetchData();
    }, []);

    const handleAddToCart = async (obj) => {
        try {
            const findCartItem = cartItems.find((item) => Number(item.vendorCode) === Number(obj.vendorCode));
            if (findCartItem) {
                await axios.delete(`https://61cc9a6d198df60017aec175.mockapi.io/cart/${findCartItem.id}`);
                setCartItems((prev) => prev.filter((item) => Number(item.vendorCode) !== Number(obj.vendorCode) ));
            } else {
                const { data } = await axios.post("https://61cc9a6d198df60017aec175.mockapi.io/cart", obj);
                setCartItems((prev) => [ ...prev, data ]);
            }
        } catch (error) {
            alert("Не удалось добавить товар в корзину, ошибка связи с сервером");
        }
    };

    const handleRemoveFromCart = async (vendorCode, id) => {
        try {
            await axios.delete(`https://61cc9a6d198df60017aec175.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.vendorCode) !== Number(vendorCode) ));
        } catch (error) {
            alert("Не удалось удалить товар из корзины, ошибка связи с сервером");
        }
    };

    const handleAddToFavorite = async (obj) => {
        try {
            const findFavoriteItem = favoriteItems.find((item) => Number(item.vendorCode) === Number(obj.vendorCode));
            if (findFavoriteItem) {
                await axios.delete(`https://61cc9a6d198df60017aec175.mockapi.io/favorites/${findFavoriteItem.id}`);
                setFavoriteItems((prev) => prev.filter((item) => Number(item.vendorCode) !== Number(obj.vendorCode) ));
            } else {
                const { data } = await axios.post("https://61cc9a6d198df60017aec175.mockapi.io/favorites", obj);
                setFavoriteItems((prev) => [ ...prev, data ]);
            }
        } catch (error) {
            alert("Не удалось добавить товар в избранное, ошибка связи с сервером");
        }    
    };

    const handleRemoveFromFavorite = async (obj) => {
        try {
            await axios.delete(`https://61cc9a6d198df60017aec175.mockapi.io/favorites/${obj.id}`);
            setFavoriteItems((prev) => prev.filter((item) => Number(item.vendorCode) !== Number(obj.vendorCode) ));
        } catch (error) {
            alert("Не удалось удалить товар из избранного, ошибка связи с сервером");
        }    
    };

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (vendorCode) => {
        return cartItems.some((item) => Number(item.vendorCode) === Number(vendorCode));
    };

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    const handleOpenCart = () => {
        setCartOpened(true);
        setIsOrderComplete(false);
    };

    const handleCloseCart = () => {
        setCartOpened(false);
    };

    const onClickOrder = async () => {
        try {
            const { data } = await axios.post("https://61cc9a6d198df60017aec175.mockapi.io/orders", {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete("https://61cc9a6d198df60017aec175.mockapi.io/cart/" + item.id);
                await delay(400);
            }
        } catch (error) {
            alert("Не удалось оформить заказ, ошибка связи с сервером");
        }
    };

    return (
        <AppContext.Provider value={{ 
            items, 
            cartItems, 
            setCartItems,
            favoriteItems, 
            handleAddToCart,
            handleRemoveFromCart,
            handleAddToFavorite,
            handleRemoveFromFavorite, 
            isItemAdded, 
            totalPrice, 
            cartOpened,
            handleOpenCart,
            handleCloseCart,
            orderId,
            isOrderComplete,
            onClickOrder
        }}>
            <div className="appWrapper clear">
                <Drawer opened={cartOpened} />
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home 
                            searchValue={searchValue} 
                            setSearchValue={setSearchValue} 
                            onChangeSearchValue={onChangeSearchValue}
                            isLoading={isLoading}
                        />    
                    </Route>
                    <Route path="/favorites" exact>
                        <Favorites />
                    </Route>
                    <Route path="/orders" exact>
                        <Orders />
                    </Route>
                </Switch>
            </div>
        </AppContext.Provider>
    );
}

export default App;
