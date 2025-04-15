  // Função para validar adicionalmente o formulário, mesmo tendo o "required"
export const validaFormulario = (dados) => {
    const erros = {};
    const dataHoje = new Date();
    const dataNascimento = new Date(dados.data);
  
    if (dados.nome.trim() == "") erros.nome = "Campo Obrigatório";
    if (dados.email.trim() == "") erros.email = "Campo Obrigatório";
    if (dados.telefone.trim() == "") erros.telefone = "Campo Obrigatório";
    if (!/^9\d{8}$/.test(dados.telefone)) erros.telefone = "Número de Telefone Inválido";
    if (dados.data.trim() == "") erros.data = "Campo Obrigatório";
    else if (dataNascimento > dataHoje) erros.data = "Data Inválida. Não pode ser superior a hoje.";
    else if (dataHoje - dataNascimento < 568036800000) erros.data = "É necessário ter pelo menos 18 anos.";
    if (dados.funcao.trim() == "") erros.funcao = "Campo Obrigatório";
  
    return erros;
  };