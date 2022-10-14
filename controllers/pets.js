const Pet = require('../models/pets');

module.exports = (app) => {
  app.get('/pets', (req, res) => {
    Pet.lista()
      .then((resultados) => res.json(resultados))
      .catch((erro) => res.status(400).json(erro));
  });

  app.get('/pets/:id', (req, res) => {
    const { id } = req.params;

    Pet.buscaPorId(id)
      .then((resultado) => res.json(resultado))
      .catch((erros) => res.status(400).json(erros));
  });

  app.post('/pets', (req, res) => {
    const pet = req.body;

    Pet.adiciona(pet, res);
  });
};
