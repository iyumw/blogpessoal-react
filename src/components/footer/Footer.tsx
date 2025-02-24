import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  isFixed?: boolean;
}

function Footer({ isFixed = false }: FooterProps) {
  let data = new Date().getFullYear();
  const { usuario } = useContext(AuthContext);

  return (
    <div
      className={`justify-center grid grid-rows-2 bg-[#f2e5e6] p-4 text-sm w-full ${
        isFixed ? "fixed bottom-0 left-0" : ""
      }`}
    >
      <p>© {data} Isis Okamoto. Todos os direitos reservados.</p>

      <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
        {usuario?.token && (
          <>
            <ul className="flex justify-center gap-3">
              <li className="hover:text-[#99616C] transition duration-300 ease-in-out hover:-translate-y-1">
                <a href="https://linkedin.com/in/isis-okamoto" target="_blank">
                  <LinkedinLogo size={29} />
                </a>
              </li>
              <li className="hover:text-[#99616C] transition duration-300 ease-in-out hover:-translate-y-1">
                <a href="https://github.com/iyumw" target="_blank">
                  <GithubLogo size={29} />
                </a>
              </li>
              <li className="hover:text-[#99616C] transition duration-300 ease-in-out hover:-translate-y-1">
                <a href="https://instagram.com/_iyume" target="_blank">
                  <InstagramLogo size={29} />
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Footer;
