import GoodsCard from './components/GoodsCard';
import styles from './products.module.css';

export default function ProductsPage() {
    const products = [
        { id: 1, image: 'apple.png', name: 'Яблуко', price: 15 },
        { id: 2, image: 'pear.png', name: 'Груша', price: 20 },
        { id: 3, image: 'grape.png', name: 'Виноград', price: 25 },
        { id: 4, image: 'peach.png', name: 'Персик', price: 18 },
        { id: 5, image: 'banana.png', name: 'Банан', price: 21 },
        { id: 6, image: 'orange.png', name: 'Апельсин', price: 24 },
    ];

    return (
        <div className={styles.gallery}>
            {products.map(product => (
                <GoodsCard 
                    key={product.id} 
                    image={product.image} 
                    name={product.name} 
                    price={product.price} 
                />
            ))}
        </div>
    );
}