
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

  

  const [modalCamaId, setModalCamaId] = useState<number | null>(null); 
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [vibrateCamaIds, setVibrateCamaIds] = useState<number[]>([]); 
  const [timeLeftMap, setTimeLeftMap] = useState<{ [key: number]: number | null }>({}); 
  const [positionMap, setPositionMap] = useState<{ [key: number]: string | null }>({});
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null); 
  const [leitos, setLeitos] = useState<any[]>([]); 
  const [externalLeitos, setExternalLeitos] = useState<any[]>([]); 

  const alertSound = new Howl({
    src: [Musica], 
    volume: 0.7,
  });

  useEffect(() => {
   
    const selectedSetor = Cookies.get('selectedSetor');
    const selectedExternalSetor = Cookies.get('selectedExternalSetor'); 
    const username = Cookies.get('username');

    if (selectedSetor) {
      // Requisição para leitos internos da nossa api
      axios.get(`https://back-end-decubtech.onrender.com/leitos/setor/${selectedSetor}`)
        .then(response => {
          setLeitos(response.data);
        })
        .catch(error => {
          console.error("Erro ao obter os leitos internos:", error);
        });
    }
    if (selectedExternalSetor && username) {
      // Requisição para leitos externos internos da api de terceiros
      axios.post(`https://back-end-decubtech.onrender.com/external/leitos/${selectedExternalSetor}`, { username })
        .then(response => {
          setExternalLeitos(response.data);
        })
        .catch(error => {
          console.error("Erro ao obter os leitos externos:", error);
        });
    }

  }, []);



  const toggleModal = (id: number) => {
    setModalCamaId(modalCamaId === id ? null : id);
    setShowOptionsModal(false);
  };

  const handleShowOptionsModal = () => {
    setShowOptionsModal(true);
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false);
  };

  const handleConfirmPosition = (id: number) => {
    if (alertSound.playing()) {
      alertSound.stop();
    }
    setShowOptionsModal(false); 
    setVibrateCamaIds((prev) =>prev.filter((item) => item !== id)) 
    setPositionMap((prev) => ({ ...prev, [id]: selectedPosition })); 
    setSelectedPosition(null);
    setTimeLeftMap((prev) => ({ ...prev, [id]: 60 })); // define o tempo restante para 60 para 1 min  / 7200 para  2 horas
    alertSound.pause()
  
    setTimeout(() => {
      setVibrateCamaIds((prev) => [...prev, id]);
    }, 60000);  // 60000 ms = 1 min / 7200000 2 horas
  };


  useEffect(() => {


    const savedTimeLeftMap = JSON.parse(localStorage.getItem('timeLeftMap') || '{}');
    if (savedTimeLeftMap) {
      setTimeLeftMap(savedTimeLeftMap);
    }
  
    const interval = setInterval(() => {
      setTimeLeftMap((prev) => {
        const newTimeLeftMap = { ...prev };
        for (const id in newTimeLeftMap) {
          if (newTimeLeftMap[id] !== null && newTimeLeftMap[id]! > 0) {
            newTimeLeftMap[id]! -= 1; 
          } else if (newTimeLeftMap[id] === 0) {
            newTimeLeftMap[id] = null;
            if (alertSound.playing()) {
              alertSound.stop();
            }
            alertSound.play();
            setVibrateCamaIds((prev) => [...prev, parseInt(id)]);
          }
        }
        localStorage.setItem('timeLeftMap', JSON.stringify(newTimeLeftMap));
        return newTimeLeftMap;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  const leitoImages = {
    initial: ImagemCama1,
    meio: ImagemCama2,
    final: ImagemCama3
  };
  
  
  const getImageBasedOnTime = (leitoId: number) => {
    const timeLeft = timeLeftMap[leitoId];
  
    if (timeLeft === null) {
      return leitoImages.final;
    }

    const totalTime = 60; // 60 para 1 min  / 120 para 2 horas
    const halfTime = totalTime / 2;
  
    if (timeLeft > halfTime) {
     
      return leitoImages.initial;
    } else if (timeLeft >= 0) {
     
      return leitoImages.meio;
    } else {
      return leitoImages.initial;
    }
    
  };

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
     
      {Cookies.get('selectedSetor') && leitos.length > 0 ? (
        leitos.map((leito) => (
          <div key={leito.id} className="flex justify-evenly">
            <Image
              src={getImageBasedOnTime(leito.id)} 
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
                  <button className="bg-white btnn p-2 rounded-md text-black" onClick={handleShowOptionsModal}>
                    Trocar posições
                  </button>

                 
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
      )  : Cookies.get('selectedExternalSetor') && externalLeitos.length > 0 ? (
        externalLeitos.map((leito) => (
          <div key={leito.id} className="flex justify-evenly">
            <Image
              src={getImageBasedOnTime(leito.id)} 
              width={150}
              height={150}
              alt={`Imagem do leito externo ${leito.id}`}
              onClick={() => toggleModal(leito.id)}
              className={vibrateCamaIds.includes(leito.id) ? "vibrate" : ""}
            />
            {modalCamaId === leito.id && (
              <div className="modal-overlay" onClick={() => toggleModal(leito.id)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <span className="close-button" onClick={() => toggleModal(leito.id)}>&times;</span>
                  <h2 className="text-white">Leito Externo</h2>
                  <h2 className="text-white pt-8">Leito: {leito.nome}</h2>
                  <ul className="modal-list">
                    <li className="border-b-2">Posição: {positionMap[leito.id] || "Não selecionada"}</li>
                    <li className="border-b-2">
                      Tempo: {formatTime(timeLeftMap[leito.id])}
                    </li>
                  </ul>
                  <button className="bg-white btnn p-2 rounded-md text-black" onClick={handleShowOptionsModal}>
                    Trocar posições 
                  </button>

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
                                value="Decúbito Prona"
                                onChange={(e) => setSelectedPosition(e.target.value)}
                              /> Decúbito Prona
                            </label>
                            <button type="submit" className="bg-white text-black p-2 rounded-md mt-4">Confirmar</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) :  (
        <p>Carregando leitos...</p>
      )}
    </div>
  );
}
