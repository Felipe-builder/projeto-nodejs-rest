/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/pet');
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos');

class Pet {
  adiciona(pet, res) {
    const query = 'INSERT INTO Pets SET ?';

    uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        const novoPet = { nome: pet.nome, imagem: novoCaminho };

        conexao.query(query, novoPet, (erro) => {
          if (erro) {
            console.log(erro);
            res.status(400).json(erro);
          } else {
            res.status(200).json(novoPet);
          }
        });
      }
    });
  }

  lista() {
    return repositorio.lista();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id)
      .then((atendimento) => atendimento)
      .catch((err) => new Error(err));
  }
}

module.exports = new Pet();
