const { error } = require('../constants');
const { rejects, deepStrictEqual } = require('assert');
const Atendimento = require('../models/atendimentos');
const atendimentosMock = require('../mocks/atendimentos.json');
;
(async() => {
  {
    const rejection = new Error(error.NOT_FOUND_ERROR);
    const result = await Atendimento.lista();
    const expected = atendimentosMock.listAll;
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

  {
    const id = 39922241120;
    const result = await Atendimento.buscaPorId(id);
    const expected = atendimentosMock.oneClient;
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

  {
    const result = await Atendimento.adiciona(atendimentosMock.toCreate);
    atendimentosMock.created.id = result.id;
    const expected = atendimentosMock.created;
    // console.log(expected)
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

})()