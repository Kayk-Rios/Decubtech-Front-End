"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Entrar from "../Ui/Entrar";
import ImageEnfermeira2 from "../Ui/ImageEnfermeira2";
 

export default function Login() {
  const [rotation, setRotation] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowSkeleton(window.innerWidth < 640); // sm breakpoint
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // check initial size

    const timer = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 6) % 360);
    }, 16.67);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen pb-36">
        <div className="flex-grow flex flex-col items-center justify-center gap-28">
          {showSkeleton && (
            <div style={{ position: "relative", margin: "50px auto", backgroundColor: "#c8e6c9" }}>
              <div style={{ width: "6px", height: "60px", background: "#1b5e20", position: "absolute", top: "40px", left: "50%", transformOrigin: "bottom center", borderRadius: "5px" }}></div>
              <div style={{ width: "4px", height: "80px", background: "#1b5e20", position: "absolute", top: "20px", left: "50%", transformOrigin: "bottom center", borderRadius: "5px" }}></div>
              <div style={{ width: "2px", height: "90px", background: "#5b965d", position: "absolute", top: "10px", left: "50%", transformOrigin: "bottom center", borderRadius: "5px", transform: `rotate(${rotation}deg)` }}></div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1b5e20", position: "absolute", top: "94px", left: "50%", transform: "translate(-50%, -50%)" }}></div>
            </div>
          )}
          <div className={`mt-8 ${showSkeleton ? 'mt-20' : ''}`}>
            <form className="flex flex-col gap-4 w-[300px]">
              <div className="flex flex-col">
                <input type="text" required className="coren rounded-full h-14 text-center" placeholder="Coren" />
              </div>
              <div className="flex flex-col pb-40">
                <input type="password" required className="senha rounded-full h-12 text-center" placeholder="Senha" />
              </div>
              <Link href="/layout/setor">
                <Entrar className="entrar" destino="Entrar" />
              </Link>
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