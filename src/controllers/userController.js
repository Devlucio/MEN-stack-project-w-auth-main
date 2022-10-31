const UserSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
  //db.people.find().prety()
  UserSchema.find(function (err, users) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
      res.status(200).send(users)
  }) 
};

const createUser = async (req, res) => {
  console.log("Senha antes do HASH", req .body.password)
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  console.log("Senha depois do HASH", req .body.password, "Senha do body", req.body.password)

  req.body.password = hashedPassword

  try{
    //Acessar as informações que vem no body da requisição
  const newUser = new UserSchema (req.body);
  
  //Criar um novo usuário
  const savedUser = newUser.save();

  //Enviar uma res
  res.status(201).send({
    "message": "Usuário criado com sucesso", savedUser
  })
  } catch(e){
    console.error(e)
  }
  

}

module.exports = {
  getAll, 
  createUser
};
