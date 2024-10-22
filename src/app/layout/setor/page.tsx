import SetorSection from "@/components/templates/SetorSection";
import ImageEnfermeira2 from "@/components/Ui/ImageEnfermeira2";

export default function Setor() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center h-[680px] ">
        <section className=" flex ml-[50px]  ">
          <SetorSection />
        </section>

        <section className="hidden sm:block  ">
          <ImageEnfermeira2 />
        </section>
      </div>
    </>
  );
}
