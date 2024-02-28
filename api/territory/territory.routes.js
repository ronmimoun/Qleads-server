import express from 'express';
import { territoryController } from './territory.controller.js';
const router = express.Router()

router.post('/', territoryController.getJobTitles)
router.post('/create', territoryController.create)
router.post('/update/:id', territoryController.update)
router.post('/:id', territoryController.remove)

export default router
