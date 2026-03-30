export enum DonationType {
  MONEY = 'Dinheiro',
  FOOD = 'Alimentação',
  TOYS = 'Brinquedos',
  CLEANING = 'Limpeza',
}

export interface DonationItem {
  id?: string | undefined;
  type: DonationType;
  name: string;
  count: number;
  moneyAmount?: number | undefined;
  expirationDate?: Date | undefined;
}