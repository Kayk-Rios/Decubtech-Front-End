'use client'
import ImageEnfermeira2 from "@/components/Ui/ImageEnfermeira2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 
import Link from "next/link";
import Entrar from "@/components/Ui/Entrar";

interface Setor {
  id: number;
  name: string;
}

export default function Setor() {
  const [setores, setSetores] = useState<Setor[]>([]); 
  const [selectedSetor, setSelectedSetor] = useState<string>("");

  const userId = Cookies.get("userId");

  
  useEffect(() => {
    
    if (userId) {
      axios
        .get(`https://back-end-decubtech.onrender.com/setores/${userId}`) 
        .then((response) => {
          setSetores(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar setores:", error);
        });
    } else {
      console.log("User ID não encontrado nos cookies");
    }
  }, [userId]);

  const handleSetorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const setorId = event.target.value; 
    setSelectedSetor(setorId);
    
   
    Cookies.set('selectedSetor', setorId); 
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center h-[680px] ">
        
        <section className=" flex ml-[40px] flex-col items-center gap-6 justify-center  ">
         <div>
            {setores.length === 0 ? (
              <p>Carregando.</p> 
            ) : (
              <select
                className="p-2 border rounded"
                value={selectedSetor} 
                onChange={handleSetorChange} 
              >
                <option value="">Selecione um setor</option>
                {setores.map((setor) => (
                  <option key={setor.id} value={setor.id}>
                    {setor.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        
        <Link href='/layout/paciente'>
            <Entrar className="entrar" destino="Confirma" />
        </Link>
        </section>

        <section className="hidden sm:block  ">
          <ImageEnfermeira2 />
        </section>
      </div>
    </>
  );
}

