import { Router } from 'express';
import ActorControllers from '../controllers/ActorControllers.js';
const router = Router();

router
    .route('/')
    .get(ActorControllers.getAllActors)
    .post(ActorControllers.createNewActor)

router
    .route('/:id(\\d+)')
    .get(ActorControllers.getActorById)
    .put(ActorControllers.updateActor)
    .delete(ActorControllers.deleteActor);

export default router;