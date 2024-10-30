import Link from "next/link";
import Entrar from "../Ui/Entrar";
import { hospitalSectors } from "@/components/data/listaSetor";

export default function Setor() {
  const listSetor = hospitalSectors;

  return (
    <>
      <div className="flex flex-col gap-4 setor1 text-center">
        <h1>Escolher setor</h1>
        <select name="country" id="country " className="setor rounded-full  ">
          {listSetor.map((lista) => {
            return (
              <option value={lista.name} key={lista.id} >
                {lista.name}
              </option>
            );
          })}
        </select>
        <Link href='/layout/paciente'>
            <Entrar className="entrar" destino="Confirma" />
        </Link>
    
      </div>
    </>
  );
}
