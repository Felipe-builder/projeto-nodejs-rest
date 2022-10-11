/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Service = require('./service');

const Atendimentos = require('../models/atendimentos');

const BASE_URL_1 = 'http://localhost:3000/atendimentos';
const BASE_URL_2 = 'http://localhost:3000/atendimentos/41422303499';
const BASE_URL_3 = 'http://localhost:3000/atendimentos/11322455524';

const mocks = {
  aldenRempel: require('../mocks/atendimentosGetOne.json'),
  eleazarHamill: require('../mocks/atendimentosGetOne1.json'),
};

(async () => {
  // {
  //   const service = new Service();
  //   const withoutStub = await service.makeRequest(BASE_URL_3);
  //   console.log(JSON.stringify(withoutStub));
  // }
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.aldenRempel);

  stub
    .withArgs(BASE_URL_3)
    .resolves(mocks.eleazarHamill);

  // {
  //   const response = await service.makeRequest(BASE_URL_2);
  //   console.log('response', response);
  // }

  {
    const response = await service.getResumeAtendimento(BASE_URL_3);
    console.log('response', response);
  }
  {
    const expected = {
      cliente: { nome: 'Alden Rempel', idade: 0 },
      pet: 'Zorros',
      servico: 'tosa',
    };

    const results = await service.getResumeAtendimento(BASE_URL_2);
    deepStrictEqual(results, expected);
  }

  {
    const expected = {
      cliente: { nome: 'Eleazar Hamill', idade: 0 },
      pet: 'Zorros',
      servico: 'tosa',
    };

    const results = await service.getResumeAtendimento(BASE_URL_3);
    deepStrictEqual(results, expected);
  }
})();
