import Menu from "@/components/templates/Menu";
import Pagina from "@/components/templates/Pagina";
import PosicoesPage from "@/components/templates/PosiçoesPage";
import Link from "next/link";

export default function Posicoes() {
  return (
    <>
      <div className="flex justify-center items-center mt-40 ">
        <Pagina>
          <div className="flex  flex-col items-center mt-[-100px] ml-[66%]  sm:ml-[70%] md:ml-[90%] xl:ml-[130%] gap-7">
            <Menu />
            <Link href="/" className=" mb-10">
              <h1 className="sair rounded-md ">Sair</h1>
            </Link>
          </div>
          <PosicoesPage />
        </Pagina>
      </div>
    </>
  );
}
