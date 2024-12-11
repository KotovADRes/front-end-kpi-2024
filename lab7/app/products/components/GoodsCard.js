import styles from './GoodsCard.module.css';

export default function GoodsCard({ image, name, price }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={name} className={styles.image} />
            </div>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.price}>{price} грн</p>
        </div>
    );
}