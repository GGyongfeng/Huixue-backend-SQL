const db = require('../../data/dbManager');

class BaseQueryBuilder {
    constructor(city) {
        this.city = city;
        this.sql = '';
        this.values = [];
    }

    async execute() {
        return await db.query(this.city, this.sql, this.values);
    }
}

module.exports = BaseQueryBuilder; 