// Função para ordenar a Lista de Utilizadores (Jogadores / Treinadores, Staff ou Utilizadores) pelo campo selecionado
export const ordenaUtilizadores = (listaFiltrados, ordenacao) => {
  let utilizadoresOrdenados = [...listaFiltrados];
  const campoOrdenar = ordenacao?.campo;

  if (ordenacao) {
    utilizadoresOrdenados.sort((a, b) => {
      const valorA = getValorCampo(a, campoOrdenar);
      const valorB = getValorCampo(b, campoOrdenar);

      if (valorA === undefined || valorB === undefined) return 0;

      const numA = parseFloat(valorA);
      const numB = parseFloat(valorB);

      const isNumero = !isNaN(numA) && !isNaN(numB);

      if (isNumero) {
        return ordenacao.ordem === "ASC" ? numA - numB : numB - numA;
      } else {
        return ordenacao.ordem === "ASC"
          ? String(valorA).localeCompare(String(valorB))
          : String(valorB).localeCompare(String(valorA));
      }
    });
  }

  return utilizadoresOrdenados;
};

const getValorCampo = (obj, caminho) => {
  return caminho.split(".").reduce((acc, chave) => acc?.[chave], obj);
};
