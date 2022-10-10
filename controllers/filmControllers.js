import FILM_CONSTANTS from '../constants/filmConstants.js';
import Film from '../models/Film.js';
import BaseRepo from '../repos/BaseRepo.js';
import FilmService from '../services/FilmService.js';

let filmControllers = {
    getAllFilms: async (req, res, next) => {
        let dbTableColumnList = []; 
        let dbValuesList = [];
        // when query in request exists, list of films will be filtered
        if (Object.keys(req.query).length > 0) {
            [ dbTableColumnList, dbValuesList ] = FilmService.getDbQueryTableAndValues(req, res, next);
            // get the list of table column and values for the db query
        };
        await BaseRepo.get(FILM_CONSTANTS.FILM_TABLE_NAME, dbTableColumnList, dbValuesList)
            .then(data => {
                if (data) {
                    let films = new Array();
                    data.forEach(film => {
                        films.push(
                            new Film(
                                film.title, 
                                film.film_id)
                            );
                    })
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All films retrieved.",
                        "data": { "films" : films }
                    });
                } else {
                    res.status(404).send({
                        "status": 404,
                        "statusText": "Not Found",
                        "message": "Films could not be found.",
                        "error": {
                            "code": "NOT_FOUND",
                            "message": "Films could not be found."
                        }
                    });
                }
            })
            .catch(err => next(err));
    },
    getFilmById: async (req, res, next) => {
        let filmId = req.params.id;
        await BaseRepo.getById(filmId, FILM_CONSTANTS.FILM_TABLE_NAME)
            .then(data => {
                if (data) {
                    let film = new Film(
                        data.title, 
                        data.film_id
                        );
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": `Film '${film.title}' with id '${film.id}' retrieved successfully`,
                        "data": { "film": film }
                    });
                } else {
                    res.status(404).send({
                        "status": 404,
                        "statusText": "Not Found",
                        "message": "The film with id '" + filmId + "' could not be found.",
                        "error": {
                            "code": "NOT_FOUND",
                            "message": "The film with id '" + filmId + "' could not be found."
                        }
                    });
                }
            })
            .catch(err => next(err));
    },
    createNewFilm: async (req, res, next) => {

    },
    updateFilm: async (req, res, next) => {

    },
    deleteFilm: async (req, res, next) => {

    }
}

export default filmControllers;