import Menu from "@/components/templates/Menu";
import Pagina from "@/components/templates/Pagina";
import PosicoesPage from "@/components/templates/PosiçoesPage";
import Link from "next/link";

export default function Posicoes() {
  return (
    <>
      <div className="flex justify-center items-center mt-40 ">
        <Pagina>
          <div className="flex flex-col items-center mt-[-100px] ml-[150%] gap-3">
            <Menu />
            <Link href=" href='/layout/pacientes">
              <h1 className="sair rounded-md ">Sair</h1>
            </Link>
          </div>
          <PosicoesPage />
        </Pagina>
      </div>
    </>
  );
}
