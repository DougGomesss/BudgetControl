import { InfoCategorias } from "./InfoCategorias";
import { InfoPessoas } from "./InfoPessoas";

export interface InfoTransacoes {
  id: number;
  descricao: string;
  valor: string;
  tipoTransacao: string;
  categoria: InfoCategorias;
  pessoa: InfoPessoas;
}
