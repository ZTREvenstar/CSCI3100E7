const express = require('express')
const mysql = require('mysql')
//const handleDisconnection() = require('./mysqlconnection')


const SERVER_IP = '54.227.0.209'
let db = mysql.createConnection({
    host: SERVER_IP,
    port: '3306',
    user: 'root',
    password: 'Alan',
    database: 'OURDATA',
    insecureAuth : true
})

function handleDisconnect() {
    db = mysql.createConnection({
        host: SERVER_IP,
        port: '3306',
        user: 'root',
        password: 'Alan',
        database: 'OURDATA',
        insecureAuth : true
    })
    db.on('error', function(err) {
        if (!err.fatal) {
            return;
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        }else{
            console.log('mysql error: ' + err.code);
            throw err;
        }
    });
    db.connect(function(err) {
        if (err){
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect , 2000);
        }
        else{
            console.log('mysql connected');
        }
        
    });
}
handleDisconnect();//keep database connected once the connection is closed becasue of time out

//sqlQuery function which can be used in other routers
function sqlQuery(strSql, arr) {
    return new Promise(function (resolve, reject) {
        db.query(strSql, arr, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results)
            }
        })
        //db.release()
    })
}

module.exports = sqlQuery