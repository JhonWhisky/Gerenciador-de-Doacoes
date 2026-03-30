import { useEffect, useState } from 'react';
import { 
  Title, Badge, TableContainer, Table, Th, Td, IconButton, 
  TableRow, ExpiredTag // <-- Importamos os novos estilos aqui
} from '../styles';

interface DonationItem {
  id: string;
  type: string;
  name: string;
  count: number;
  moneyAmount?: number;
  expirationDate?: string;
}

interface DonationListProps {
  onEdit: (donation: DonationItem) => void;
  onDonationDeleted: () => void;
}

export function DonationList({ onEdit, onDonationDeleted }: DonationListProps) {
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/donations`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta doação?')) return;

    try {
      await fetch(`http://localhost:3333/api/donations/${id}`, { method: 'DELETE' });
      onDonationDeleted();
    } catch {
      alert('Erro ao excluir doação');
    }
  };

  // Função auxiliar para verificar se a data já passou (ignorando as horas)
  const checkIsExpired = (dateString?: string) => {
    if (!dateString) return false;
    
    const expDate = new Date(dateString);
    const today = new Date();
    
    // Zera as horas para comparar apenas o dia/mês/ano
    expDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return expDate < today;
  };

  if (loading) return <p style={{ color: 'white' }}>Carregando doações...</p>;

  return (
    <TableContainer>
      <Title as="h2" style={{ fontSize: '24px', marginBottom: '16px', color: '#333' }}>
        Doações Registradas
      </Title>
      
      {donations.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center' }}>Nenhuma doação cadastrada.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Tipo</Th>
              <Th>Nome</Th>
              <Th>Quantidade</Th>
              <Th>Detalhes (Valor/Validade)</Th>
              <Th style={{ textAlign: 'center' }}>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => {

              const isExpired = checkIsExpired(donation.expirationDate);

              return (
                <TableRow key={donation.id} $isExpired={isExpired}>
                  <Td><Badge style={{ backgroundColor: isExpired ? '#b71c1c' : '#aa3bff' }}>{donation.type}</Badge></Td>
                  <Td><strong>{donation.name}</strong></Td>
                  
                  <Td>{donation.type === 'Dinheiro' ? '-' : donation.count}</Td>
                  
                  <Td>
                    {donation.moneyAmount && `R$ ${donation.moneyAmount.toFixed(2)}`}
                    
                    {donation.expirationDate && (
                      <>
                        {new Date(donation.expirationDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                        {isExpired && <ExpiredTag>Vencido!</ExpiredTag>}
                      </>
                    )}
                    
                    {!donation.moneyAmount && !donation.expirationDate && '-'}
                  </Td>
                  
                  <Td style={{ textAlign: 'center' }}>
                    <IconButton 
                      variant="edit" 
                      title="Editar" 
                      onClick={() => onEdit(donation)}
                    >
                      ✏️
                    </IconButton>
                    <IconButton 
                      variant="danger" 
                      title="Excluir" 
                      onClick={() => handleDelete(donation.id)}
                    >
                      🗑️
                    </IconButton>
                  </Td>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      )}
    </TableContainer>
  );
}