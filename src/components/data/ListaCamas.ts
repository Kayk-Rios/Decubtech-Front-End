
import Cama1 from "@/assets/Cama1.png"
import Cama2 from "@/assets/Cama2.png"
import Cama3 from "@/assets/Cama3.png"
import Cama4 from "@/assets/Cama1.png"
import Cama5 from "@/assets/Cama1.png"
import Cama6 from "@/assets/Cama2.png"
import Cama7 from "@/assets/Cama3.png"
import Cama8 from "@/assets/Cama1.png"
 

  interface Posicoes {
    Leitoid: number;
    imagem?: any;
    id?:string;

  }
 
   const images : Posicoes[]= [
    {
      Leitoid: 1,
      imagem: Cama1,
      id: "cama1"
    },
    {
      Leitoid: 2,
      imagem: Cama2,
      id: "cama2"
    },
    {
      Leitoid: 3,
      imagem: Cama3,
      id: "cama3"
    },
    {
      Leitoid: 4,
      imagem: Cama4,
      id: "cama4"
    },
    {
      Leitoid: 5,
      imagem: Cama5,
      id: "cama5"
    },
    {
      Leitoid: 6,
      imagem: Cama6,
      id: "cama6"
    },
    {
      Leitoid: 7,
      imagem: Cama7,
      id: "cama7"
    },
    {
      Leitoid: 8,
      imagem: Cama8,
      id:"cama8"
    }
    ,
    {
      Leitoid: 9,
      imagem: Cama5,
      id: "cama9"
    },
    {
      Leitoid: 10,
      imagem: Cama6,
      id: "cama10"
    },
    {
      Leitoid: 11,
      imagem: Cama7,
    id: "cama11"
    },
    {
      Leitoid: 12,
      imagem: Cama8,
      id: "cama12"
    }
  ];
  export default  images;