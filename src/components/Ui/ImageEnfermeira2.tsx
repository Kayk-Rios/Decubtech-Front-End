import Image from "next/image";
import Decub from "../../assets/Decub.png";
export default function ImageEnfermeira2() {
  return (
    <div className="">
      <Image
        src={Decub}
        width={703}
        height={300}
        alt="ImagemDecubito"
      />
    </div>
  );
}
