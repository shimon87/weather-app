const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

var app=express();

const port = process.env.PORT || 3000;
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
app.use((req,res,next)=>{
  var now =new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    console.log('unable to append');
  });
  next();
});

app.get('/bad',(req,res)=>{
  res.send({
    'error massege':'cant get response'
  }
);
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    home: 'Home page',
    header:'Home Page',

  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    header: 'About Page'
  });
});

app.listen(port);
