import Button from "@/components/ui/Button";
import TextAnimated from "@/components/ui/TextAnimated";
import Link from "next/link";
import { LogoIcon, TeacherElement } from "@/lib/images";

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="header__brand">
          <LogoIcon />
        </div>

        <nav className="header__nav">
          <ul className="nav__list">
            {["Serviços", "Sobre", "Contato"].map((item) => (
              <li key={item} className="nav__item">
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Link href="/auth/login">
            <Button content="Entrar" variant="reverse" />
          </Link>
          <Link href="/auth/register">
            <Button content="Cadastre-se" />
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero__content">
          <div className="hero__animated">
            <TextAnimated />
          </div>
          <h2 className="hero__title">
            Sistema de Tutoria Inteligente de <br />
            Respostas Automáticas
          </h2>
          <Link href="/auth/register">
            <Button content="Comece agora" />
          </Link>
        </div>

        <div className="hero__image">
          <TeacherElement />
        </div>

        <div className="hero__scroll">
          <span>Saiba mais</span>
          <div className="hero__arrow-wrapper">
            <svg
              className="hero__arrow-icon"
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
            <div className="hero__dot" />
          </div>
        </div>
      </section>

      <section className="content"></section>
    </>
  );
};

export default Home;
