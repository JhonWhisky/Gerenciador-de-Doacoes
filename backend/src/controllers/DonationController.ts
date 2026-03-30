import { Request, Response } from 'express';
import { DonationService } from '../services/DonationService';

const donationService = new DonationService();

export class DonationController {
  
  // Transformado em Arrow Function
  create = (req: Request, res: Response) => {
    try {
      const donationData = req.body;
      const newDonation = donationService.create(donationData);
      
      return res.status(201).json(newDonation);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Transformado em Arrow Function
  list = (req: Request, res: Response) => {
    const donations = donationService.findAll();
    return res.status(200).json(donations);
  }

  update = (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const donationData = req.body;
      const updatedDonation = donationService.update(id, donationData);
      
      return res.status(200).json(updatedDonation);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  delete = (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      donationService.delete(id);
      
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}