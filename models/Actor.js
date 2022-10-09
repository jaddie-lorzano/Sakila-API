import actorRepo from '../repos/actorRepo.js';
import genericRepo from '../repos/genericRepo.js';

export default class Actor {


    constructor(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.table_name = 'actor';
    }


    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let HH = d.getHours();
        let MM = d.getMinutes();
        let SS = d.getSeconds();

        let updatedAtDate = `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`;
        let insert = [this.first_name, this.last_name, updatedAtDate];
        let newActor = genericRepo.insert(insert, this.table_name);
        return newActor;
    }

    getAll() {
        let actors = genericRepo.get(this.table_name);
        return actors
    }

    getById(id) {
        let actor = genericRepo.getById(id, this.table_name);
        return actor;
    }

    delete(id) {
        let actor = genericRepo.delete(id, this.table_name);
        deleteActor(actor);
    }

}