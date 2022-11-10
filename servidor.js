
var express = require('express');
var app = express();

//Servidor
const hostname = '74.208.159.121';
const port = 443;
//Local
//const hostname = 'localhost';
//const port = 5001;


//seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas
app.set('view engine','ejs');

app.get('/', function(req, res){
  res.render('index');
});

//rutas

app.get('/contact',(req, res)=>{
  res.render('contact');
})
app.get('/shop',(req, res)=>{
  res.render('shop');
})

app.get('/login',(req, res)=>{
  res.render('login');
})
app.get('/register',(req, res)=>{
  res.render('register');
})


app.get('/cart',(req, res)=>{
	res.render('cart');
  })
  





app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });






  //Código feo para limpiar



  //2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//3- Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});



//6 -Invocamos a bcrypt
const bcrypt = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// 8 - Invocamos a la conexion de la DB
const connection = require('./database/db');




//10 - Método para la REGISTRACIÓN
app.post('/register', async (req, res)=>{

	const user = req.body.user;
	const name = req.body.name;
    //const rol = req.body.permiso;
	const pass = req.body.pass;
	let apellido1 = "NULL";
	let apellido2 = "NULL";
	const permiso = req.body.permiso;
	let passwordHash = await bcrypt.hash(pass, 8);
	let contadorNu = 0;
	let contadorMa = 0;
	let contadorMi = 0;
	let contadorCa = 0;
	let contadorContra = 0;
	var numeros="0123456789";
	var mayuscula="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
	var minuscula="abcdefghyjklmnñopqrstuvwxyz";
	var caracter="!#$%&/()=?¡*:;.,{}[]+¿'|°-_<>~¬";

	console.log(pass);
	contadorContra = pass.length;
	console.log(contadorContra);
	for(i=0; i<pass.length; i++){
		if (numeros.indexOf(pass.charAt(i),0)!=-1){
		   contadorNu ++;
		}
		if (mayuscula.indexOf(pass.charAt(i),0)!=-1){
			contadorMa ++;
		 }
		 if (minuscula.indexOf(pass.charAt(i),0)!=-1){
			contadorMi ++;
		 }
		 if (caracter.indexOf(pass.charAt(i),0)!=-1){
			contadorCa ++;
		 }
	 }
console.log(contadorNu);
console.log(contadorMa);
console.log(contadorMi);
console.log(contadorCa);




connection.query('SELECT * FROM usuario_rdrenta WHERE Pwd = ?', [pass], async (error, results, fields)=> {
	console.log(results);
	if( results.length == 0  ) {    
////////////////////////////////////////////////////////////////////////////////////////////

if(contadorContra > 7 & contadorNu >0 & contadorMa>0 & contadorCa>0){
	
	connection.query('SELECT * FROM usuario_rdrenta WHERE Usu = ?', [user], async (error, results, fields)=> {

		if( results.length == 0  ) {    
	/////////////////////////////////////////////////////////////////////////
			
	connection.query('INSERT INTO usuario_rdrenta SET ?',{Usu:user, Pwd:pass, Nombre:name, Apellido_p:apellido1,Apellido_m:apellido2, Tipo_permiso:permiso }, async (error, results)=>{
        if(error){
            console.log(error);
        }else{            
			res.render('register', {
				alert: true,
				alertTitle: "Registro",
				alertMessage: "¡Registro exitoso!",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: ''
			});
            //res.redirect('/');         
        }
	});

	////////////////////////////////////////////////////////////////////////			
		} else {         
			//creamos una var de session y le asignamos true si INICIO SESSION       

			res.render('register', {
				alert: true,
				alertTitle: "¡EL USUARIO YA EXISTE!",
				alertMessage: "Asegúrate de registrarte con un usuario nuevo.",
				alertIcon:'error',
				showConfirmButton: true,
				timer: false,
				ruta: ''    
			});      			
		}			
	});
	console.log('YA CASI');
}else {
	res.render('register', {
		alert: true,
		alertTitle: "¡CONTRASEÑA NO SEGURA!",
		alertMessage: "Asegúrate de poner mayúsculas, minúsculas, números, caracteres y 8 dígitos como mínimo.",
		alertIcon:'error',
		showConfirmButton: true,
		timer: false,
		ruta: 'register'    
	});

}//ELSE CONTRASEÑA NO SEGURA -----FIN DE LA VALIDACIÓN DE CONTRASEÑA

////////////////////////////////////////////////////////////////////////////////////////////
		
	} else {         
		    

		res.render('register', {
			alert: true,
			alertTitle: "¡CONTRASEÑA OBVIA!",
			alertMessage: "Asegúrate de utilizar una contraseña que no este registrada en una base de datos.",
			alertIcon:'error',
			showConfirmButton: true,
			timer: false,
			ruta: 'register'    
		});      			
	}			

});


})




//11 - Metodo para la autenticacion
app.post('/auth', async (req, res)=> {
console.log("pruebita");
	const user = req.body.user;
	const pass = req.body.pass;    
    let passwordHash = await bcrypt.hash(pass, 8);
	console.log(pass);
	console.log(passwordHash);
	if (user && pass) {

		connection.query('SELECT * FROM usuario_rdrenta WHERE Usu = ?', [user], async (error, results, fields)=> {
			if( results.length == 0 || !(pass) ) {    
				res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "USUARIO y/o PASSWORD incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'   
                    });
				
				//Mensaje simple y poco vistoso
                //res.send('Incorrect Username and/or Password!');				
			} else {         
				//creamos una var de session y le asignamos true si INICIO SESSION       
				req.session.loggedin = true;                
				req.session.name = results[0].name;
				res.render('login', {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: 'cart'
				});        			
			}			
			res.end();
		});
	} else {	
		res.send('Please enter user and Password!');
		res.end();
	}
});

//12 - Método para controlar que está auth en todas las páginas
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
		res.render('header',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('header',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});


//función para limpiar la caché luego del logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

 //Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});
