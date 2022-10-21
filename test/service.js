const https = require('https');
const http = require('http');

class Service {
  async makeRequest(url) {
    if (url.includes('https')) {
      return new Promise((resolve, reject) => {
        https.get(url, (response) => {
          response.on('data', (data) => resolve(JSON.parse(data)));
          response.on('error', reject);
        });
      });
    }

    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        response.on('data', (data) => resolve(JSON.parse(data)));
        response.on('error', reject);
      });
    });
  }

  async getResumeAtendimento(url) {
    const result = await this.makeRequest(url);
    if (url.match(/atendimentos/)) {
      const anoAtual = new Date().getFullYear();
      return {
        cliente: {
          nome: result.cliente.nome,
          idade: anoAtual - new Date(result.cliente.dataDeNascimento).getFullYear(),
        },
        pet: result.pet,
        servico: result.servico,
      };
    }

    if (url.match(/pets/)) {
      return result;
    }

    return new Error('Not Found Execption');
  }
}

module.exports = Service;
