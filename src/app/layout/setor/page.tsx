import SetorSection from "@/components/templates/SetorSection";
import ImageEnfermeira2 from "@/components/Ui/ImageEnfermeira2";

 
export default function Setor(){
    return(
        <>
        <div className="flex justify-between items-center ">
            <section className="flex ml-[300px] ">
               <SetorSection/>
            </section>

          <section><ImageEnfermeira2/></section>
        </div>
        </>
    )
}