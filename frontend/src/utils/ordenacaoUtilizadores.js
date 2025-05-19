// Função para ordenar a Lista de Utilizadores (Jogadores / Treinadores, Staff ou Utilizadores) pelo campo selecionado
export const ordenaUtilizadores = (listaFiltrados, ordenacao) => {
  let utilizadoresOrdenados = [...listaFiltrados];

  const campoOrdenar = ordenacao?.campo;

  ordenacao != undefined &&
    (ordenacao.ordem == "ASC"
      ? utilizadoresOrdenados.sort((a, b) =>
          a[campoOrdenar].localeCompare(b[campoOrdenar])
        )
      : utilizadoresOrdenados.sort((a, b) =>
          b[campoOrdenar].localeCompare(a[campoOrdenar])
        ));

  return utilizadoresOrdenados;
};
