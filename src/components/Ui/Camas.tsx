'use client';
import Image from "next/image";
import ListaCamas from "@/components/data/ListaCamas";
import { useState, useEffect } from "react";

export default function ImagePosicoes() {
  const [modalCamaId, setModalCamaId] = useState<number | null>(null); // controla qual modal de cama está aberto
  const [showOptionsModal, setShowOptionsModal] = useState(false); // controla a exibição do modal de opções
  const [vibrateCamaId, setVibrateCamaId] = useState<number | null>(null); // controla qual cama está vibrando
  const [timeLeftMap, setTimeLeftMap] = useState<{ [key: number]: number | null }>({}); // tempo restante por leito
  const [positionMap, setPositionMap] = useState<{ [key: number]: string | null }>({}); // posição escolhida para cada leito
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null); // posição temporária selecionada para confirmar

  const toggleModal = (id: number) => {
    setModalCamaId(modalCamaId === id ? null : id); // abre/fecha modal individualmente
    setShowOptionsModal(false); // oculta o modal de opções ao fechar o modal
  };

  const listaCamas = ListaCamas;

  const handleShowOptionsModal = () => {
    setShowOptionsModal(true); // exibe o modal de opções
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false); // oculta o modal de opções
  };

  const handleConfirmPosition = (id: number) => {
    setShowOptionsModal(false); // fecha o modal de opções
    setVibrateCamaId(null); // reinicia a vibração, se já existir
    setPositionMap((prev) => ({ ...prev, [id]: selectedPosition })); // armazena a posição confirmada
    setSelectedPosition(null); // reinicia a posição selecionada
    setTimeLeftMap((prev) => ({ ...prev, [id]: 60 })); // define o tempo restante para 1 min  / 7200 2 horas

    // Inicia a vibração após 2 horas
    setTimeout(() => {
      setVibrateCamaId(id);
    }, 60000); // 1 min  / 7200000 2 horas
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
          }
        }
        return newTimeLeftMap;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      {listaCamas.map((posicao) => (
        <div key={posicao.Leitoid} className="flex justify-evenly">
          <Image
            src={posicao.imagem}
            width={150}
            height={150}
            alt={`Imagem da cama ${posicao.Leitoid}`}
            onClick={() => toggleModal(posicao.Leitoid)}
            className={vibrateCamaId === posicao.Leitoid ? "vibrate" : ""}
          />
          {modalCamaId === posicao.Leitoid && (
            <div className="modal-overlay" onClick={() => toggleModal(posicao.Leitoid)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={() => toggleModal(posicao.Leitoid)}>
                  &times;
                </span>
                <h2 className="text-white">Informações do Paciente</h2>
                <h2 className="text-white pt-8">Leito: {posicao.Leitoid}</h2>
                <ul className="modal-list">
                  <li className="border-b-2">Posição: {positionMap[posicao.Leitoid] || "Não selecionada"}</li>
                  <li className="border-b-2">
                    Tempo: {formatTime(timeLeftMap[posicao.Leitoid])}
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
                          handleConfirmPosition(posicao.Leitoid);
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
      ))}
    </div>
  );
}
