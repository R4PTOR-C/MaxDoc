import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br'; // Importe o pacote de localização em português

function Calendario() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        // Simulação de chamada de API
        fetch(`${process.env.REACT_APP_API_URL}/lembretes`)
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
                locale={ptBrLocale} // Configura o idioma para português
            />
        </div>
    );
}

export default Calendario;
