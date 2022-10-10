import { Router } from 'express';
import filmControllers from '../controllers/filmControllers.js';
const router = Router();


router
    .route('/')
    .get(filmControllers.getAllFilms)
    .post(filmControllers.createNewFilm);

router
    .route('/:id')
    .get(filmControllers.getFilmById)
    .put(filmControllers.updateFilm)
    .delete(filmControllers.deleteFilm);

router
    .route('/filter')

export default router;