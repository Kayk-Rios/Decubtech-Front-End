import Image from "next/image";
import Decub from "../../assets/Decub.png";
export default function ImageEnfermeira2() {
  return (
    <div className=" hidden sm:block  md:w-[500px] lg:w-[700px] xl:[702px] 2xl:[700px]">
      <Image
        src={Decub}
        width={703}
        height={300}
        alt="ImagemDecubito"
      />
    </div>
  );
}
