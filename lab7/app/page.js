import Link from 'next/link';
import styles from './page.module.css';

export default function MainPage() {
    return (
        <div className={styles.centered}>
            <div>
                <Link href="./lab4" className={styles.link}>
                    Сторінка №1: Lab4
                </Link>
            </div>
            <div>
                <Link href="./products" className={styles.link}>
                    Сторінка №2: Product Gallery
                </Link>
            </div>
        </div>
    );
}