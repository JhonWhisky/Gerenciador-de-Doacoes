import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: #000;
  font-family: sans-serif;
`;

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  // background: #000;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #aa3bff;
  }
`;

export const Select = styled.select`
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  background-color: white;

  &:focus {
    border-color: #aa3bff;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #aa3bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 8px;

  &:hover {
    background-color: #8c2ce6;
  }
`;

export const ErrorMessage = styled.span`
  color: #d32f2f;
  font-size: 14px;
  margin-top: -8px;
`;

export const SuccessMessage = styled.span`
  color: #2e7d32;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 464px; /* Largura do form + padding */
  margin: 1rem 0;
`;

export const Card = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 4px solid #aa3bff;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const Badge = styled.span`
  background-color: #aa3bff;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
`;

export const CardBody = styled.div`
  font-size: 14px;
  color: #666;
  
  p {
    margin: 4px 0;
  }
  
  strong {
    color: #444;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  border-top: 1px solid #eee;
  padding-top: 12px;
`;

export const ActionButton = styled.button<{ variant?: 'danger' | 'edit' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.variant === 'danger' ? '#d32f2f' : '#1976d2')};
  
  &:hover {
    opacity: 0.8;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Aumentei a largura para caber a tabela */
  margin-top: 32px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Para não quebrar o layout em ecrãs pequenos */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #eee;
  color: #333;
  font-weight: bold;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  color: #666;
  vertical-align: middle;
`;

export const IconButton = styled.button<{ variant?: 'danger' | 'edit' }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 8px;
  transition: transform 0.2s;
  
  /* Filtro simples para dar cor aos emojis (opcional) */
  filter: ${(props) => (props.variant === 'danger' ? 'grayscale(0) hue-rotate(0deg)' : 'hue-rotate(180deg)')};

  &:hover {
    transform: scale(1.2);
  }
`;

export const TableRow = styled.tr<{ $isExpired?: boolean }>`
  background-color: ${(props) => (props.$isExpired ? '#ffebee' : 'transparent')};
  transition: background-color 0.2s;

  /* Se estiver vencido, sobrepõe a cor do texto das células (Td) para vermelho */
  td {
    color: ${(props) => (props.$isExpired ? '#d32f2f' : '#666')};
  }

  /* Mantém o texto em negrito mais escuro, mas avermelhado se vencido */
  strong {
    color: ${(props) => (props.$isExpired ? '#b71c1c' : '#333')};
  }
`;

export const ExpiredTag = styled.span`
  background-color: #d32f2f;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  align-self: center;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
`;