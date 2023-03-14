const express = require('express')
const app = express()
const http = require('http')
const connection = require('./database.js')
require('dotenv').config();
app.use(express.json())

const hostname=process.env.HOSTNAME;
const port=process.env.PORT;

//GET API FOR TOWER SUMMARY
app.get('/getControlTowerSummary',(req,res)=>{
    connection.query("select id,value,status,colour from tower_summary",(err,result)=>{
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
app.post('/createControlTowerRecord' , (req,res) => {
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

app.put('/updateControlTowerRecord/:id', (req,res) => {
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

app.delete('/deleteControlTowerRecord/:id' , (req,res) => {
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
app.post('/createActivityInsights' , (req,res) => {
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

app.put('/updateActivityInsights/:id', (req,res) => {
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

app.delete('/deleteActivityInsights' , (req,res) => {
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



//GET API FOR 2ND COLOUMN

app.get('/getOpenActivity',(req,res)=>{
    connection.query("select * from control_tower.open_Activity;",(err,result)=>{
        if(err)
        {
            res.send('Error');
        }else{
            console.log("able to fetch the data")
            res.send(result);
        }
    });
   
})






//GET API FOR 3RD COLUMN ()

var mysql      = require('mysql');
var async      = require('async');
// var credentials = {}

app.get('/getAllInsights', function (req, res) {
    // var connection = mysql.createConnection(credentials);
    var query1 = "SELECT id,blend_colour FROM control_tower.tower_summary;";
    var query2 = "SELECT SUM(total_downtime) FROM control_tower.production_insights;";
    var query3 = "SELECT (SUM(downtime)/SUM(total_downtime))*100 FROM control_tower.production_insights;";
    var query4 = "select total_downtime FROM control_tower.production_insights ORDER BY total_downtime DESC limit 3;";
    var query5 = "SELECT alarm_type,COUNT(*) FROM control_tower.activity_insights GROUP BY alarm_type;";

    var return_data = {};

    async.parallel([
       function(parallel_done) {
           connection.query(query1, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.BLEND_INSIGHTS = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           connection.query(query2, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.Total_Downtime= results;
               parallel_done();
           });
       },
       function(parallel_done) {
        connection.query(query3, {}, function(err, results) {
            if (err) return parallel_done(err);
            return_data.Plant_OEE = results;
            parallel_done();
        });
    },
    function(parallel_done) {
        connection.query(query4, {}, function(err, results) {
            if (err) return parallel_done(err);
            return_data.Lines_with_highest_downtime = results;
            parallel_done();
        });
    },
    function(parallel_done) {
        connection.query(query5, {}, function(err, results) {
            if (err) return parallel_done(err);
            return_data.ACTIVITY_INSIGHTS = results;
            parallel_done();
        });
    }  
    ],
    function(err) {
         if (err) console.log(err);
         connection.end();
         res.send(return_data);
    });
});





//server
app.listen(port,hostname,(err,res)=>{
    if(err) {
        res.send("Error in starting server")
    } else{
        console.log("Server is up on port 4200")
    }
})

