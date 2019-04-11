
// se obtiene el id del elemento que se desea obtener, mediante
// la función getElementBtId, retorna un string.
const btnEmpezar = document.getElementById('btnEmpezar')
// Los colores
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10

// La clase juego tendrá toda la lógia del juego
class Juego{

    constructor(){
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }
    // Métodos
    inicializar(){
        //cada vez que se utilice elegirJuego, va estar atado al this del juego
        // de este modo this es el juego y no cada uno de los botones dentro de la elegirColor()
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)//esta atado al juego
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
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'celeste'//no se pone break, ya que el break no se podra ejecutar si se tiene un return
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(numero){
        switch(numero){
            case 'celeste':
                return 0//no se pone break, ya que el break no se podra ejecutar si se tiene un return
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia(){
        // se obtiene el color a iluminar
        // dentro de los ciclos for es recomendable utilizar let, en vez de var
        for(let i = 0; i < this.nivel; i++){
            // al declarar la variable color con var, se va a estar pisando el último valor (color de la secuencia )en cada ciclo for.
            // por lo cual se cambia, de var a let, permitiendo que la variable color se mantenga en cada uno de los ciclos for.
            // let color = this.transformarNumeroAColor(this.secuencia[i])
            // Si en el variable ( color) no se tiene una reasignacion de valor, es decir color = ..., 
            // para evitar bugs, lo recomendable es utilizar const
            const color = this.transformarNumeroAColor(this.secuencia[i])
            // console.log(color)
            setTimeout(() => {
                // console.log(color)
                this.iluminarColor(color)
            }, 1000 * i)//de esta manera se ilumina el color despues de un tiempo, ya que en el for los colores se iluminarian inmediatamente
        }
    }
    iluminarColor(color){
        // el color que recibe la función, se procede al boton con su respectivo color
        // se le agrega una clase CSS
        this.colores[color].classList.add('light')//al boton con el color respectivo, se le agrega una clase CSS
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color){
        // se remueve la clase light del respectivo color que recibe esta función
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        // lo que realiza es este metodo es agregar a cada color el evento click, y decirle al navegador
        // que función debe ejecutar una vez que se realice ese evento click, esta función se ejecuta asincronamente
        // Para agregar un manejador de un evento se utiliza addEventListener que recibe el evento y la función que se debe ejecutar
        // var _this = this
        // var self = this//para no perder la referencia de quien es this
        // this.colores.celeste.addEventListener('click', this.elegirColor.bind(self))//para evitar utilizar bind en este método y especificar que elegirJuego
        // este atado a this (de la clase juego) se lo especifica en inicializar()
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }
    // cuando se agregan manejadores de eventos o escuchadores de evento
    // los métodos que se llaman, se llaman con un parametro que es ev
    elegirColor(ev){
        // console.log(ev)
        // JavaScript va a perder el contexto cuando se llame a elegirColor
        // Es muy importante de recordar quien es el this, dentro de cada una de las funciones
        // console.log(this)//this en este caso es el botón al que se esta llamando, this dentro dentro de ese método
        // pero si de desea que this siga siendo un objeto juego, para ello se debe cambiar quien es this, utilizando
        // baind (enlazar), especificando quien es this.

        // console.log(ev)//dentro del evento mouse se tiene un atributo target que tiene el boton que fue tocada, y dento de este se tiene un atributo dataset que tiene el color del boton
        // este atributo data-color se tiene en cada uno de las etiquetas div de cada color

        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        // se compara el numero del color, con la secuencia pero en la posicion del subnivel del que se encuentra
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++//se incrementa
            if(this.subnivel === this.nivel){
                //pasa de nivel
                this.nivel++
                //se eleminan los elementos de click
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    // ganó
                }else{
                    // setTimeout(this.siguienteNivel.bind(this), 2000)//se utiliza una referencia a la función y el tiempo
                    // en este caso this es window, ya que setTimeOut delega en el navegador la ejecución de la función
                    setTimeout(this.siguienteNivel, 1500)//se utiliza bind en inicializar()

                    
                }
            }
        }else{
            // perdió
        }

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
