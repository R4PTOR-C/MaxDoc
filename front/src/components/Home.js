import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [lembretes, setLembretes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [proximoLembrete, setProximoLembrete] = useState(null);

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
                encontrarProximoLembrete(data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados de lembretes:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const encontrarProximoLembrete = (lembretes) => {
        const hoje = new Date();
        const lembretesFuturos = lembretes.filter(lembrete => new Date(lembrete.data) >= hoje);
        const proximo = lembretesFuturos.sort((a, b) => new Date(a.data) - new Date(b.data))[0];
        setProximoLembrete(proximo);
    };

    const handleDateClick = (arg) => {
        console.log(arg.dateStr); // Exibe a data clicada no console
    };

    return (
        <div className="container mt-5">
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            {!loading && !error && (
                <div className="row">
                    <div className="col-md-4">
                        <h2>Próximo Remédio</h2>
                        {proximoLembrete ? (
                            <div>
                                <p><strong>Descrição:</strong> {proximoLembrete.descricao}</p>
                                <p><strong>Data:</strong> {new Date(proximoLembrete.data).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        ) : (
                            <p>Nenhum lembrete futuro encontrado.</p>
                        )}
                    </div>
                    <div className="col-md-8">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            locale={ptBrLocale}
                            dateClick={handleDateClick}
                            events={lembretes.map(lembrete => ({
                                title: lembrete.descricao,
                                date: lembrete.data
                            }))}
                            weekends={true}
                        />
                    </div>

                </div>
            )}
        </div>
    );
};

export default Home;
