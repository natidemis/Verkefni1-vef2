const path = require('path');
const express = require('express');


const app = express();
const videos = require('./src/videos.js');

const host = '127.0.0.1';
const port = 3000;


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');



app.locals.parseDate = (d) => {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth();
    const year  = date.getFullYear();
    return `${day}.${month}.${year}`;
}
app.use(express.static(path.join(__dirname,'public')));
app.use('/videos',express.static(path.join(__dirname,'public/videos')));
app.use('/',videos);



function notFoundHandler(req,res,next){
    const message = "Ó nei, efni finnst ekki";
    const title ="404";
    res.status(404).render('error',{title, message, showBackButton: true});

}

function errorHandler(err,req,res,next){
    console.error(err);
    const title = 'Villa kom upp';
    const message = 'Ekkert fannst';
    res.status(500).render('error',{title,message, showBackButton: false})
}

app.use(errorHandler);
app.use(notFoundHandler);


app.listen(port, host, () => {
  console.info(
    `Server @ http://${host}:${port}/`,
  );
});