import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { addDays, format, parseISO, getDay, isBefore, isAfter, isEqual } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [lembretes, setLembretes] = useState([]);
    const [proximoRemedio, setProximoRemedio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const diasSemanaMap = {
        'Domingo': 0,
        'Segunda-feira': 1,
        'Terça-feira': 2,
        'Quarta-feira': 3,
        'Quinta-feira': 4,
        'Sexta-feira': 5,
        'Sábado': 6
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/remedios`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(data => {
                if (!data || !Array.isArray(data)) {
                    throw new Error('Dados inválidos recebidos do servidor');
                }

                const eventos = [];
                const hoje = new Date();
                const numDias = 90; // Gerar eventos para os próximos 90 dias

                data.forEach(remedio => {
                    if (remedio.dias_semana && Array.isArray(remedio.dias_semana)) {
                        remedio.dias_semana.forEach(diaSemana => {
                            for (let i = 0; i <= numDias; i++) {
                                const dataAtual = addDays(hoje, i);
                                const diaAtualSemana = getDay(dataAtual);

                                if (diaAtualSemana === diasSemanaMap[diaSemana]) {
                                    const evento = {
                                        title: remedio.nome,
                                        date: format(dataAtual, 'yyyy-MM-dd'),
                                        horario: remedio.horario
                                    };
                                    eventos.push(evento);
                                }
                            }
                        });
                    }
                });

                console.log('Eventos gerados:', eventos); // Adicionando log para verificar eventos gerados
                setLembretes(eventos);
                setLoading(false);

                // Encontrar o próximo evento
                const agora = new Date();
                const proximo = eventos.reduce((proximoEvento, evento) => {
                    const [ano, mes, dia] = evento.date.split('-').map(Number);
                    const [horas, minutos] = evento.horario.split(':').map(Number);
                    const dataEvento = new Date(ano, mes - 1, dia, horas, minutos);

                    if (isAfter(dataEvento, agora) && (!proximoEvento || isBefore(dataEvento, proximoEvento))) {
                        return dataEvento;
                    }

                    return proximoEvento;
                }, null);

                if (proximo) {
                    const proximoRemedio = eventos.find(evento => {
                        const [ano, mes, dia] = evento.date.split('-').map(Number);
                        const [horas, minutos] = evento.horario.split(':').map(Number);
                        const dataEvento = new Date(ano, mes - 1, dia, horas, minutos);
                        return isEqual(dataEvento, proximo);
                    });
                    setProximoRemedio(proximoRemedio);
                }
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
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            {!loading && !error && (
                <div className="row">
                    <div className="col-md-4">
                        {proximoRemedio && (
                            <div>
                                <div className="lembrete">
                                    <h2>Proximo Rémedio a ser tomado é {proximoRemedio.title}</h2>
                                    <p><strong>Data:</strong> {proximoRemedio.date}</p>
                                <p><strong>Horário:</strong> {proximoRemedio.horario}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            locale={ptBrLocale}
                            dateClick={handleDateClick}
                            events={lembretes}
                            weekends={true}
                        />
                    </div>
                </div>
            )}

        </div>


    );
};

export default Home;
