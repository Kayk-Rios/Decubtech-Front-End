 'use client'
import Link from "next/link";
import  {useState}  from "react";

export default function Menu(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    }

    return(
        <>
      <div className="app">
        <button className="menu-button" onClick={toggleModal}>
          &#9776; 
        </button>
        
        {isModalOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={toggleModal}>&times;</span>
              <h2>Menu</h2>
              <ul className="modal-list">
                <Link href='/layout/setor'>
                  <li className=" border-b-2 ">SETOR</li>
                </Link>
                <Link  href='/layout/paciente'>
                  <li className="border-b-2  ">POSIÇÕES</li>
                </Link>
             
              </ul>
            </div>
          </div>
        )}
      </div>
        </>
    )
}