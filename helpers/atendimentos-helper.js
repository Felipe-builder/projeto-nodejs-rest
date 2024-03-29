/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
class AtendimentosHelper {
  constructor() {
    this.dashboardDatas = {
      ocorrenciaCliente: [],
      ocorrenciaPet: [],
      ocorrenciaServico: [],
      ocorrenciaStatus: [],
      ocorrenciaData: [],
    };
  }

  dashboard(dados) {
    const newArray = dados.slice();

    return this.countOccurrences(newArray);
  }

  *countOccurrences(value) {
    if (!value || !value.length) {
      return 0;
    }
    yield this.dashboardDatas;
    this.upsertDashboardDatas(value);
    yield* this.countOccurrences(value);
  }

  upsertDashboardDatas(dados) {
    const dadoTransforned = this.dataTransformationValueDashboardAtendimento(dados.shift());
    Object.entries(dadoTransforned).forEach(([key, value]) => {
      const dashboardKey = `ocorrencia${key}`;
      if (!this.dashboardDatas[dashboardKey].includes(value)) {
        const totalDoCampo = dados.reduce((total, occ) => (occ[key.toLocaleLowerCase()].toLowerCase()
          .includes(value.toLocaleLowerCase()) ? total + 1 : total), 0);
        this.dashboardDatas[dashboardKey].push(
          { value, totalDoCampo },
        );
      }
    });
  }

  dataTransformationValueDashboardAtendimento(dado) {
    return {
      Cliente: dado.cliente,
      Pet: dado.pet,
      Servico: dado.servico,
      Status: dado.status,
      Data: dado.data,
    };
  }
}

module.exports = AtendimentosHelper;
