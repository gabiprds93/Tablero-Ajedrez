function Tablero()
{
    this.inputLados = document.getElementById("inputLados");
    this.tablero = document.getElementById("tablero");
    this.agregar = function()
    {
        
        while(this.tablero.childNodes.length >= 1)
        {
            this.tablero.removeChild(this.tablero.firstChild);
        }
        
        this.tablero.border = "1";
        for(var i = 0; i < parseInt(this.inputLados.value); i++)
        {
            var fila = document.createElement('tr');
            this.tablero.appendChild(fila);
            for(var j = 0; j < parseInt(this.inputLados.value); j++)
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
        }
    }
}
var tabla = new Tablero();
var btnAgregar = document.getElementById("btnAgregar");
btnAgregar.onclick = function()
{
    tabla.agregar();
};