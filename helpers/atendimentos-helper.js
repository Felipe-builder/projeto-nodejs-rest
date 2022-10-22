/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
class AtendimentosHelper {
  constructor() {
    this.dashboardDatas = null;
  }

  dashboard(dados) {
    this.dashboardDatas = {
      ocorrenciaNomes: [],
      ocorrenciaServicos: [],
      ocorrenciaStatus: [],
      ocorrenciaData: [],
    };

    return this.countOccurrences(dados);
  }

  countOccurrences(value) {
    if (!value || !value.length) {
      return this.dashboardDatas;
    }
    const nomeAtual = value[0].cliente.toLowerCase();
    if (!this.dashboardDatas.ocorrenciaNomes.includes(nomeAtual)) {
      const totalNome = value.reduce((total, occ) => (occ.cliente.toLowerCase()
        .includes(nomeAtual) ? total + 1 : total), 0);
      this.dashboardDatas.ocorrenciaNomes.push(
        { nomeAtual, totalNome },
      );
    }
    console.log(value);
    value.shift();
    return this.countOccurrences(value);
  }
}

module.exports = AtendimentosHelper;
