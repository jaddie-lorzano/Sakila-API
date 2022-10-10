import Actor from '../models/Actor.js';
import baseRepo from '../repos/baseRepo.js';

const TABLE_NAME = `actor`
const FIRST_NAME = 'first_name'
const LAST_NAME = 'last_name'

let actorController = {
    getAllActors: async (req, res, next) => {
        await baseRepo.get(TABLE_NAME)
            .then(data => {
                if (data) {
                    let actors = new Array();
                    data.forEach(actor => {
                        actors.push(
                            new Actor(
                                actor.first_name, 
                                actor.last_name, 
                                actor.last_update, 
                                actor.actor_id)
                            );
                    })
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All actors retrieved.",
                        "data": { "actors" : actors }
                    });
                } else {
                    res.status(404).send({
                        "status": 404,
                        "statusText": "Not Found",
                        "message": "Actors could not be found.",
                        "error": {
                            "code": "NOT_FOUND",
                            "message": "Actors could not be found."
                        }
                    });
                }
            })
            .catch(err => next(err));
    },
    getActorById: async (req, res, next) => {
        let actorId = req.params.id;
        await baseRepo.getById(actorId, TABLE_NAME)
            .then(data => {
                if (data) {
                    let actor = new Actor(
                        data.first_name, 
                        data.last_name, 
                        data.last_update, 
                        data.actor_id
                        );
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": `Actor '${actor.firstName} ${actor.lastName}' with id '${actor.id}' retrieved successfully`,
                        "data": { "actor": actor }
                    });
                } else {
                    res.status(404).send({
                        "status": 404,
                        "statusText": "Not Found",
                        "message": "The actor with id '" + actorId + "' could not be found.",
                        "error": {
                            "code": "NOT_FOUND",
                            "message": "The actor with id '" + actorId + "' could not be found."
                        }
                    });
                }
            })
            .catch(err => next(err));
    },
    createNewActor: async (req, res, next) => {
        let { firstName, lastName } = req.body;
        let actor = new Actor(firstName, lastName);
        actor.updateDate();
        let actorColumns = `${FIRST_NAME},${LAST_NAME},last_update`;
        let values = [ actor.firstName, actor.lastName, actor.lastUpdateDate ];
        let actorId = await baseRepo.insert(actorColumns, values, TABLE_NAME)
            .then(data => { return data })
            .catch(err => next(err));
        await baseRepo.getById(actorId, TABLE_NAME)
            .then(data => {
                let actor = new Actor(
                    data.first_name, 
                    data.last_name, 
                    data.last_update, 
                    data.actor_id);
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Actor '${actor.firstName} ${actor.lastName}' with id '${actor.id}' created successfully`,
                    "data": {"actor": actor},
                });
            })
            .catch(err => next(err));
    },
    filterActors: async (req, res, next) => {
        let firstName = req.query.fname;
        let lastName = req.query.lname;
        let message = ``;
        if (firstName && lastName) {
            message += `Filter actors by first Name: ${firstName} and by last Name: ${lastName}`;
            let tableArray = [FIRST_NAME,LAST_NAME];
            let valuesArray = [`${firstName}%`, `${lastName}%`];
            let filteredActors = await baseRepo.filter(tableArray, valuesArray, TABLE_NAME)
            res.status(200).json({
                "filteredActors": filteredActors
            })
        }
        if (firstName && lastName == null) {
            message += "Filter actors by first Name: " + firstName;
        }
        if (firstName == null && lastName) {
            message += "Filter actors by last Name: " + lastName;
        }
        if (firstName == null && lastName == null) {
            message += `Please check your filter parameters`;
        }
        // await baseRepo.getById(actorId, TABLE_NAME)
    },
    updateActor: async (req, res, next) => {
        
    },
    deleteActor: async (req, res, next) => {
        let actorId = req.params.id;
        let actor = await Actor.getById(actorId);
        actor.delete();
        res.status(200).json({
            "actor": actor
        });
    }
};

export default actorController;