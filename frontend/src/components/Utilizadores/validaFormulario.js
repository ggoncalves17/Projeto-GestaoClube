  // Função para validar adicionalmente o formulário dos Utilizadores e Staff, mesmo tendo o "required"
export const validaFormulario = (dados, tipo) => {
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

    tipo === "Gestor" && (dados.funcao.trim() == "" && (erros.funcao = "Campo Obrigatório"));
  
    return erros;
};

  // Função para validar adicionalmente o formulário dos Jogadores / treinadores
export const validaFormularioJogadores = (dados) => {
  const erros = {};
  const dataHoje = new Date();
  const dataValidade = new Date(dados.cc_validade);
  const dataNascimento = new Date(dados.data);

  if (dados.tipo.trim() == "") erros.tipo = "Campo Obrigatório";
  if (dados.sexo.trim() == "") erros.sexo = "Campo Obrigatório";
  if (dados.nome.trim() == "") erros.nome = "Campo Obrigatório";
  if (dados.data.trim() == "") erros.data = "Campo Obrigatório";
  else if (dataNascimento > dataHoje) erros.data = "Data Inválida. Não pode ser superior a hoje.";
  if (dados.nacionalidade.trim() == "") erros.nacionalidade = "Campo Obrigatório";
  if (dados.cc.trim() !== "")  {
    if(!/^\d{8}$/.test(dados.cc)) {
      erros.cc = "Formato Inválido. NIC deve conter 8 dígitos.";
    }
    if (dados.cc_validade.trim() == "") erros.cc_validade = "Campo Obrigatório (Visto que digitou algo no CC)";
    if (dataValidade < dataHoje) erros.cc_validade = "Data do Cartão de Cidadão já expirou.";
  }
  return erros;
};

export const validaFormularioPerfil = (dados) => {
  const erros = {};
  const dataHoje = new Date();
  const dataNascimento = new Date(dados["Data Nascimento"]);

  if (dados.Nome.trim() == "") erros.Nome = "Campo Obrigatório";
  if (dados.Email.trim() == "") erros.Email = "Campo Obrigatório";
  if (dados.Contacto.trim() == "") erros.Contacto = "Campo Obrigatório";
  if (!/^9\d{8}$/.test(dados.Contacto)) erros.Contacto = "Número de Telefone Inválido";
  if (dados["Data Nascimento"].trim() == "") erros["Data Nascimento"] = "Campo Obrigatório";
  else if (dataNascimento > dataHoje) erros["Data Nascimento"] = "Data Inválida. Não pode ser superior a hoje.";
  else if (dataHoje - dataNascimento < 568036800000) erros["Data Nascimento"] = "É necessário ter pelo menos 18 anos.";

  return erros;
};