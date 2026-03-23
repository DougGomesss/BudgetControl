import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [titulos] = useState([
    { cadastro: "Cadastro de pessoas" },
    { cadastro: "Cadastro de categorias" },
    { cadastro: "Cadastro de transações" },
  ]);

  return (
    <>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Controle de gastos residenciais
      </h1>
      <div className="flex justify-center">
        <div className="mt-5 space-y-4 p-6 bg-slate-200 rounded-md shadow w-[500px] ">
          {titulos.map((x) => (
            <div key={x.cadastro} className="flex gap-2">
              <button className="bg-slate-400 text-left w-full text-white p-2 rounded-md">
                {x.cadastro}
              </button>
              <button className="bg-slate-400 p2- rounded-md text-white">
                <Link to={`${x.cadastro?.split(" ")[2]}`}>
                  <ChevronRightIcon></ChevronRightIcon>
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
