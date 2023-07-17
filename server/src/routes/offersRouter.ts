import { Router } from 'express';
import offersController from '../controllers/offersController';

const router = Router();
router.get('/', offersController.getOffers);
router.post('/addOffer', offersController.addOffer);

export default router;