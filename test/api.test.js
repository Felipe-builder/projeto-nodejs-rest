const { describe, it } = require('mocha');
const request = require('supertest');
const assert = require('assert');
const app = require('../index');

const mocks = {
  allAtendimentos: require('../mocks/atendimentosGetAll.json'),
};

mocks.allAtendimentos.splice(2, 1);

describe('API Suite test', () => {
  describe('/atendimentos', () => {
    it('should request the atendimentos page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/atendimentos')
        .expect(200);
      assert.deepStrictEqual(JSON.stringify(response.body), JSON.stringify(mocks.allAtendimentos));
    });
  });
});
