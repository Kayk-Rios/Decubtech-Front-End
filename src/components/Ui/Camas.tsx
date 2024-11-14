'use client';
import Image from "next/image";
import ImagemCama1 from "@/assets/Cama1.png";
import ImagemCama2 from "@/assets/Cama2.png";
import ImagemCama3 from "@/assets/Cama3.png";
import Musica from "../../assets/ALERTA2.mp3"
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Howl } from 'howler';


export default function ImagePosicoes() {

  

  const [modalCamaId, setModalCamaId] = useState<number | null>(null); // controla qual modal de cama está aberto
  const [showOptionsModal, setShowOptionsModal] = useState(false); // controla a exibição do modal de opções
  const [vibrateCamaIds, setVibrateCamaIds] = useState<number[]>([]); // controla qual cama está vibrando
  const [timeLeftMap, setTimeLeftMap] = useState<{ [key: number]: number | null }>({}); // tempo restante por leito
  const [positionMap, setPositionMap] = useState<{ [key: number]: string | null }>({}); // posição escolhida para cada leito
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null); // posição temporária selecionada para confirmar
  const [leitos, setLeitos] = useState<any[]>([]); // estado para armazenar os leitos

  const alertSound = new Howl({
    src: [Musica], // Certifique-se de que o caminho está correto
    volume: 0.7,
  });

  useEffect(() => {
    const setorId = Cookies.get('selectedSetor');
    if (setorId) {
      // Faz a requisição para obter os leitos do setor selecionado
      axios.get(`https://back-end-decubtech.onrender.com/leitos/setor/${setorId}`)
        .then(response => {
          setLeitos(response.data); // Atualiza o estado com os leitos retornados pela API
        })
        .catch(error => {
          console.error("Erro ao obter os leitos:", error);
        });
    }
  }, []);

  const toggleModal = (id: number) => {
    setModalCamaId(modalCamaId === id ? null : id); // abre/fecha modal individualmente
    setShowOptionsModal(false); // oculta o modal de opções ao fechar o modal
  };

  const handleShowOptionsModal = () => {
    setShowOptionsModal(true); // exibe o modal de opções
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false); // oculta o modal de opções
  };

  const handleConfirmPosition = (id: number) => {
    if (alertSound.playing()) {
      alertSound.stop();
    }
    setShowOptionsModal(false); // fecha o modal de opções
    setVibrateCamaIds((prev) =>prev.filter((item) => item !== id)) // reinicia a vibração, se já existir
    setPositionMap((prev) => ({ ...prev, [id]: selectedPosition })); // armazena a posição confirmada
    setSelectedPosition(null); // reinicia a posição selecionada
    setTimeLeftMap((prev) => ({ ...prev, [id]: 60 })); // define o tempo restante para 60 para 1 min  / 7200 para  2 horas
    alertSound.pause()
    // Inicia a vibração após 1 minuto
    setTimeout(() => {
      setVibrateCamaIds((prev) => [...prev, id]);
    }, 60000); // 60000 ms = 1 min / 7200000 2 horas
  };

  // Contagem regressiva para cada leito
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftMap((prev) => {
        const newTimeLeftMap = { ...prev };
        for (const id in newTimeLeftMap) {
          if (newTimeLeftMap[id] !== null && newTimeLeftMap[id]! > 0) {
            newTimeLeftMap[id]! -= 1; // decrementa o tempo em 1 segundo
          } else if (newTimeLeftMap[id] === 0) {
            newTimeLeftMap[id] = null; // reseta o tempo ao chegar em zero
            if (alertSound.playing()) {
              alertSound.stop();
            }
            alertSound.play();
            setVibrateCamaIds((prev) => [...prev, parseInt(id)]);
          }
        }
        return newTimeLeftMap;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Definição das imagens para os estados dos leitos
  const leitoImages = {
    initial: ImagemCama1,
    meio: ImagemCama2,
    final: ImagemCama3
  };
  
  // Função para determinar qual imagem exibir com base no tempo
  const getImageBasedOnTime = (leitoId: number) => {
    const timeLeft = timeLeftMap[leitoId];
  
    if (timeLeft === null) {
      // Imagem quando o tempo expirou
      return leitoImages.final;
    }

    const totalTime = 60; // 60 para 1 min  / 120 para 2 horas
    const halfTime = totalTime / 2;
  
    if (timeLeft > halfTime) {
      // Imagem para o tempo inicial até a metade
      return leitoImages.initial;
    } else if (timeLeft >= 0) {
      // Imagem para quando o tempo estiver pela metade
      return leitoImages.meio;
    } else {
      // Imagem quando o tempo expirou
      return leitoImages.initial;
    }
    
  };

  // Formata o tempo em HH:MM:SS
  const formatTime = (time: number | null) => {
    if (time === null) return "Tempo expirado";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {leitos.length > 0 ? (
        leitos.map((leito) => (
          <div key={leito.id} className="flex justify-evenly">
            <Image
              src={getImageBasedOnTime(leito.id)} // Usando a função para obter a imagem correta
              width={150}
              height={150}
              alt={`Imagem da cama ${leito.id}`}
              onClick={() => toggleModal(leito.id)}
              className={vibrateCamaIds.includes(leito.id) ? "vibrate" : ""}
            />
            {modalCamaId === leito.id && (
              <div className="modal-overlay" onClick={() => toggleModal(leito.id)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <span className="close-button" onClick={() => toggleModal(leito.id)}>&times;</span>
                  <h2 className="text-white">Informações do Leito</h2>
                  <h2 className="text-white pt-8">Leito: {leito.number}</h2>
                  <ul className="modal-list">
                    <li className="border-b-2">Posição: {positionMap[leito.id] || "Não selecionada"}</li>
                    <li className="border-b-2">
                      Tempo: {formatTime(timeLeftMap[leito.id])}
                    </li>
                  </ul>
                  <button className="bg-white p-2 rounded-md text-black" onClick={handleShowOptionsModal}>
                    Trocar
                  </button>

                  {/* Modal de Opções */}
                  {showOptionsModal && (
                    <div className="modal-overlay" onClick={handleCloseOptionsModal}>
                      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={handleCloseOptionsModal}>
                          &times;
                        </span>
                        <h2 className="text-black">Escolher opção</h2>
                        <form
                          className="mt-4"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleConfirmPosition(leito.id);
                          }}
                        >
                          <div className="flex flex-col text-white">
                            <label>
                              <input
                                type="radio"
                                name="position"
                                value="Decúbito Dorsal"
                                onChange={(e) => setSelectedPosition(e.target.value)}
                              /> Decúbito Dorsal
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="position"
                                value="Decúbito Ventral"
                                onChange={(e) => setSelectedPosition(e.target.value)}
                              /> Decúbito Ventral
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="position"
                                value="Decúbito Lateral Direito"
                                onChange={(e) => setSelectedPosition(e.target.value)}
                              /> Decúbito Lateral Direito
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="position"
                                value="Decúbito Lateral Esquerdo"
                                onChange={(e) => setSelectedPosition(e.target.value)}
                              /> Decúbito Lateral Esquerdo
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="position"
                                value="Decúbito Fowler"
                                onChange={(e) => setSelectedPosition(e.target.value)}
                              /> Decúbito Fowler
                            </label>
                          </div>
                          <button type="submit" className="bg-white text-black p-2 rounded-md mt-4">
                            Confirmar
                          </button>
              
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Carregando leitos...</p>
      )}
    </div>
  );
}
