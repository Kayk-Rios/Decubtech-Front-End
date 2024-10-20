import Image from "next/image";
import Posi from '@/assets/posicoes.png'
export default function ImagePosicoes() {
  return (
    <div className="">
      <Image
        src={Posi}
        width={303}
        height={300}
        alt="Imagemposçoes"
      />
    </div>
  );
}
