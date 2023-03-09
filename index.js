const express = require('express')
const app = express()
const connection = require('./database.js')

app.use(express.json())



//GET API FOR TOWER SUMMARY
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



//POST API FOR TOWER SUMMARY
app.post('/getControlTowerSummary' , (req,res) => {
    const id = req.body.id ;
    const value = req.body.value ;
    const status = req.body.status ;
    const colour = req.body.colour ;

    connection.query('INSERT INTO tower_summary VALUES(?,?,?,?)' ,[id,value,status,colour] , (err,result)=> {
        if(err)
        {
            res.send('ERROR')
        } else {
            console.log("POSTED IN TOWER SUMMARY")
            res.send(result)
        }
    })
})


//PUT API FOR TOWER SUMMARY

app.put('/getControlTowerSummary/:id', (req,res) => {
    const data = [req.body.status,req.body.colour,req.params.id]
    connection.query("UPDATE tower_summary SET status = ?, colour = ? WHERE id = ?" , data, (err,result) => {
        if(err)
        {
            res.send('ERROR')
        } else {
            console.log("UPDATED IN TOWER SUMMARY")
            res.send(result)
        }
    })

})


//DELETE API FOR TOWER SUMMARY

app.delete('/getControlTowerSummary/:id' , (req,res) => {
    const data = req.params.id;
    connection.query('DELETE FROM tower_summary WHERE id = ?', data, (err,result)=>{
        if(err)
        {
            res.send('ERROR')
        } else {
            console.log("DELETED FROM TOWER SUMMARY")
            res.send(result)
        }
    })
})



//GET API FOR ACTIVITY INSIGHTS
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



//POST API FOR ACTIVITY INSIGHTS
app.post('/getActivityInsights' , (req,res) => {
    const id = req.body.id ;
    const value = req.body.value ;
    const alarms = req.body.alarms ;
    const warnings = req.body.warnings ;

    connection.query('INSERT INTO activity_insights VALUES(?,?,?,?)' ,[id,value,alarms,warnings] , (err,result)=> {
        if(err)
        {
            res.send('ERROR')
        } else {
            console.log("POSTED IN ACTIVITY INSIGHTS")
            res.send(result)
            res.send("POSTED IN ACTIVITY INSIGHTS")
        }
    })
})


//PUT API FOR ACTIVITY INSIGHTS

app.put('/getActivityInsights/:id', (req,res) => {
    const data = [req.body.status,req.body.colour,req.params.id]
    connection.query("UPDATE activity_insights SET alarms = ?, warnings = ? WHERE id = ?" , data, (err,result) => {
        if(err)
        {
            res.send('ERROR')
        } else {
            console.log("UPDATED IN ACTIVITY INSIGHTS")
            res.send(result)
        }
    })

})



//DELETE API FOR ACTIVITY INSIGHTS

app.delete('/getActivityInsights' , (req,res) => {
    const data = req.body.id;
    connection.query('DELETE FROM activity_insights WHERE id = ?', data, (err,result)=>{
        if(err)
        {
            res.send('ERROR')
        } else {
            console.log("DELETED FROM ACTIVITY INSIGHTS ")
            res.send(result)
        }
    })
})





app.listen(4200,(err,res)=>{
    if(err)
    {
        console.log("ERROR in starting server!")
    } else {
    console.log(`Backend server is running!`)}
})

