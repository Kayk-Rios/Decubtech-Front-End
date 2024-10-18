import Entrar from "../Ui/Entrar";
import ImageEnfermeira2 from "../Ui/ImageEnfermeira2";

export default function Login() {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex-grow flex items-center justify-center">
          <form className="flex flex-col gap-4 w-[300px]">
            <div className="  flex flex-col">
              <input
                type="text"
                required
                className="coren rounded-full h-14 text-center"
                placeholder="Coren"
              />
            </div>
            <div className=" flex flex-col pb-40">
              <input
                type="password"
                required
                className="senha rounded-full h-12 text-center "
                placeholder="Senha"
              />
            </div>
            <Entrar destino="Entrar" />
          </form>
        </div>        
        <div className="flex-shrink-0">
          <ImageEnfermeira2/>
        </div>
      </div>
    </>
  );
}
