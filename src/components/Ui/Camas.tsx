import Image from "next/image";
import ListaCamas from "@/components/data/ListaCamas";

export default function ImagePosicoes() {
  const listaCamas = ListaCamas;
  
  return (
    <div className="grid grid-cols-5 gap-4">
      {listaCamas.map((posicao) => (
        <div key={posicao.id} className="flex justify-evenly
        ">
          <Image
            src={posicao.imagem}
            width={150}
            height={150}
            alt={`Imagem da cama ${posicao.id}`}
          />
        </div>
      ))}
    </div>
  );
}
