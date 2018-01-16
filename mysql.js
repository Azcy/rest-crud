/*Mysql（CURD）*/
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'node',
});


/*查询*/
var queryData = function (callback) {
    //连接
    connection.connect();

    //查询语句
    var sql = 'SELECT * FROM t_user';

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            callback(err);
            return;
        }

        callback(result);
    });
    connection.end();
}


/*增*/
var insertData = function (callback) {
    connection.connect();

    var addSql = 'INSERT INTO t_user(name,email,password) VALUES (?,?,?)';
    var addSqlParams=['zz','1125545323@qq.com','123'];

    connection.query(addSql,addSqlParams,function (err,result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            callback('[INSERT ERROR] - ',err.message);
            return;
        }

        callback(result);
    });
    connection.end();
}


/*改*/
var updateDate = function (callback) {
    connection.connect();

    var modSql = 'UPDATE t_user SET email=?,password=? WHERE name =?';
    var modSqlParams =['11@qq.com','22','zz'];

    connection.query(modSql,modSqlParams,function (err,result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            callback('[UPDATE ERROR] - ',err.message)
            return;
        }
        callback(result.affectedRows);
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
    connection.end();
}

/*删*/
var deleteDate = function (callback) {
    connection.connect();

    var delSql = 'DELETE FROM t_user where id=6';
    //删
    connection.query(delSql,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }

        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });

}

/*数据查询*/
/*var Data=queryData(function (result) {
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});*/

/*数据插入*/
var Data=insertData(function (result) {
    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);
    console.log('INSERT ID:',result);
    console.log('-----------------------------------------------------------------\n\n');
});
