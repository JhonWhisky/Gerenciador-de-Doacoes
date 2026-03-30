/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { Form, Label, Input, Select, Button, ErrorMessage, SuccessMessage } from '../styles';

export const DonationType = {
  MONEY: 'Dinheiro',
  FOOD: 'Alimentação',
  TOYS: 'Brinquedos',
  CLEANING: 'Limpeza',
} as const;

export type DonationType = typeof DonationType[keyof typeof DonationType];

interface DonationFormProps {
  onSuccess: () => void;
  donationToEdit?: any; 
  clearEdit: () => void; 
}

export function DonationForm({ onSuccess, donationToEdit, clearEdit }: DonationFormProps) {
  const editData = donationToEdit as any;

  const [type, setType] = useState<DonationType>(DonationType.TOYS as DonationType);
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [moneyAmount, setMoneyAmount] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Preenche o formulário se donationToEdit mudar
  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setName(editData.name);
      setCount(editData.count);
      setMoneyAmount(editData.moneyAmount?.toString() || '');
      setExpirationDate(editData.expirationDate ? editData.expirationDate.split('T')[0] : '');
      setSuccess('');
    }
  }, [editData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      type,
      name,
      count: Number(count),
      ...(type === DonationType.MONEY && { moneyAmount: Number(moneyAmount) }),
      ...(type === DonationType.FOOD && { expirationDate }),
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

      const url = editData ? `${API_URL}/donations/${editData.id}` : `${API_URL}/donations`;
      
      const method = editData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erro na operação.');

      setSuccess(editData ? 'Doação atualizada!' : 'Doação cadastrada!');
      
      // Limpa os campos
      setName('');
      setCount(1);
      setMoneyAmount('');
      setExpirationDate('');
      clearEdit(); // Sai do modo de edição
      onSuccess(); // Recarrega a lista
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Tipo de Doação:
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as DonationType)}
        >
          <option value={DonationType.TOYS}>Brinquedos</option>
          <option value={DonationType.CLEANING}>Limpeza</option>
          <option value={DonationType.FOOD}>Alimentação</option>
          <option value={DonationType.MONEY}>Dinheiro</option>
        </Select>
      </Label>

      <Label>
        Descrição / Nome do Item:
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ex: Cesta Básica, Urso de Pelúcia..."
        />
      </Label>

      {type !== DonationType.MONEY && (
        <Label>
          Quantidade:
          <Input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            required
          />
        </Label>
      )}

      {/* Renderização Condicional baseada na Estratégia (Strategy Pattern) */}
      {type === DonationType.MONEY && (
        <Label>
          Valor (R$):
          <Input
            type="number"
            step="0.01"
            min="0.01"
            value={moneyAmount}
            onChange={(e) => setMoneyAmount(e.target.value)}
            required
            placeholder="Ex: 50.00"
          />
        </Label>
      )}

      {type === DonationType.FOOD && (
        <Label>
          Data de Validade:
          <Input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </Label>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <Button type="submit">{editData ? 'Salvar Alterações' : 'Cadastrar Doação'}</Button>
    </Form>
  );
}
