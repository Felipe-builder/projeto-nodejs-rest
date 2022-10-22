/* eslint-disable global-require */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Service = require('./service');
const AtendimentosHelper = require('../helpers/atendimentos-helper');
const Atendimentos = require('../models/atendimentos');

const baseUrl = 'http://localhost:3000';

const mocks = {
  client: {
    aldenRempel: require('../mocks/atendimentosGetOne.json'),
    eleazarHamill: require('../mocks/atendimentosGetOne1.json'),
    all: require('../mocks/atendimentosGetAll.json'),
  },
  pet: {
    harry: require('../mocks/petsGetOne1.json'),
    alekhine: require('../mocks/petsGetOne2.json'),
  },
};

async function gerenateMock(url) {
  {
    const service = new Service();
    const withoutStub = await service.makeRequest(url);
    console.log(JSON.stringify(withoutStub));
  }
}

(async () => {
  const service = new Service();
  const atendimentosHelper = new AtendimentosHelper();
  
  const stub = sinon.stub(service, service.makeRequest.name);

  const urlClient = {
    all: `${baseUrl}/pets`,
  }
  const url2 = `${baseUrl}/atendimentos/41422303499`;
  const url3 = `${baseUrl}/atendimentos/11322455524`;
  const urlPet = {
    pet1: `${baseUrl}/pets/1`,
    pet2: `${baseUrl}/pets/8`,
  };

  stub
    .withArgs(url2)
    .resolves(mocks.client.aldenRempel);

  stub
    .withArgs(url3)
    .resolves(mocks.client.eleazarHamill);

  stub
    .withArgs(urlPet.pet1)
    .resolves(mocks.pet.harry);

  stub
    .withArgs(urlPet.pet2)
    .resolves(mocks.pet.alekhine);

  stub
    .withArgs(urlClient.all)
    .resolves(mocks.client.all);
  // await gerenateMock(urlPet.pet2);

  // {
  //   const response = await service.makeRequest(BASE_URL_2);
  //   console.log('response', response);
  // }

  {
    const expected = {
      cliente: { nome: 'Alden Rempel', idade: 0 },
      pet: 'Zorros',
      servico: 'tosa',
    };

    const results = await service.getResumeAtendimento(url2);
    deepStrictEqual(results, expected);
  }

  // {
  //   const response = await service.getResumeAtendimento(url3);
  //   console.log('response', response);
  // }

  {
    const expected = {
      cliente: { nome: 'Eleazar Hamill', idade: 0 },
      pet: 'Zorros',
      servico: 'tosa',
    };

    const results = await service.getResumeAtendimento(url3);
    deepStrictEqual(results, expected);
  }

  {
    const expected = {
      id: 1,
      nome: 'Harry',
      imagem: './imagens/pastor-alemao.jpg',
    };

    const results = await service.getResumeAtendimento(urlPet.pet1);
    deepStrictEqual(results, expected);
  }

  {
    const expected = {
      id: 8,
      nome: 'Alekhine',
      imagem: './assets/imagens/Alekhine.jpg',
    };

    const results = await service.getResumeAtendimento(urlPet.pet2);
    deepStrictEqual(results, expected);
  }

  {
    const response = await service.makeRequest(urlClient.all);
    const results = atendimentosHelper.dashboard(response);
    console.log(results);
  }
})();
