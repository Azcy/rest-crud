var express   = require('express'),
    path      = require('path'),
    bodyParser= require('body-parser'),
    app       = express(),
    expressValidator=require('express-validator');
const Qs = require('qs');
/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection = require('express-myconnection'),
    mysql=require('mysql');



app.get('/',function (req,res) {
    res.send('welcome');
});


//RESTFUL route
var router=express.Router();



router.use(function (req,res,next) {
    console.log(req.method,req.uri);
    next();
});
var curut = router.route('/:table');


curut.get(function (req,res,next) {
    var table=req.params.table;

    console.log(table);
    req.getConnection(function (err,conn) {

        

        var query=conn.query('SELECT * FROM '+[table],function (err,rows) {
            var result = {
                Status: req.query.genus,
                Abnormal: req.query.evt,
                data: rows
            }
            if(err){

                result.Status='faile';

                result.data=err;
              /*  throw err;*/
               /* console.log(err);

                 res.jsonp(result);*/

            }else {
                result.Status='success';
            }


            res.jsonp(result);
            // res.end(rows);
            //res.render('user',{title:"RESTful Crud Example",data:rows});
        });

    });

});

var curut1 = router.route('/:table/:name');

app.use(
    connection(mysql,{
        host    :'localhost',
        user    :'root',
        password:'root',
        database:'node',
        debug   :false
    },'request')
);
//show the CRUD interface | GET
curut1.get(function (req,res,next) {
    var table=req.params.table;
    var name=req.params.name;
    console.log(table,name);
    req.getConnection(function (err,conn) {

        if (err) return next("Cannot connect");

        if(name==null){
            name='*';
        }
        var query=conn.query('SELECT '+[name]+' FROM '+[table],function (err,rows) {
            var result = {
                Status: res.statusCode,
                Abnormal: req.query.evt,
                data: rows
            }
            if(err){
                console.log(err);

                return res.jsonp(result);
            }


             res.jsonp(result);
           // res.end(rows);
            //res.render('user',{title:"RESTful Crud Example",data:rows});
        });

    });

});

//post data to DB | POST
curut1.post(function (req,res,next) {
    //validation
    req.assert('name','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors=req.validationErrors();

    if (errors){
        res.status(422).json(errors);
        return;
    }


    //get data
    var data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    };


    //inserting into mysql
    req.getConnection(function (err,conn) {

        if (err) return("cannot Connect");

        var query=conn.query("INSERT INTO t_user set ? ",data,function (err,rows) {
            if (err){
                console.log(err);
                return next("Mysql error,check your query");
            }

            res.sendStatus(200);
        });

    });

});

//now for single route(GET,DELETE,PUT)
var curut2 = router.route('/user/:user_id');

curut2.all(function (req,res,next) {
    console.log("You need to smth about curut2 Route ? Do it here");
    console.log(req.params);
    next();
});


//get data to update
curut2.get(function (req,res,next) {
    var user_id = req.params.user_id;
    
    req.getConnection(function (err,conn) {
        if (err) return next("Cannot Connect");
        
        var query=conn.query("SELECT * FROM t_user WHERE user_id=?",[user_id],function (err,rows) {
            if (err){
                console.log(err);
                return next("mysql error, check your query");
            }

            //if user not found
            if(rows.length<1)
                return res.send("user Not found");

            res.render('edit',{title:"Edit user",data:rows});
        });
        
    });
});


//update data
curut2.put(function (req,res,next) {
    var user_id=req.params.user_id;

    //validation
    req.assert('name','Name is required').notEmpty();
    req.assert('email','A valid email is required').isEmail();
    req.assert('password','Enter a password 6 - 20').len(6,20);

    var errors=req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    };


    //inserting into mysql
    req.getConnection(function (err,conn) {

        if (err) return next("Cannot Connect");

        var query= conn.query("UPDATE t_user set ? WHERE user_id=?",[data,user_id],function (err,rows) {
            if(err){
                console.log(err);
                return next("Mysql error,check your query");
            }
            res.sendStatus(200);
            
        });

    });

});

//dalete data
curut2.delete(function (req,res,next) {
    var user_id =req.params.user_id;

    req.getConnection(function (err,conn) {
        if (err) return next("Cannot Connect");

        var query=conn.query("DELETE FROM t_user WHERE user_id=?",[user_id],function (err,rows) {
            if(err){
                console.log(err);
                return next("Mysql error,check your query");
            }
            res.sendStatus(200);
        });

    });
    
});

//now we need to apply our router here
app.use('/api',router);


//start Server
var server=app.listen(3000,function () {

    let obj= {
        method: "query_sql_dataset_data",
        projectId: "85",
        appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0",
        datasetId:  {$like: '%Str%'}
    };
    Qs.stringify(obj);
    console.log(Qs.stringify(obj));
    console.log("Listening to port %s",server.address().port);
});