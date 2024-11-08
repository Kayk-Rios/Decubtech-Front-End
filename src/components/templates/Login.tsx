"use client";

import React, { useState, useEffect } from "react";
import ImageEnfermeira2 from "../Ui/ImageEnfermeira2";
import axios from "axios"; // Importando o axios
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";
import { login } from "@/cookies"; // Importando a função de login

export default function Login() {
  const [rotation, setRotation] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [username, setUsername] = useState(""); // Para armazenar o nome de usuário
  const [password, setPassword] = useState(""); // Para armazenar a senha
  const [error, setError] = useState(""); // Para armazenar mensagens de erro
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setShowSkeleton(window.innerWidth < 640); // sm breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // check initial size

    const timer = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 6) % 360);
    }, 16.67);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
    };
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://back-end-decubtech.onrender.com/users/login", {
        username,
        password,
      });

      if (response.data && response.data.id && response.data.username) {
        console.log("Login bem-sucedido", response.data);

        // Armazena o userId e username nos cookies após o login
        login({
          userId: response.data.id,
          username: response.data.username,
        });

        router.push("/layout/setor");
      } else {
        setError("Credenciais inválidas.");
      }
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <>
      <div className="flex h-screen pb-36">
        <div className="flex-grow flex flex-col items-center justify-center gap-28">
          {showSkeleton && (
            <div
              style={{
                position: "relative",
                margin: "50px auto",
                backgroundColor: "#c8e6c9",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "60px",
                  background: "#1b5e20",
                  position: "absolute",
                  top: "40px",
                  left: "50%",
                  transformOrigin: "bottom center",
                  borderRadius: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "4px",
                  height: "80px",
                  background: "#1b5e20",
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  transformOrigin: "bottom center",
                  borderRadius: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "2px",
                  height: "90px",
                  background: "#5b965d",
                  position: "absolute",
                  top: "10px",
                  left: "50%",
                  transformOrigin: "bottom center",
                  borderRadius: "5px",
                  transform: `rotate(${rotation}deg)`,
                }}
              ></div>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#1b5e20",
                  position: "absolute",
                  top: "94px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>
          )}
          <div className={`mt-8 ${showSkeleton ? "mt-20" : ""}`}>
            <form
              className="flex flex-col gap-4 w-[300px]"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col">
                <InputMask
                  mask="aa-999.999-aaa"
                  placeholder="Coren-XX 000.000-XXX"
                  required
                  value={username}
                  className="coren rounded-full h-14 text-center"
                  onChange={(e) => setUsername(e.target.value)} // Atualiza o estado
                />
              </div>
              <div className="flex flex-col pb-40">
                <input
                  type="password"
                  required
                  className="senha rounded-full h-12 text-center"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                />
              </div>

              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}

              <button type="submit" className="entrar rounded-full">
                Entrar
              </button>
            </form>
          </div>
        </div>
        <div className="flex-shrink-0">
          <ImageEnfermeira2 />
        </div>
      </div>
    </>
  );
}
