const express = require ('express');
const router = express.Router(); //mini app in express, you can add middleware and routes to it

router.get('/', (req, res)=> {
    const name= req.cookies.username;
    if (name){
        res.render('index', { name }); 
    }else{
        res.redirect('/hello')
    }
    
}); 

router.get('/hello', (req, res)=> {
    const name= req.cookies.username;
    if (name){
        res.redirect('/')
    }else{
        res.render('hello'); 
    }
    
}); 

router.post('/hello', (req, res)=> {
    res.cookie('username', req.body.username);
    res.redirect('/'); //respuesta al cliente
}); 

router.post('/goodbye', (req, res)=> {
    res.clearCookie('username');
    res.redirect('/hello'); //respuesta al cliente
}); 



module.exports = router;