var http = require('http');
var restify = require('restify');
var kvservice = require('./kvservice');
var port = 3000;
var server = restify.createServer();
server.use(restify.queryParser());
server.get('/createkey/:keyname', function(req, res, next)  { 
    kvservice.createkey(req.params.keyname, function(result)  { 
        res.send(`key created successfully: $ { result.key.kid}`);
     } );
    next();
 } )
server.del('/deletekey/:keyname', function(req, res, next)  { 
    kvservice.deletekey(req.params.keyname, function(result)  { 
        res.send('key deleted successfully');
     } );
    next();
 } )
server.get('/getallkeys/:maxnumber', function(req, res, next)  { 
    kvservice.getallkeys(req.params.maxnumber, function(result)  { 
        res.send(result);
     } );
    next();
 } )
server.get('/encrypt/', function(req, res, next)  { 
    var keyId = kvservice.kid;
    kvservice.encrypt(keyId, "Some text to encrypt", function(result)  { 
        res.send(result.value);
     } );
    next();
 } )
server.get('/decrypt/', function(req, res, next)  { 
    var keyId = kvservice.kid;
    var cipher = '<The cipher data you need to decrypt>';
    kvservice.decrypt(keyId, cipher, function(result)  { 
        res.send(result.value.toString());
     } );
    next();
 } )
server.get('/createsecret/:secretname/:secretvalue', function(req, res, next)  { 
    kvservice.createSecret(req.params.secretname, req.params.secretvalue, function(result)  { 
        res.send(result.id);
     } );
    next();
 } )
server.get('/getallsecrets/:maxresults/', function(req, res, next)  { 
    kvservice.getAllSecrets(req.params.maxresults, function(result)  { 
        res.send(result);
     } );
    next();
 } )
server.get('/getsecret/:secretId', function(req, res, next)  { 
    kvservice.getSecret(req.params.secretId, function(result)  { 
        res.send(result);
     } );
    next();
 } )
server.listen(port, function()  { 
    console.log(`$ { server.name }  listening at $ { server.url}`);
 } );
