const express = require('express');

const server = express();

server.use(express.json());
// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }


//server.get('/curso', (req,  res) => {
//const nome = req.query.nome;
//return res.json({ curso: `Aprendendo ${nome}`});

const cursos= ['node JS', 'JavaScript', 'React'];

server.get('/cursos', (req, res) => {
  return res.json(cursos)
});
// localhost:3000/curso/2

//criando novo curso
server.post('/cursos', (req, res)=>{
  const { name } = req.body;
  cursos.push(name);
})

// atualizando curso
server.put('/curso/:index', checkIndexCurso, (req, res)=> {
  const { index} = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
})

// excluindo algum curso
server.delete('/cursos/:index', (req, res)=>{
  const { index }= req.params;

  cursos.splice(index, 1);
  return res.send();
})
// middleware global
server.use((req, res, next)=>{
  console.log("URL CHAMADA: "+ req.url);

  return next();
})

function checkCurso(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: "Nome do curso é obrigatorio"});
  }
  return next();
}

function checkIndexCurso(req, res, next){
  const curso = cursos[req.params.index];

  if(!curso){
    return res.status(400).json({ error: "O usuário não existe"});

    return next();
  }
}

server.get('/cursos/:index', (req, res) => {
  const index = req.params.id;

  return res.json( cursos[index]);

})

server.listen(3000);