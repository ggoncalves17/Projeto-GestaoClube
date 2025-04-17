export const camposFormulario = [
    { id: 'email', label: 'Email *', tipo: 'email', placeholder: 'Ex: utilizador@gmail.com' },
    { id: 'nome', label: 'Nome *', tipo: 'text', placeholder: 'Ex: João Silva' },
    { id: 'telefone', label: 'Telefone *', tipo: 'number', placeholder: 'Ex: 910111222' },
    { id: 'data', label: 'Data Nascimento *', tipo: 'date', placeholder: '' },
    { id: 'funcao', label: 'Função *', tipo: 'text', placeholder: 'Ex: Presidente' },
]

export const camposFormularioJogadores = [
    { id: 'nome', label: 'Nome *', tipo: 'text', placeholder: 'Ex: João Silva' },
    { id: 'data', label: 'Data Nascimento *', tipo: 'date', placeholder: '' },
    { id: 'nacionalidade', label: 'País / Nacionalidade *', tipo: 'text', placeholder: 'Ex: Portugal' },
    { id: 'cc', label: 'Cartão Cidadão (NIC)', tipo: 'number', placeholder: 'Ex: 11122233', grupo: true },
    { id: 'cc_validade', label: 'Data Validade', tipo: 'date', placeholder: '', grupo: true },
    { id: 'peso', label: 'Peso', tipo: 'number', placeholder: 'Ex: 72', grupo: true },
    { id: 'altura', label: 'Altura', tipo: 'number', placeholder: 'Ex: 1.82', grupo: true },
]
