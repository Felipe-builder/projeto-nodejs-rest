/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const moment = require('moment');
const axios = require('axios');
// const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');

class Atendimento {
  constructor() {
    this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);
    this.clienteEhValido = ({ tamanho }) => tamanho >= 5;
    this.valida = (parametros) => this.validacoes.filter((campo) => {
      const { nome } = campo;
      const parametro = parametros[nome];

      return !campo.valido(parametro);
    });
    this.validacoes = [
      {
        nome: 'data',
        valido: this.dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual',
      },
      {
        nome: 'cliente',
        valido: this.clienteEhValido,
        mensagem: 'Cliente deve ter mpelo menos cinco caracteres',
      },
    ];
  }

  adiciona(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length },
    };

    const erros = this.valida(parametros);
    const existemErros = erros.length;

    if (existemErros) {
      // eslint-disable-next-line no-promise-executor-return
      return new Promise((resolve, reject) => reject(erros));
    }
    const atendimentoDatado = { ...atendimento, dataCriacao, data };

    return repositorio.adiciona(atendimentoDatado)
      .then((resultados) => {
        const id = resultados.insertId;
        return { ...atendimento, id };
      });
  }

  lista() {
    return repositorio.lista();
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id)
      .then(async (resultados) => {
        const atendimento = resultados[0];
        console.log(atendimento);

        /* quando tivermos o resultado dessa query em maos, ja sabemos qual é o cpf do cliente que desejamos
         manipular, então esse é o momento que vamos buscar as informações
        */
        const cpf = atendimento.cliente; // nome do campo que salvaremos

        // logica la embaixo
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);

        atendimento.cliente = data;

        return atendimento;
      });
  }

  altera(id, valores) {
    if (valores.data) {
      // eslint-disable-next-line no-param-reassign
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    return repositorio.altera(valores, id)
      .then((resultados) => ({ ...valores, id }));
  }

  deleta(id) {
    return repositorio.deleta(id)
      .then((resultado) => {
        console.log(resultado);
        return { id };
      });
  }
}

module.exports = new Atendimento();
