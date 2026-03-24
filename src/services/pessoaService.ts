import { InfoPessoas } from "../Interfaces/InfoPessoas";
import { InfoTransacoes } from "../Interfaces/InfoTransacoes";

const MOCK_DATA_KEY = "@FamilyBudget:pessoas";
const MOCK_DATA_KEY_TRANSACOES = "@FamilyBudget:transacoes";

class PessoaService {
  private getStorageData(): InfoPessoas[] {
    const data = localStorage.getItem(MOCK_DATA_KEY);
    return data ? JSON.parse(data) : [];
  }

  private setStorageData(data: InfoPessoas[]): void {
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(data));
  }

  async getAll(): Promise<InfoPessoas[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.getStorageData();
  }

  async create(pessoa: Omit<InfoPessoas, "id">): Promise<InfoPessoas> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const current_data = this.getStorageData();
    const new_id =
      current_data.length > 0
        ? Math.max(...current_data.map((p) => p.id)) + 1
        : 1;
    const new_pessoa = { ...pessoa, id: new_id };
    this.setStorageData([...current_data, new_pessoa]);
    return new_pessoa;
  }

  private getStorageDataTransacoes(): InfoTransacoes[] {
    const data = localStorage.getItem(MOCK_DATA_KEY_TRANSACOES);
    return data ? JSON.parse(data) : [];
  }

  async update(id: number, pessoa: InfoPessoas): Promise<InfoPessoas> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transacoes = this.getStorageDataTransacoes();

    if (transacoes.length > 0) {
      const transacoes_atualizadas = transacoes.map((t) => {
        if (t.pessoa.id === id) {
          return { ...t, pessoa: { ...pessoa } };
        }
        return t;
      });
      localStorage.setItem(
        MOCK_DATA_KEY_TRANSACOES,
        JSON.stringify(transacoes_atualizadas),
      );
    }

    const current_data = this.getStorageData();
    const updated_data = current_data.map((p) => (p.id === id ? pessoa : p));
    this.setStorageData(updated_data);

    return pessoa;
  }

  async delete(id: number): Promise<void> {
    const transacoes = this.getStorageDataTransacoes();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const current_data = this.getStorageData();
    const filtered_data = current_data.filter((p) => p.id !== id);
    const filtro = transacoes.filter((t) => t.pessoa.id !== id);
    localStorage.setItem(MOCK_DATA_KEY_TRANSACOES, JSON.stringify(filtro));
    this.setStorageData(filtered_data);
  }
}

export const pessoaService = new PessoaService();
