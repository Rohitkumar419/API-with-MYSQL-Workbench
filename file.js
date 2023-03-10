//Working with File System

const fs = require('fs')
const path = require('path')

const dirPath= path.join(__dirname,'CRUD')
const filePath = `${dirPath}/file.txt`


//Write file
fs.writeFileSync(filePath,'This is a simple file')


//Read file
fs.readFile(filePath,'utf8',(err,data)=>{
    console.log(data);
    })



    
//Add file
fs.appendFile(filePath,' for demo assignment.',(err)=>{
if(!err) console.log("file is updated")
})
    


// Rename file
fs.rename(filePath, `${dirPath}/demo.txt`,(err)=>{
    if(!err) console.log("file name is updated")
    })



//Delete file
fs.unlinkSync(`${dirPath}/demo.txt`);