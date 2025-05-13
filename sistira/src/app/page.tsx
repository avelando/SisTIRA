import Button from "@/components/ui/Button";
import TextAnimated from "@/components/TextAnimated";
import Link from "next/link";

import { LogoIcon, TeacherElement } from "@/lib/images"

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <LogoIcon />
        </div>
        <nav className="navbar">
          <ul>
            <li>Serviços</li>
            <li>Sobre</li>
            <li>Contato</li>
          </ul>
        </nav>
        <div className="info">
          <Link href="/auth/login">
            <Button content="Entrar" variant="reverse" />
          </Link>
          <Link href="/auth/register">
            <Button content="Cadastra-se"/>
          </Link>
        </div>
      </header>

      <section className="initial">
        <div className="content">
          <div className="text">
            <div className="textAnimated">
              <TextAnimated />
            </div>
            <div className="title">
              <h2>Sistema de Tutoria Inteligente de <br/>Respostas Automáticas</h2>
            </div>
            <Link href={"/auth/register"}>
              <Button content="Comece agora" />
            </Link>
          </div>
          <div className="image">
            <TeacherElement />
          </div>
        </div>
        <div className="scroll-button">
          <span>Saiba mais</span>
          <div className="arrow-container">
            <svg className="arrow-svg" width="45" height="15" viewBox="0 0 49 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.0171 3.3764L24.5171 16.3764L3.01709 3.3764" stroke="#F8FFFF" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      <section className="secondary">
        
      </section>
    </>
  );

}

export default Home;
