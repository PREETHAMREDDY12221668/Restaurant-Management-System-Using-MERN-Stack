import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Final_page.module.css';

export const Final_page = () => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        // Fetch the order ID from the backend
        const fetchOrderId = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/generateOrderId'); // Replace with your API URL
                const data = await response.json();
                setOrderId(data.orderId);
            } catch (error) {
                console.error('Error fetching order ID:', error);
            }
        };
        fetchOrderId();
    }, []);

    return (
        <div className={styles.mainDiv}>
            <div>
                <img
                    src="https://c.tenor.com/0AVbKGY_MxMAAAAC/check-mark-verified.gif"
                    alt="green tick"
                />
            </div>
            <h1>THANK YOU FOR YOUR PURCHASE</h1>
            <p>Your order id is: <span>{orderId ?? 'Loading...'}</span></p>
            <div>
                <button onClick={() => navigate('/menu')}>Order More</button>
            </div>
        </div>
    );
};