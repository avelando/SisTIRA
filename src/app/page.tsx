import Button from "@/components/ui/Button";
import TextAnimated from "@/components/ui/TextAnimated";
import Link from "next/link";

import { LogoIcon, TeacherElement } from "@/lib/images";

const Home = () => {
  return (
    <>
      <header className="h-[10vh] w-full flex items-center relative bg-[#133856] border-b-2 border-[#F8FFFF] px-[10%] box-border">
        <div className="flex items-center gap-[10px] text-[#F8FFFF]">
          <LogoIcon />
        </div>

        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex items-center gap-5 list-none m-0 p-0 text-[#F8FFFF]">
            {["Serviços", "Sobre", "Contato"].map((item) => (
              <li
                key={item}
                className="relative cursor-pointer
                           after:content-['']
                           after:absolute after:bottom-[-4px] after:left-0
                           after:w-0 after:h-[2px] after:bg-[#F8FFFF]
                           after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center ml-auto gap-5">
          <Link href="/auth/login">
            <Button content="Entrar" variant="reverse" />
          </Link>
          <Link href="/auth/register">
            <Button content="Cadastra-se" />
          </Link>
        </div>
      </header>

      <section
        className="
          h-[calc(100vh-10vh)] 
          px-[10%] 
          relative 

          grid 
          grid-cols-1 
          md:grid-cols-2 
          items-center 
          gap-10
        "
      >
        <div className="flex flex-col justify-center gap-[10px]">
          <div className="textAnimated">
            <TextAnimated />
          </div>
          <h2 className="text-[24px] text-white">
            Sistema de Tutoria Inteligente de <br />
            Respostas Automáticas
          </h2>
          <Link href="/auth/register">
            <Button content="Comece agora" />
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="max-w-full h-auto">
            <TeacherElement />
          </div>
        </div>

        <div className="group absolute bottom-[50px] left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer text-white font-normal text-[18px] gap-2">
          <span>Saiba mais</span>
          <div className="relative w-[49px] h-[19px]">
            <svg
              className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 group-hover:translate-y-2"
              width="45"
              height="15"
              viewBox="0 0 49 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M46.0171 3.3764L24.5171 16.3764L3.01709 3.3764"
                stroke="#F8FFFF"
                strokeWidth="5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-white rounded-full opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100" />
          </div>
        </div>
      </section>

      <section className="w-full h-screen"></section>
    </>
  );
};

export default Home;
