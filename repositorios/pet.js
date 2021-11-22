const query = require('../infraestrutura/database/queries') 

class Pet {
    lista(){
        const sql = 'SELECT * FROM Pets'

        return query(sql)
    }
}

module.exports = new Pet()