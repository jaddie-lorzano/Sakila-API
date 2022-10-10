export default class Actor {

    constructor(firstName, lastName, lastUpdateDate, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.lastUpdateDate = lastUpdateDate;
        this.id = id;
    };

    updateDate() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let HH = d.getHours();
        let MM = d.getMinutes();
        let SS = d.getSeconds();

        let currentDateTime = `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`;
        this.lastUpdateDate = currentDateTime;
    };

};