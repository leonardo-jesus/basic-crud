// CRUD - Create Read Update Delete
/* HTTP Methods - 
GET - Lê informações(Ler um usuário)
POST - Envia informações(Criar um usuário) 
PUT/PATCH - Atualiza informações(Atualiza um usuário)
DELETE - Deleta informações(Deleta um usuário)
*/

const express = require('express');
const app = express();
const { v4 } = require('uuid');

app.use(express.json());

const users = [];

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const user = { id: v4(), name, email };

  users.push(user);

  return res.status(201).json(user);
});

app.get('/users', (req, res) => {
  return res.json(users);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex(user => user.id === id);

  if(userIndex < 0) {
    return res.status(400).json({ error: 'User not found' });
  };

  const user = users[userIndex];
  return res.status(200).json(user);
})

app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex(user => user.id === id);

  if(userIndex < 0) {
    return res.status(400).json({ error: 'User not found' });
  };

  const user = users[userIndex];

  if(name !== undefined) {
    user.name = name;
  };

  if(email !== undefined) {
    user.email = email;
  };

  return res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex(user => user.id === id);

  if(userIndex < 0) {
    return res.status(400).json({ error: 'User not found' });
  };

  users.splice(userIndex, 1);

  return res.status(204).send();
})

app.listen(3001);