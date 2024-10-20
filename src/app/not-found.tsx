"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Pagina404() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 6) % 360);
    }, 16.67); // Aproximadamente 60 FPS

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-7 text-center">
      <h1 className="text-3xl text-zinc-400 font-bold">
        404 - Página não encontrada!
      </h1>
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
            background: "#b6c4b6",
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

      <p className="text-lg max-w-[600px] mt-40">
        Você parece ter perdido o caminho... Mas não se preocupe, até os
        melhores  se perdem às vezes! 🧭
      </p>

      <Link href="/" className="bg-blue-500 py-2 px-4 rounded-md">
        Voltar
      </Link>
    </div>
  );
}
