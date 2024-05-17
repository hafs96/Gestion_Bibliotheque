import express from 'express';
import { AfficherLivre, AjouterLivre, ModifierLivre, SupprimerLivre } from '../Controllers/LivreControllers.js';

const routes = express.Router();

router.get('/api/v1/livre/:idLivre', AfficherLivre);
router.post('/api/v1/livre', AjouterLivre);
router.put('/api/v1/livre/:idLivre', ModifierLivre);
router.delete('/api/v1/livre/:idLivre', SupprimerLivre);

export default routes;