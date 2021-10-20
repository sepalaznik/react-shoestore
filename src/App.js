import React from "react";
import { Route } from "react-router-dom";
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
                    axios.get("https://6160a822faa03600179fbb5f.mockapi.io/cart"),
                    axios.get("https://6160a822faa03600179fbb5f.mockapi.io/favorites"),
                    axios.get("https://6160a822faa03600179fbb5f.mockapi.io/items")
                ])
    // await Promise.all заменяет последовательность нескольких запросов; но он должен выполнить все свои запросы, иначе ошибка! Иногда лучше использовать отдельные запросы await!
                // const cartResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/cart");
                // const favoritesResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/favorites");
                // const itemsResponse = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/items");
    
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
            const findCartItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findCartItem) {
                await axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/cart/${findCartItem.id}`);
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id) ));
            } else {
                setCartItems((prev) => [ ...prev, obj]);
                const { data } = await axios.post("https://6160a822faa03600179fbb5f.mockapi.io/cart", obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            alert("Не удалось добавить товар в корзину, ошибка связи с сервером");
        }
    };

    const onRemoveFromCart = async (id) => {
        try {
            await axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id) ));
        } catch (error) {
            alert("Не удалось удалить товар из корзины, ошибка связи с сервером");
        }
    };

    // работает с favorities
    const handleAddToFavorite = async (obj) => {
        try {
            if (favoriteItems.find((item) => Number(item.id) === Number(obj.id))) {
                await axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/favorites/${obj.id}`);
                setFavoriteItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id) ));
            } else {
                const { data } = await axios.post("https://6160a822faa03600179fbb5f.mockapi.io/favorites", obj);
                setFavoriteItems((prev) => [ ...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить товар в избранное, ошибка связи с сервером");
        }    
    };

    // работает с home
    const handleAddToFavorite2 = async (obj) => {
        try {
            const findFavoriteItem = favoriteItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findFavoriteItem) {
                await axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/favorites/${findFavoriteItem.id}`);
                setFavoriteItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id) ));
            } else {
                const { data } = await axios.post("https://6160a822faa03600179fbb5f.mockapi.io/favorites", obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            alert("Не удалось добавить товар в избранное, ошибка связи с сервером");
        }    
    };

    const onRemoveFromFavorite = async (id) => {
        try {
            await axios.delete(`https://6160a822faa03600179fbb5f.mockapi.io/favorites/${id}`);
            setFavoriteItems((prev) => prev.filter((item) => Number(item.id) !== Number(id) ));
        } catch (error) {
            alert("Не удалось удалить товар из избранного, ошибка связи с сервером");
        }    
    };

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((item) => Number(item.parentId) === Number(id));
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
            const { data } = await axios.post("https://6160a822faa03600179fbb5f.mockapi.io/orders", {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete("https://6160a822faa03600179fbb5f.mockapi.io/cart/" + item.id);
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
            isItemAdded, 
            handleAddToCart,
            handleAddToFavorite, 
            totalPrice, 
            cartOpened,
            handleOpenCart,
            handleCloseCart,
            onRemoveFromCart,
            orderId,
            isOrderComplete,
            onClickOrder
        }}>
            <div className="appWrapper clear">
                
                <Drawer items={cartItems} opened={cartOpened} />
                <Header />
                <Route path="/orders" exact>
                    <Orders />
                </Route>
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
