import Actor from '../models/Actor.js';
import BaseRepo from '../repos/BaseRepo.js';
import ActorService from '../services/ActorService.js';
import ACTOR_CONSTANTS from '../constants/ActorConstants.js'

let ActorController = {
    getAllActors: async (req, res, next) => {
        let dbTableColumnList = []; 
        let dbValuesList = [];
        // when query in request exists, list of actors will be filtered
        if (Object.keys(req.query).length > 0) {
            [ dbTableColumnList, dbValuesList ] = ActorService.getDbQueryTableAndValues(req, res, next);
            // get the list of table column and values for the db query
        };
        await BaseRepo.get(ACTOR_CONSTANTS.ACTOR_TABLE_NAME, dbTableColumnList, dbValuesList)
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
        await BaseRepo.getById(actorId, ACTOR_CONSTANTS.ACTOR_TABLE_NAME)
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
        ACTOR_CONSTANTS.ACTOR_TABLE_NAME, dbTableColumnList, dbValuesList
        let actorColumns = `${ACTOR_CONSTANTS.ACTOR_TABLE_FIRST_NAME_COLUMN},${ACTOR_CONSTANTS.ACTOR_TABLE_LAST_NAME_COLUMN},${ACTOR_CONSTANTS.ACTOR_TABLE_LAST_UPDATE}`;
        let values = [ actor.firstName, actor.lastName, actor.lastUpdateDate ];
        let actorId = await BaseRepo.insert(actorColumns, values, ACTOR_CONSTANTS.ACTOR_TABLE_NAME)
            .then(data => { return data })
            .catch(err => next(err));
        await BaseRepo.getById(actorId, ACTOR_CONSTANTS.ACTOR_TABLE_NAME)
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
    updateActor: async (req, res, next) => {
        res.send("Actor updated successfully");
    },
    deleteActor: async (req, res, next) => {
        let actorId = req.params.id;
        let actor = await Actor.getById(actorId);
        actor.delete();
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": `Actor '${actor.firstName} ${actor.lastName}' with id '${actor.id}' retrieved successfully`,
            "data": { "actor": actor }
        });
    }
};

export default ActorController;