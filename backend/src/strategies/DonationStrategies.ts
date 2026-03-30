import type { DonationItem } from '../types/Donation';

export interface DonationStrategy {
  validate(item: DonationItem): void;
  process(item: DonationItem): DonationItem;
}

export class MoneyDonationStrategy implements DonationStrategy {
  validate(item: DonationItem): void {
    if (!item.moneyAmount || item.moneyAmount <= 0) {
      throw new Error("Doações em dinheiro precisam ter um valor maior que zero.");
    }
  }

  process(item: DonationItem): DonationItem {
    this.validate(item);
    item.name = `Doação Financeira: R$ ${item.moneyAmount?.toFixed(2)}`;
    return item;
  }
}

export class FoodDonationStrategy implements DonationStrategy {
  validate(item: DonationItem): void {
    if (!item.expirationDate) {
      throw new Error("Doações de alimentação precisam ter uma data de validade.");
    }
    const expDate = new Date(item.expirationDate);
    if (expDate < new Date()) {
      throw new Error("Não é possível aceitar alimentos fora do prazo de validade.");
    }
  }

  process(item: DonationItem): DonationItem {
    this.validate(item);
    return item;
  }
}

export class StandardDonationStrategy implements DonationStrategy {
  validate(item: DonationItem): void {
    if (item.count <= 0) {
      throw new Error("A quantidade deve ser maior que zero.");
    }
  }

  process(item: DonationItem): DonationItem {
    this.validate(item);
    return item;
  }
}