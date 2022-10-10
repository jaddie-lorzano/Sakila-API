import { Router } from 'express';
import filmControllers from '../controllers/FilmControllers.js';
const router = Router();


router
    .route('/')
    .get(filmControllers.getAllFilms)
    .post(filmControllers.createNewFilm);

router
    .route('/:id(\\d+)')
    .get(filmControllers.getFilmById)
    .put(filmControllers.updateFilm)
    .delete(filmControllers.deleteFilm);

export default router;