import Menu from "@/components/templates/Menu";
import Pagina from "@/components/templates/Pagina";
import Camas from "@/components/Ui/Camas";
 
import Entrar from "@/components/Ui/Entrar";
import Link from "next/link";

export default function PacientePagina() {
  
  return (
    <>
      <div>
        <Pagina>
            <Entrar destino="Pacientes" className=" flex text-slate-200 justify-center bg-pink-400 mt-[4%] ml-[2%]"/>
          <div className="flex flex-col w-16 ml-[83%] gap-3">
            
            <Menu/>
            <Link href="/" className=" mb-10">
              <h1 className="sair rounded-md ">Sair</h1>
            </Link>
          </div>
          <div>
            <Camas/>
          </div>
        </Pagina>
      </div>
    </>
  );
}
