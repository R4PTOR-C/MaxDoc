import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/calendar.css'; // Import custom CSS

function Lembretes_new() {
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');

    const handleDateClick = (arg) => {
        setData(arg.dateStr);
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'), {
            keyboard: false
        });
        modal.show();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const lembrete = { descricao, data };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/lembretes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lembrete),
            });

            if (response.ok) {
                alert('Lembrete adicionado com sucesso!');
                setDescricao('');
                setData('');
                // Close the modal
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
    };

    return (
        <div className="container mt-5">
            <h2>Adicionar Novo Lembrete</h2>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                weekends={true}
                dayCellClassNames='day-button'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
            />

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Adicionar Novo Lembrete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                <button type="submit" className="btn btn-primary mt-3">Adicionar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lembretes_new;
