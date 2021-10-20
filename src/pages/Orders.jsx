import axios from "axios";
import React from "react";

import CardMini from "../components/CardMini";

function Orders() {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/orders");
            setOrders(data.map((obj) => obj.items).flat());
        })();
    }, []);

    // React.useEffect(() => {
    //     async function fetchOrders() {
    //         const { data } = await axios.get("https://6160a822faa03600179fbb5f.mockapi.io/orders");
    //         setOrders(data.reduce((prev, obj) => [ ...prev, ...obj.items], []));
    //     };
    //     fetchOrders()
    // });

    return (
        <section className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h2>Мои покупки</h2>
            </div>
            {
                orders.length > 0 ? <div className="cardContent cardContentOrder">
                {orders.map((item, index) => (
                    <CardMini 
                        key={index}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.price}
                    />
                ))}
            </div> 
            : <div className="d-flex flex-column align-center justify-center">
                <img width={120} src="./images/empty-cart.jpg" alt="Orders is Empty"></img>
                <p className="opacity-6 mt-40 mb-40">Вы ничего не покупали раньше в нашем магазине!</p>
            </div> }
        </section>
    )
};

export default Orders;
