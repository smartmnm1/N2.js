var http = require('http');
var mysql=require('mysql');
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var urlencodedParser =bodyParser.urlencoded({extended:true});
/*http.createServer(function(req,res)
{
	res.writeHead(200,{'content-type':'text/html'});
	res.write('hello siva');
	res.end();
}).listen(8080);*/




var con=mysql.createConnection(
{
	host:'localhost',
	user:'root',
	password:'',
	database:'student'
});
con.connect(function(err)
{
	if(err)
	throw err;
    console.log("connected");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
 var server =app.listen(8080,function()
 {
	var host =server.address().address
	var port =server.address().port
  console.log("Example app listening at %s:%s Port", host, port)

 });
app.get('/form',function(req,res)
{
	var html='';
	html+="<body style='background-color=black'>";
	html+="<form action='/check' method='post' name ='form' >";
	html+="NAME:</p><input type='text' name ='name'>";
	html+="RegNo:</p><input type='text' name='regno'>";
	html+="mark1:</p><input type='text' name='mark1'>";
	html+="mark2:</p><input type='text' name='mark2'>";
	html+="mark3:</p><input type='text' name='mark3'>";
	html+="mark4:</p><input type='text' name='mark4'>";
	html += "<input type='submit' value='submit'>";
	html+="</form>";
	html+="</body>";
	res.send(html);
});

app.post('/check', urlencodedParser, function (req, res)
{
   var result='';
   result+="student Name is"+req.body.name+"<br>";
   result+="regno is"+req.body.regno+"<br>";
   result+="mark1 is"+req.body.mark1+"<br>";
   result+="mark2 is"+req.body.mark2+"<br>";
   result+="mark3 is"+req.body.mark3+"<br>";
   result+="mark4 is"+req.body.mark4+"<br>";
   
   var n=req.body.name;
   var r=req.body.regno;
   var m1=req.body.mark1;
   var m2=req.body.mark2;
   var m3=req.body.mark3;
   var m4=req.body.mark4;
   var postname=req.body;

   var sql="insert into markdetails (name,regno,mark1,mark2,mark3,mark4) values ('"+n+"','"+r+"','"+m1+"','"+m2+"','"+m3+"','"+m4+"')";
   var sql1="alter table markdetails add column total int";
   con.query(sql,function(err)
   {
   	if(err)
   	throw err
    console.log("row inserted");
   });




   res.send(result);
});

app.get('/avg',function(req,res)
{
	var sw='select name,(mark1+mark2+mark3+mark4)/4 as avg  from markdetails';
	con.query(sw,function(err,result)
		{
			if(err)
			throw err;
		res.end(JSON.stringify(result));
		});

});