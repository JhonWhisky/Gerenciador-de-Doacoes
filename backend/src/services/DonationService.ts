import { DonationItem, DonationType } from '../types/Donation';
import { 
  DonationStrategy, 
  MoneyDonationStrategy, 
  FoodDonationStrategy, 
  StandardDonationStrategy 
} from '../strategies/DonationStrategies';

export class DonationService {
  private donations: DonationItem[] = []; // Nosso "banco de dados" temporário

  private getStrategy(type: DonationType): DonationStrategy {
    switch (type) {
      case DonationType.MONEY: return new MoneyDonationStrategy();
      case DonationType.FOOD: return new FoodDonationStrategy();
      case DonationType.TOYS:
      case DonationType.CLEANING: return new StandardDonationStrategy();
      default: throw new Error("Tipo de doação não suportado.");
    }
  }

  create(item: DonationItem): DonationItem {
    const strategy = this.getStrategy(item.type);
    const processedItem = strategy.process(item);
    
    processedItem.id = Math.random().toString(36).substring(2, 9); // ID simples
    this.donations.push(processedItem);
    
    return processedItem;
  }

  findAll(): DonationItem[] {
    return this.donations;
  }

  // Adicione estes métodos dentro da classe DonationService

  update(id: string, updatedData: Partial<DonationItem>): DonationItem {
    const index = this.donations.findIndex(d => d.id === id);
    if (index === -1) throw new Error("Doação não encontrada.");

    // Mescla os dados antigos com os novos
    const itemToUpdate = { ...this.donations[index], ...updatedData } as DonationItem;
    
    // Passa pela estratégia novamente para validar as novas informações
    const strategy = this.getStrategy(itemToUpdate.type);
    const validatedItem = strategy.process(itemToUpdate);

    this.donations[index] = validatedItem;
    return validatedItem;
  }

  delete(id: string): void {
    const index = this.donations.findIndex(d => d.id === id);
    if (index === -1) throw new Error("Doação não encontrada.");
    
    this.donations.splice(index, 1);
  }
}