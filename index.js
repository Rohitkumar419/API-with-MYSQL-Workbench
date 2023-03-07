const express = require('express')
const app = express()
const connection = require('./database.js')


app.get('/getControlTowerSummary',(req,res)=>{
    connection.query("select * from tower_summary",(err,result)=>{
        if(err)
        {
            res.send('Error');
        }else{
            console.log("able to fetch the data")
            res.send(result);
        }
    });
   
})


app.get('/getActivityInsights',(req,res)=>{
    connection.query("select * from activity_insights",(err,result)=>{
        if(err)
        {
            res.send('Error');
        }else{
            console.log("able to fetch the data")
            res.send(result);
        }
    });
   
})




app.listen(4200,()=>{
    console.log(`Backend server is running!`)
})

