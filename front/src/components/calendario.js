import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendario() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        // Simulação de chamada de API
        fetch('api/lembretes')
            .then(res => res.json())
            .then(data => {
                const eventosFormatados = data.map(lembrete => ({
                    title: lembrete.descricao,
                    date: lembrete.data
                }));
                setEventos(eventosFormatados);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Calendário de Lembretes</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={eventos}
            />
        </div>
    );
}

export default Calendario;
