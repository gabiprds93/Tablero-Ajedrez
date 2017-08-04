function printMatrix (M){
    console.log ("___________________");
    for (var i = 0; i < M.length; i++)
        console.log (M[i]);   
    console.log ("___________________");
}

function check (i, j, n) {
   if (  i >= 0 && j >= 0 && i < n && j < n)
       return true;
   return false;   
}

function gen_heuristic (n){  
  var M = initMatrix (n);
  var p = 1;
  while (p <= n / 2 + 1 ) {
    for (var i = p-1; i <= n - p; i++){
      M[p - 1][i] = p;
      M[i][p - 1] = p;
      M[i][n - p] = p;
      M[n - p][i] = p;
    }
    p++;    
  }
  M[0][0] = 0;
  M[0][n - 1] = 0;
  M[n - 1][0] = 0;
  M[n - 1][n - 1] = 0;
  return M;
}

function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
}

function use_helper (soluciones, helper) {
   var pos = -1;
   var min = 10000;
   soluciones = shuffleArray (soluciones);
   for (var i = 0; i < soluciones.length; i++) {
      var x = soluciones[i].x;
      var y = soluciones[i].y;      
      if ( helper[x][y] < min) {
         min = helper[x][y] ;
         pos = i;
      }
   }
   return pos;
}

function gen_solution (M, helper, n) {
    var mov_x = [-2, -1, +1, +2, +2, +1, -1, -2];
    var mov_y = [-1, -2, -2, -1, +1, +2, +2, +1];    
    var step = 1;
    var x = 0; var y = 0;
    
    M[x][y] = step;
    while ( true ) {
        if ( step == n * n) {
            console.log ('eureka!!!');
            return true;
        }
        var soluciones = [];
        for (var index = 0; index < mov_x.length; index++) {
            var i = x + mov_x[index];
            var j = y + mov_y[index];   
            if (check (i, j, n) && M [i][j] == 0) {
               soluciones.push ( {x:i, y:j});
            }
        }
        if (soluciones.length == 0) {
           console.log ("fail!!");
           break;
        }
        var idx = use_helper (soluciones, helper) ;
        x =  soluciones[ idx ].x;
        y =  soluciones[ idx ].y;
        step++;
        M[x][y] = step;
       //console.log ("step: " + step);
       
    }
    return false;
} 

function initMatrix (n) {
    var matrix = [];
    for (var i = 0; i < n; i++) {
        var fila = [];
        for (var j = 0; j < n; j++) {
            fila[j] = 0;
        }
        matrix[i] = fila;
    }
    return matrix;
}

function crearCeldas(inputLados)
{
    while(tablero.childNodes.length >= 1)
    {
        tablero.removeChild(tablero.firstChild);
    }
    tablero.border = "1";
    for(var i = 0; i < inputLados; i++)
    {
        var fila = document.createElement('tr');
        for(var j = 0; j < inputLados; j++)
        {
            var columna = document.createElement('td');
            if(i % 2 == 0)
            {
                if(j % 2 == 1)
                {
                    columna.setAttribute("class", "pintado");
                }
            }
            else
            {
                if(j % 2 == 0)
                {
                    columna.setAttribute("class", "pintado");
                }
            }
            fila.appendChild(columna);
        }
        tablero.appendChild(fila);
    }
}

var tablero = document.getElementById("tablero");
var btnAgregar = document.getElementById("btnAgregar");
var btnSolucion = document.getElementById("btnSolucion");
var btnSiguiente = document.getElementById("btnSiguiente");
var inputLados = document.getElementById("inputLados");
inputLados.focus();
var M = undefined;
var num = 1;

btnAgregar.onclick = function()
{
    var inputLados = parseInt(document.getElementById("inputLados").value);
    if(isNaN(inputLados))
    {
        alert("No ingreso numero")
    }
    else
    {
        crearCeldas(inputLados);        
    }  
}

btnSolucion.onclick = function()
{
    var inputLados = parseInt(document.getElementById("inputLados").value);
    crearCeldas(inputLados);
    var celdas = document.getElementsByTagName("td");
    var cont = 0;
    if(celdas.length == 0)
    {
        alert("No ingreso numero")
    }
    else
    {
        for( var i = 0; i < 1000; i++)
        {
            M = initMatrix(inputLados);
            var helper = gen_heuristic(inputLados);
            if (gen_solution(M, helper, inputLados))
            {
                printMatrix(M);
                break;
            }
        }
        for(var i = 0; i < inputLados; i++)
        {
            for(var j = 0; j < inputLados; j++)
            {
                var texto = document.createTextNode(M[i][j]);
                celdas[cont].appendChild(texto);
                cont++;
            } 
        }
    }
}

btnSiguiente.onclick = function()
{
    var inputLados = parseInt(document.getElementById("inputLados").value);
    var celdas = document.getElementsByTagName("td");
    var cont = 0;
    var bandera = false;
    if(num == 1)
    {
        crearCeldas(inputLados);
    }
    if(M == undefined)
    {
        alert("No apreto el boton recorrido caballo y/o no ingreso numero");
    }
    else if(celdas.length == 0)
    {
        alert("No ingreso numero")
    }
    else if(num == celdas.length + 1)
    {
        alert("Solucion completa")
        num = 1;
    }
    else
    {
        for(var i = 0; i < inputLados; i++)
        {
            for(var j = 0; j < inputLados; j++)
            {
                if(M[i][j] == num)
                {
                    var texto = document.createTextNode(M[i][j]);
                    celdas[cont].appendChild(texto);
                    num++;
                    bandera = true;
                    break;
                }
                cont++;
            } 
            if(bandera)
                break;
        }
    }
}