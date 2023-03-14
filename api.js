const express = require('express')
const app = express()

const http = require('http')

app.use(express.json())

app.get('/sample' , (req,res) => {
    var pList = {
        people: [{
        'name': 'Josh',
        'age': 15
        }, {
        'name': 'Joe',
        'age': 16
        }],
        
        
        animal: [{
        'type': 'Dog',
        'legs': 4
        }, {
        'type': 'Bird',
        'legs': 2
        }]
    };
    
    [].forEach.call(pList.people, function(p) {
        // can push its value into new array or else
        console.log(`${p.name} -- ${p.age}`);
        })
        //or
    pList.animal.forEach(function(a) {
        console.log(`${a.type} -- ${a.legs}`)
    })

})


app.listen(8000,(err,res) => {
    if(err)
    {
        console.log("ERROR in starting server!")
    } else {
    console.log(`Backend server is running on port 8000!`)}
})