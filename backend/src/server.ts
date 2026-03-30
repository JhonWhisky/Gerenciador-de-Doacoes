import express from 'express';
import cors from 'cors';
import donationRoutes from './routes/donation.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Usando as rotas criadas
app.use('/api', donationRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});