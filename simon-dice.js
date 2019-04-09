
// se obtiene el id del elemento que se desea obtener, mediante
// la función getElementBtId, retorna un string.
const btnEmpezar = document.getElementById('btnEmpezar')
// Los colores
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

// La clase juego tendrá toda la lógia del juego
class Juego{

    constructor(){
        this.inicializar()
    }
    // Métodos
    inicializar(){
        // se oculta el boton de empezar
        // classList, agrega a las clasess CSS del btnEmpezar
        // una nueva clase CSS
        btnEmpezar.classList.add('hide')
    }
}

function empezarJuego(){
    // alert("El juego va a comenzar")
    // se crea un objeto de la clase juego
    var juego = new Juego()
}
