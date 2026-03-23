import { InfoTransacoes } from "../Interfaces/InfoTransacoes";

const MOCK_DATA_KEY = "@FamilyBudget:transacoes";

class TransacaoService {
  private getStorageData(): InfoTransacoes[] {
    const data = localStorage.getItem(MOCK_DATA_KEY);
    return data ? JSON.parse(data) : [];
  }

  private setStorageData(data: InfoTransacoes[]): void {
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(data));
  }

  async getAll(): Promise<InfoTransacoes[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.getStorageData();
  }

  async create(transacao: Omit<InfoTransacoes, "id">): Promise<InfoTransacoes> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const current_data = this.getStorageData();
    const new_id = current_data.length > 0 ? Math.max(...current_data.map((t) => t.id)) + 1 : 1;
    const new_transacao = { ...transacao, id: new_id };
    this.setStorageData([...current_data, new_transacao]);
    return new_transacao;
  }

  async update(id: number, transacao: InfoTransacoes): Promise<InfoTransacoes> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const current_data = this.getStorageData();
    const updated_data = current_data.map((t) => (t.id === id ? transacao : t));
    this.setStorageData(updated_data);
    return transacao;
  }

  async delete(id: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const current_data = this.getStorageData();
    const filtered_data = current_data.filter((t) => t.id !== id);
    this.setStorageData(filtered_data);
  }
}

export const transacaoService = new TransacaoService();
