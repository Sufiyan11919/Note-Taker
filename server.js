// express server
const express = require('express');
const path = require('path');
const PORT = 3001;
// const uuid = require('./helpers/uuid');
// var uniqid = require('uniqid');
const fs = require('fs')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//displays Notes
app.get('/api/notes', (req,res) => {

    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        let notes = [];
        if(err) {
            throw err;
        }
        if(data.length > 2) {
            notes = JSON.parse(data);
            res.send(notes);
        }
    })   
});


// creating new Note
app.post('/api/notes', (req, res) => {

let noteNew = req.body;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        //catches error
        if (err) {
            console.log(`err at the database ${err}`);
        } 
        
        else if (data.length > 2) {
            noteObject = JSON.parse(data);
            noteObject.push(noteNew);
            
            fs.writeFile('./db/db.json', JSON.stringify(noteObject), 'utf8', (err) => {
                //catches error
                if(err) {
                    throw err;
                }
            });
        }
        else {
            noteObject = [];
            noteObject.push(noteNew);
            fs.writeFile('./db/db.json', JSON.stringify(noteObject), 'utf8', (err) => {
                //catches error
                if(err) {
                    throw err;
                }
            });
        }
    });
});

//deleting a Note
app.delete('/api/notes/:id', (req,res) => {
    fs.readFile("./db/db.json",'utf8', (err,data) => {
        //catches error
        if(err) {
            throw err;
        }
        let dataObj=JSON.parse(data);
        for(let i = 0; i < dataObj.length; i++){
            if(req.params.id == dataObj[i].id) {
                dataObj.splice(i,1);
            }
        }
        const output = fs.writeFile('./db/db.json',JSON.stringify(dataObj),(err) => {
            //catches error
            if(err){
                throw err;
        }
    })
    res.send(output);
})
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});







app.listen(PORT, () => {
    console.log(`Server available at http://localhost:${PORT}`);
  });