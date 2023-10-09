"use client"
import React, { useEffect, useState } from 'react';

const SomePage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/admin');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Post Data</h1>
            {data ? (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <p>Posted on: {item.Password}</p>
                            <p>Category ID: {item.username}</p>
                            <p>Admin ID: {item.admin_ID}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SomePage;
