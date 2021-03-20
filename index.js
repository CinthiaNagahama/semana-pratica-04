const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app
  // Set pug template path
  .set('views', './src/views')
  .set('view engine', 'pug')
  // Get data from cookies
  .use(cookieParser())
  // Get data from body
  .use(express.urlencoded({ extended: true }))
  // GET
  .get('/', (req, res) => {
    var newStudentsList = [];

    var students = req.cookies.students;

    students.map((value) => {
      var updateStudent = {
        "nome": "",
        "matricula": "",
        "data_nascimento": "",
        "idade": ""
      };

      updateStudent.nome = value.nome;
      updateStudent.matricula = value.matricula;
      
      var dataNasc = value.data_nascimento;
      dataNasc = dataNasc.split('-');
      const ano = dataNasc[0], mes = dataNasc[1], dia = dataNasc[2]; 
      updateStudent.data_nascimento = `${dia}/${mes}/${ano}`;
      
      now = new Date;
      updateStudent.idade = now.getFullYear() - ano;
      
      if(mes > (now.getMonth() + 1) || (mes == (now.getMonth() + 1) && dia > now.getDate())){
        updateStudent.idade--;
      }
      newStudentsList.push(updateStudent);
    });


    res.render('index', {
      students: newStudentsList
    });
  })
  // POST
  .post('/', (req, res) => {
    var students = req.cookies.students;

    students.push(req.body);

    res.cookie('students', students, {httpOnly: true});

    res.redirect('/');
  })
  // Port
  .listen(3000, () => console.log('Server is running on port 3000'));