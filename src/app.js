const http = require('http');
const getUsers = require('./modules/users')

const server = http.createServer( (request, response )=>{
    const url = new URL(request.url, 'http://127.0.0.1');
    
    if(request.url === '/'){

        response.status = 200;
        response.statusMessage = 'OK';
        response.header = 'Content-type: text/plain';
        response.write('Hello, world!');

        console.log(url);
       
        response.end();
        
        return;
    }
    
    if(request.url === 'users'){
        response.status = 200;
        response.statusMessage = 'OK';
        response.header = 'Content-type: text/plain';
        response.write(getUsers());

        console.log(url);
       
        response.end();
        
        return;
    }


    if(`${request.url}?hello`){
        response.status = 200;
        response.statusMessage = 'OK';
        response.header = 'Content-type: text/plain';
        
        response.write('Hello, ' + url.searchParams.get('hello'));
        response.end();
    
    
        if(url.searchParams.get('hello') === null){
            response.status = 400;
            response.statusMessage = 'OK';
            response.header = 'Content-type: text/plain';
            response.write('Enter a name');
            response.end();
            return;
        }
    }


    
    if( request.url !== 'users' || !(`${request.url}?hello`)){
        response.status = 500;
        response.statusMessage = 'OK';
        response.header = 'Content-type: text/plain';
        response.write('');

        console.log(url);
       
        response.end();
        
        return;
    }

       
 
});

server.listen(3003,()=>{
    console.log('Сервер запущен по адрессу http://127.0.0.1:3003');
})