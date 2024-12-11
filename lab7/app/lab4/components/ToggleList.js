'use client';

import { useState } from 'react';
import styles from '../lab4.module.css';

export default function ToggleList({ title, items, reverseColors }) {
    const [colorClass, setColorClass] = useState(null);

    const toggleColor = () => {
        setColorClass((prev) => {
            if (reverseColors) {
                return prev === styles.green ? styles.blue : styles.green;
            }
            return prev === styles.blue ? styles.green : styles.blue;
        });
    }

    return (
        <div>
            <h3>{title}:</h3>
            <ul className={colorClass} onClick={toggleColor}>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                <b>[JS event]</b>
            </ul>
        </div>
    );
}