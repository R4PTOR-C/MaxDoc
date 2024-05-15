import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [remedios, setRemedios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        //maxdoc.onrender.com
        fetch(`${process.env.REACT_APP_API_URL}/remedios`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(data => {
                setRemedios(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados de remedios:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    return (
        <h1>home</h1>
    );
};

export default Home;
