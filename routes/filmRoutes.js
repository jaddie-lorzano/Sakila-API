import { Router } from 'express';
import { getAllFilms, createNewFilm, getFilmById } from '../controllers/filmControllers.js';
const router = Router();


router
    .route('/')
    .get(getAllFilms)
    .post(createNewFilm);

router
    .route('/:id')
    .get(getFilmById);

export default router;