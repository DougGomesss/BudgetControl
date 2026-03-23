import { InfoCategorias } from "../Interfaces/InfoCategorias";

const MOCK_DATA_KEY = "@FamilyBudget:categorias";

class CategoriaService {
  private getStorageData(): InfoCategorias[] {
    const data = localStorage.getItem(MOCK_DATA_KEY);
    return data ? JSON.parse(data) : [];
  }

  private setStorageData(data: InfoCategorias[]): void {
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(data));
  }

  async getAll(): Promise<InfoCategorias[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.getStorageData();
  }

  async create(categoria: Omit<InfoCategorias, "id">): Promise<InfoCategorias> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const current_data = this.getStorageData();
    const new_id =
      current_data.length > 0
        ? Math.max(...current_data.map((c) => c.id)) + 1
        : 1;
    const new_categoria = { ...categoria, id: new_id };
    this.setStorageData([...current_data, new_categoria]);
    return new_categoria;
  }

  async update(id: number, categoria: InfoCategorias): Promise<InfoCategorias> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const current_data = this.getStorageData();
    const updated_data = current_data.map((c) => (c.id === id ? categoria : c));
    this.setStorageData(updated_data);
    return categoria;
  }

  async delete(id: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const current_data = this.getStorageData();
    const filtered_data = current_data.filter((c) => c.id !== id);
    this.setStorageData(filtered_data);
  }
}

export const categoriaService = new CategoriaService();
