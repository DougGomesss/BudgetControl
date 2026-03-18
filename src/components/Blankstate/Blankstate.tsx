import { ReactNode } from "react";

interface BlankstateProps {
  texto: string;
  children: ReactNode;
}

function Blankstate({ texto, children }: BlankstateProps) {
  return (
    <div>
      <div className="flex flex-col gap-3 justify-center items-center">
        {children}
        <div className="">Não existem cadastros de {texto} no momento </div>
      </div>
    </div>
  );
}

export default Blankstate;
