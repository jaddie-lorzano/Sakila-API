import { Router } from 'express';
import actorControllers from '../controllers/actorControllers.js';
const router = Router();

router
    .route('/')
    .get(actorControllers.getAllActors)
    .post(actorControllers.createNewActor)

router
    .route('/filter')
    .get(actorControllers.filterActors)

router
    .route('/:id')
    .get(actorControllers.getActorById)
    .put(actorControllers.updateActor)
    .delete(actorControllers.deleteActor);

export default router;