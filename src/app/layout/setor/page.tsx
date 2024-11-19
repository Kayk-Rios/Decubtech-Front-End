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
  nome: string;
}

export default function Setor() {
  const [setores, setSetores] = useState<Setor[]>([]); 
  const [externalSetores, setExternalSetores] = useState<Setor[]>([]); 
  const [selectedSetor, setSelectedSetor] = useState<string>("");
  const [selectedExternalSetor, setSelectedExternalSetor] = useState<string>("");

  const userId = Cookies.get("userId");
  const username = Cookies.get("username");
  
  useEffect(() => {
    
    if (userId) {
      axios
        .get(`https://superb-adventure-production.up.railway.app/setores/${userId}`) 
        .then((response) => {
          setSetores(response.data);
          const nomesSetores = response.data.map((setor: Setor) => setor.name);
          localStorage.setItem('nomesSetores', JSON.stringify(nomesSetores));
        })
        .catch((error) => {
          console.error("Erro ao buscar setores:", error);
        });
    } else {
      console.log("User ID não encontrado nos cookies");
    }

    if (username) {
      axios
        .post('https://superb-adventure-production.up.railway.app/external/setores', { username })
        .then((response) => {
          setExternalSetores(response.data);
          const nomesSetoresExternos = response.data.map((setor: Setor) => setor.nome);
          localStorage.setItem('nomesSetoresExternos', JSON.stringify(nomesSetoresExternos));
        })
        .catch((error) => {
          console.error("Erro ao buscar setores externos:", error);
        });
    } else {
      console.log("Username não encontrado nos cookies");
    }

  }, [userId, username]);

  const handleSetorChange = (isExternal: boolean) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const setorId = selectedOption.value;
    const setorNome = selectedOption.text;
  
    if (isExternal) {
      setSelectedExternalSetor(setorId);
      Cookies.set('selectedExternalSetor', setorId);
      Cookies.remove('selectedSetor');
      localStorage.setItem('selectedExternalSetorNome', setorNome); // Armazenar no localStorage
    } else {
      setSelectedSetor(setorId);
      Cookies.set('selectedSetor', setorId); 
      Cookies.remove('selectedExternalSetor'); 
      localStorage.setItem('selectedSetorNome', setorNome); // Armazenar no localStorage
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center h-[680px] ">
        
        <section className=" flex ml-[40px] flex-col items-center gap-6 justify-center  ">
         <div >
            {setores.length === 0 ? (
              <p>Carregando...</p> 
            ) : (
              <select
                className="p-2 border rounded setor"
                value={selectedSetor} 
                onChange={handleSetorChange(false)} 
              >
                <option value=""   >Selecione um setor</option>
                {setores.map((setor) => (
                  <option key={setor.id} value={setor.id}>
                    {setor.name}
                  </option>
                ))}
              </select>
            )}
              <h3>Setores Externos:</h3>
              
                <select
                  className=" border rounded setor w-[310px] appearance-none"
                  value={selectedExternalSetor}
                  onChange={handleSetorChange(true)} 
                >
                  <option value="" className="w-[310px]">Selecione um setor externo</option>
                  {externalSetores.map((setor) => (
                    <option key={`ext-${setor.id}`} value={setor.id} className="w-[210px]">
                      {setor.nome}
                    </option>
                  ))}
                </select>
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

