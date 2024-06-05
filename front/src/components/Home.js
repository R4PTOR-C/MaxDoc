import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [lembretes, setLembretes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/lembretes`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(data => {
                setLembretes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados de lembretes:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const handleDateClick = (arg) => {
        console.log(arg.dateStr); // Exibe a data clicada no console
    };

    return (
        <div className="container mt-5">
            <h1>Home</h1>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            {!loading && !error && (
                <>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        events={lembretes.map(lembrete => ({
                            title: lembrete.descricao,
                            date: lembrete.data
                        }))}
                        weekends={true}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
