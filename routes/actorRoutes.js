import { Router } from 'express';
import actorControllers from '../controllers/actorControllers.js';
const router = Router();

router
    .route('/')
    .get(actorControllers.getAllActors)
    .post(actorControllers.createNewActor)
    .put(actorControllers.updateActor)
    .delete(actorControllers.deleteActor)

router
    .route('/:id')
    .get(actorControllers.getActorById);

export default router;