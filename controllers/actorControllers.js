import Actor from '../models/Actor.js';

let actorController = {
    getAllActors: async (req, res, next) => {
        let actor = new Actor();
        await actor.getAll()
            .then(actors => {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "All actors retrieved.",
                    "actor": actors,
                });
            })
            .catch(err => next(err));
    },
    getActorById: async (req, res, next) => {
        let actorId = req.params.id;
        let actor = new Actor();
        await actor.getById(actorId)
            .then(actor => {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Actor '${actor.first_name} ${actor.last_name}' with id '${actor.actor_id}' retrieved successfully`,
                    "data": { "actor": actor }
                });
            })
            .catch(err => next(err));
    },
    createNewActor: async (req, res, next) => {
        let { first_name, last_name } = req.body;
        let actor = new Actor(first_name, last_name);

        await actor.save()
            .then(actor => {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Actor '${actor.first_name} ${actor.last_name}' with id '${actor.actor_id}' created successfully`,
                    "actor": actor,
                });
            })
            .catch(err => next(err));
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