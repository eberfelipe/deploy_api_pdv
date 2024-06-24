exports.seed = function(knex) {
  return knex('clientes').del()
    .then(() => knex.raw('ALTER SEQUENCE clientes_id_seq RESTART WITH 1'))
    .then(function () {
      return knex('clientes').insert([
        {id: 127, nome: 'João Silva', email: 'joao.silva@example.com', cpf: '12345678901', cep: '01001000', rua: 'Rua das Flores', numero: '100', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP'},
        {id: 128, nome: 'Maria Oliveira', email: 'maria.oliveira@example.com', cpf: '23456789012', cep: '02002000', rua: 'Avenida Paulista', numero: '200', bairro: 'Bela Vista', cidade: 'São Paulo', estado: 'SP'},
        {id: 129, nome: 'José Souza', email: 'jose.souza@example.com', cpf: '34567890123', cep: '03003000', rua: 'Rua Augusta', numero: '300', bairro: 'Consolação', cidade: 'São Paulo', estado: 'SP'},
        {id: 130, nome: 'Ana Santos', email: 'ana.santos@example.com', cpf: '45678901234', cep: '04004000', rua: 'Avenida Ipiranga', numero: '400', bairro: 'República', cidade: 'São Paulo', estado: 'SP'},
        {id: 131, nome: 'Paulo Pereira', email: 'paulo.pereira@example.com', cpf: '56789012345', cep: '05005000', rua: 'Rua da Consolação', numero: '500', bairro: 'Higienópolis', cidade: 'São Paulo', estado: 'SP'},
        {id: 132, nome: 'Carla Costa', email: 'carla.costa@example.com', cpf: '67890123456', cep: '06006000', rua: 'Avenida São João', numero: '600', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP'},
        {id: 133, nome: 'Pedro Rocha', email: 'pedro.rocha@example.com', cpf: '78901234567', cep: '07007000', rua: 'Rua dos Andradas', numero: '700', bairro: 'Santa Cecília', cidade: 'São Paulo', estado: 'SP'},
        {id: 134, nome: 'Laura Almeida', email: 'laura.almeida@example.com', cpf: '89012345678', cep: '08008000', rua: 'Avenida Rio Branco', numero: '800', bairro: 'Campos Elíseos', cidade: 'São Paulo', estado: 'SP'},
        {id: 135, nome: 'Lucas Lima', email: 'lucas.lima@example.com', cpf: '90123456789', cep: '09009000', rua: 'Rua 25 de Março', numero: '900', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP'},
        {id: 136, nome: 'Mariana Ribeiro', email: 'mariana.ribeiro@example.com', cpf: '01234567890', cep: '10010000', rua: 'Avenida Brigadeiro Luís Antônio', numero: '1000', bairro: 'Jardins', cidade: 'São Paulo', estado: 'SP'},
        {id: 137, nome: 'Rafael1', email: 'rafael1@email.com', cpf: '33333333552', cep: '40360000', rua: 'Rua Exemplo', numero: '1', bairro: 'Exemplo', cidade: 'Exemplo', estado: 'EX'}
      ]);
    });
};
