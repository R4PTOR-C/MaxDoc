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

        <>
            <section>
                {/* Topo do site */}
                <div className="topoSite">
                    <div className="interface">
                        <div className="home">
                            <h1>OLÁ, SEJA BEM VINDO NOVAMENTE (USUÁRIO)!</h1>
                        </div>
                        {remedios.map(remedios => (

                            <div className="lembrete">
                            <h2>Próximo Remédio a ser tomado é {remedios.nome}</h2>
                            <p>{remedios.obs}</p>
                            </div>
                            ))}
                        <div className="calendario">
                            <div className="diasSemanas">
                                <p>SEGUNDA</p>
                                <p>TERÇA</p>
                                <p>QUARTA</p>
                                <p>QUINTA</p>
                                <p>SEXTA</p>
                                <p>SÁBADO</p>
                                <p>DOMINGO</p>
                            </div>
                            <div className="numerosDias">
                                <p className="mesanterior">30</p>
                                <p className="mesanterior">31</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="medicines">
                {/* Seção de Medicamentos */}
                <div className="title">
                    <h1><i className='bx bxs-basket'></i>Medicamentos</h1>
                </div>
                <div className="descricao">
                    {remedios.map(remedios => (

                        <ul>
                        <li>
                            <h2>{remedios.nome}</h2>
                            <p>{remedios.obs}</p>
                        </li>

                    </ul>
                        ))}
                </div>
            </section>
        </>
    );
};

export default Home;
