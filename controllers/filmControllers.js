export async function getAllFilms(req, res, next) {
    res.send('Get all films route')
}

export async function createNewFilm(req, res, next) {
    res.send('Create new film route')
}

export async function getFilmById(req, res, next) {
    res.send('Get film by ID route')
}