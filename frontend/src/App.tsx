import { useState } from 'react';
import { Container, Title } from './styles';
import { DonationForm } from './components/DonationForm';
import { DonationList } from './components/DonationList';

function App() {
  const [refreshList, setRefreshList] = useState(0);
  const [donationToEdit, setDonationToEdit] = useState<unknown>(null);

  const handleRefresh = () => {
    setRefreshList((prev) => prev + 1);
  };

  return (
    <Container>
      <Title>Gerenciador de Doações 📦</Title>
      
      <DonationForm 
        onSuccess={handleRefresh} 
        donationToEdit={donationToEdit} 
        clearEdit={() => setDonationToEdit(null)} 
      />
      
      <DonationList 
        key={refreshList} 
        onEdit={(donation) => setDonationToEdit(donation)}
        onDonationDeleted={handleRefresh} 
      />
    </Container>
  );
}

export default App;