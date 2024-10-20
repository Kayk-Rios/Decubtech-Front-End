import ImagePosicoes from "../Ui/ImagemPosicoes";

export default function PosicoesPage() {
  return (
    <>
      <div className="flex  justify-evenly items-center gap-6">
        <ImagePosicoes />
        <ul className="text-black flex flex-col gap-3 text-xl">
          <li>Posições de Decúbito:</li>
          <li>Decúbito Dorsal</li>
          <li>Decúbito Ventral</li>
          <li>Decúbito Lateral Esquerdo ou Direito</li>
          <li> Decúbito Fowler</li>
        </ul>
      </div>
    </>
  );
}
