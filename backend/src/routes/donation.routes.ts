import { Router } from 'express';
import { DonationController } from '../controllers/DonationController';

const routes = Router();
const donationController = new DonationController();

routes.post('/donations', donationController.create);
routes.get('/donations', donationController.list);
routes.put('/donations/:id', donationController.update); // Nova rota de Update
routes.delete('/donations/:id', donationController.delete); // Nova rota de Delete

export default routes;