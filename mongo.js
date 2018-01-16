/*
var MongoClient = require('mongodb').MongoClient;

var url="mongodb://localhost:27017/mydb";

MongoClient.connect(url,function (err,db) {
    if (err) throw err;
    console.log("数据库已创建！");
    var dbase=db.db("mydb");
    /!*创建集合*!/
    dbase.createCollection('runoob',function (err,res) {
        if (err) throw err;
        console.log("创建集合！");
        db.close();
    });

});

*/


//创建mongoclient实例
var MongoClient = require('mongodb').MongoClient;

//数据库url
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';

/*插入数据*/
var insertData = function(db, callback) {
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        //返回插入的数据
        callback(result);
    });
}

/*查询数据*/
var selectData=function (db,callback) {
    //连接到表
    var collection = db.collection('site');

    //查询数据
    var whereStr={"name":'菜鸟教程'};

    collection.find(whereStr).toArray(function (err,result) {
        if (err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });
}

/*更新数据*/
var updateDate = function (db,callback) {
    //连接到表
    var collection = db.collection('site');
    //更新数据
    var whereStr = {"name":'菜鸟教程'};
    var updateStr = {$set:{"url":"http://www.baidu.com"}};
    collection.update(whereStr,updateStr,function (err,result) {
        if(err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });
}

/*删除数据库*/
var delData = function (db,callback) {
    //连接到表
    var collection = db.collection('site');

    //删除数据
    var whereStr = {"name":'菜鸟工具'};

    collection.remove(whereStr,function (err,result) {
        if(err){
            console.log('Error' + err);
            return;
        }
        callback(result);
    });

}


MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");

    /*插入数据*/
   /* insertData(db, function(result) {
        console.log(result);
        db.close();
    });*/

   /*查询数据*/
    selectData(db,function (result) {
        console.log(result);
        db.close();
    })

    /*修改数据*/
   /* updateDate(db,function (result) {
        console.log(result);
        db.close();
    })*/

   /*删除数据*/
  /* delData(db,function (result) {
       console.log(result);
       db.close();
   });*/
});


/*mongodb数据库操作
*mongod --dbpath=/data/db/ 设置mongodb存放路径
*
* use runoob 创建runoob
*
* show dbs  显示数据库
*
* show tables 显示表
*
* db.表面.find()查询
*
* */