import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
    { name: "Мужские кроссовки Nike Blazer Mid Suede", imageUrl: "./images/sneakers/1.jpg", price: 12999 },
    { name: "Мужские кроссовки Nike Air Max 270", imageUrl: "./images/sneakers/2.jpg", price: 14599 },
    { name: "Мужские кроссовки Nike Super Pot", imageUrl: "./images/sneakers/3.jpg", price: 13899 },
    { name: "Кроссовки Puma X Aka Boku Future Rider", imageUrl: "./images/sneakers/4.jpg", price: 15299 },
]

function App() {
    return (
        <div className="appWrapper clear">
            
            <Header />
            <section className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h2>Все кроссовки</h2>
                    <div className="searchBlock d-flex">
                        <img className="cu-p" src="./images/icon-search.svg" alt="Search" />
                        <input placeholder="Поиск..." />
                    </div>
                </div>
                <div className="cardContent d-flex">

                    {arr.map((obj, index) => (
                        <Card
                            key={index + obj.name}
                            name={obj.name}
                            imageUrl={obj.imageUrl}
                            price={obj.price}
                        />
                    ))}

                </div>
            </section>
        </div>
    );
}

//<Drawer />
export default App;
