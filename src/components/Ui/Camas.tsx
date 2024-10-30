 'use client'
import Image from "next/image";
import ListaCamas from "@/components/data/ListaCamas";
import { useState } from "react";

export default function ImagePosicoes() {
  const [modalCamaId, setModalCamaId] = useState<number | null>(null); // controla qual modal de cama está aberto

  const toggleModal = (id: number) => {
    setModalCamaId(modalCamaId === id ? null : id); // abre/fecha modal individualmente
  };

  const listaCamas = ListaCamas;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {listaCamas.map((posicao) => (
        <div key={posicao.id} className="flex justify-evenly">
          <Image
            src={posicao.imagem}
            width={150}
            height={150}
            alt={`Imagem da cama ${posicao.id}`}
            onClick={() => toggleModal(posicao.id)}
          />
          {modalCamaId === posicao.id && (
            <div className="modal-overlay" onClick={() => toggleModal(posicao.id)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={() => toggleModal(posicao.id)}>
                  &times;
                </span>
                <h2 className="text-white">Informações do Paciente</h2>
                <h2 className="text-white pt-8">Leito: {posicao.id}</h2>
                <ul className="modal-list">
                  <li className="border-b-2">Posição: Ventral</li>
                  <li className="border-b-2">Tempo: -35 min</li>
                </ul>
                <button className="bg-white p-2 rounded-md text-black">Trocar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
