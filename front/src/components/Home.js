import React from "react";

const Home = () => {
    return (

        <>
            <section>
                {/* Topo do site */}
                <div className="topoSite">
                    <div className="interface">
                        <div className="home">
                            <h1>OLÁ, SEJA BEM VINDO NOVAMENTE (USUÁRIO)!</h1>
                        </div>
                        <div className="lembrete">
                            <h2>Próximo Remédio a ser tomado é "Deca-Durabolin"</h2>
                            <p>Deca é uma abreviação comum para o esteroide anabolizante conhecido como Deca-Durabolin. O
                                nome químico completo da substância é decanoato de nandrolona. Este composto é derivado da
                                nandrolona e é frequentemente utilizado para fins terapêuticos e não terapêuticos</p>
                        </div>
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
                    <ul>
                        <li>
                            <h2>Medicamento</h2>
                            <p>Alívio imediato para os sintomas, restaurando o equilíbrio e promovendo bem-estar.</p>
                        </li>
                        <li>
                            <h2>Medicamento</h2>
                            <p>Alívio imediato para os sintomas, restaurando o equilíbrio e promovendo bem-estar.</p>
                        </li>
                        <li>
                            <h2>Medicamento</h2>
                            <p>Alívio imediato para os sintomas, restaurando o equilíbrio e promovendo bem-estar.</p>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Home;
