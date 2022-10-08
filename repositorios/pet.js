/* eslint-disable class-methods-use-this */
const query = require('../infraestrutura/database/queries');

class Pet {
  lista() {
    const sql = 'SELECT * FROM Pets';

    return query(sql);
  }

  adiciona(novoPet) {
    const sql = 'INSERT INTO Pets SET ?';

    return query(sql, novoPet);
  }
}

module.exports = new Pet();
