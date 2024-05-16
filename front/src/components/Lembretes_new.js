import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/calendar.css'; // Import custom CSS

function Lembretes_new() {
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);

    // Função para buscar lembretes do banco de dados
    const fetchLembretes = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/lembretes`);
            if (response.ok) {
                const lembretes = await response.json();
                const formattedEvents = lembretes.map(lembrete => ({
                    id: lembrete.id,
                    title: lembrete.descricao,
                    start: lembrete.data
                }));
                setEvents(formattedEvents);
            } else {
                console.error('Erro ao buscar lembretes.');
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
        }
    };

    useEffect(() => {
        fetchLembretes();
    }, []);

    const handleDateClick = (arg) => {
        setData(arg.dateStr);
        setDescricao('');
        setCurrentEvent(null);
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'), {
            keyboard: false
        });
        modal.show();
    };

    const handleEventClick = (clickInfo) => {
        setCurrentEvent(clickInfo.event);
        setDescricao(clickInfo.event.title);
        setData(clickInfo.event.startStr);
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'), {
            keyboard: false
        });
        modal.show();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const lembrete = { descricao, data };

        if (currentEvent) {
            // Editar lembrete existente
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/lembretes/${currentEvent.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(lembrete),
                });

                if (response.ok) {
                    // Atualiza o evento no estado
                    const updatedEvents = events.map(ev => ev.id === currentEvent.id ? { ...ev, title: descricao, start: data } : ev);
                    setEvents(updatedEvents);
                    setCurrentEvent(null);
                    setDescricao('');
                    setData('');
                    const modalElement = document.getElementById('exampleModal');
                    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                } else {
                    alert('Falha ao atualizar lembrete.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar ao servidor.');
            }
        } else {
            // Adicionar novo lembrete
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/lembretes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(lembrete),
                });

                if (response.ok) {
                    const newEvent = await response.json();
                    setEvents([...events, { id: newEvent.id, title: descricao, start: data }]);
                    setDescricao('');
                    setData('');
                    const modalElement = document.getElementById('exampleModal');
                    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                } else {
                    alert('Falha ao adicionar lembrete.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar ao servidor.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Adicionar ou Editar Lembrete</h2>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                weekends={true}
                events={events}
                dayCellClassNames='day-button'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false,
                    omitZeroMinute: true // Adicione esta linha para omitir os minutos zero
                }}
                displayEventTime={false} // Adicione esta linha para remover o tempo dos eventos
            />

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="exampleModalLabel">{currentEvent ? 'Editar Lembrete' : 'Adicionar Novo Lembrete'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Descrição</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Data</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data}
                                        readOnly
                                    />
                                </div>
                                <button type="submit"
                                        className="btn btn-primary mt-3">{currentEvent ? 'Salvar' : 'Adicionar'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lembretes_new;
