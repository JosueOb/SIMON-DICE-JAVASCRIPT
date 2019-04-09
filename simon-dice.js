
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
        this.generarSecuencia()
    }
    // Métodos
    inicializar(){
        // se oculta el boton de empezar
        // classList, agrega a las clasess CSS del btnEmpezar
        // una nueva clase CSS
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            // en el caso de asignar a un atributo el valor que se tiene en una variable
            // con el mismo nombre del atributo, solo basta indicarle el mismo nombre
            celeste: celeste,
            violeta, //es lo mismo que celeste: celestes (referente al boton)
            naranja,
            verde
        }
    }
    generarSecuencia(){
        // se puede crear un atributo nuevo, guardandolo en el objeto Juego
        // se puede generar un array con la palabra reservada new Array, especificando en su constructor
        // cuantos elementos se desea que tengá el array. Después se llama a la función fill, la cual recibe 
        // un valor que llenara a todo el arreglo de dicho valor ingresado. Además, es importante llamar a esta función
        // fill ya que al utilizar la función map en este array, no funcionará debido el array no tiene elementos definidos y con
        // un valor. Para redondear un valor para bajo, se utiliza Math.floor
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
}

function empezarJuego(){
    // alert("El juego va a comenzar")
    // se crea un objeto de la clase juego
    // var juego = new Juego()

    // A modo de prueba, se pone la variable juego dentro de windows para poder debuggear, es decir, observar en consola
    // que es lo que esta pasando y acceder a la secuencia generada.
    window.juego = new Juego()
}
