import { ReactNode } from "react";

interface ItemListaProps {
  textoPrincipal: string;
  children?: ReactNode;
}

function ItemLista({ textoPrincipal, children }: ItemListaProps) {
  return (
    <ul className="mt-1.5 space-y-4 p-4 bg-slate-200 rounded-md shadow">
      <li className="flex gap-2">
        <button className="bg-slate-400 text-left w-full text-white p-2 rounded-md transition-colors hover:bg-slate-500">
          {textoPrincipal}
        </button>
        {children}
      </li>
    </ul>
  );
}

export default ItemLista;
