import { useNavigate } from "react-router-dom";
import { House, TriangleAlert } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-white p-6 animate-in fade-in duration-500">
      <div className="bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-2xl flex flex-col items-center gap-6 border border-white/20 max-w-md w-full">
        <div className="bg-amber-500/20 p-4 rounded-full">
          <TriangleAlert size={64} className="text-amber-400" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight">Ops! 404</h1>
          <p className="text-lg text-slate-200 font-medium">
            Parece que você se perdeu no orçamento...
          </p>
          <p className="text-sm text-slate-300">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-emerald-900/40 active:scale-95 group"
        >
          <House
            size={20}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
          Voltar para o Início
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
