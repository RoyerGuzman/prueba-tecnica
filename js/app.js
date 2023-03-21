


let buttonInputX = document.querySelector('#buttonInputX');
let resultadox = document.querySelector('#resultadox');

buttonInputX.addEventListener('click', function(e){
    e.preventDefault();
    let inputx = document.querySelector('#inputx').value;
    ConstruyeX.validaLongitud(inputx);

});


class ConstruyeX {    
    static validaLongitud (inputx) {
        if(inputx <= 0){
            this.numeroNoValido();
        } else {
            if(ConstruyeX.validaNon(inputx)){
                // construye con x
                ConstruyeX.construyeConX(inputx,true);
            } else {
                // construye sin x
                ConstruyeX.construyeSinX(inputx,false);

            };
            // console.log('numero  valido');
        }
    }
    static numeroNoValido() {
        console.log('numero no valido');
    }

    static validaNon(inputx) {
        return inputx % 2 == 1?true:false;    
    }

    static construyeConX(inputx){

        let centro = (inputx-1)/2;
        let izquierdo = `\\`;
        let derecho = `/`;        
        
        let cadena = '';

        let cadenaTemp = '';

        for (let i = 0; i < inputx; i++) {

            if(i < centro){
                for (let r = 0; r < inputx; r++) {
                    if(r < centro){
                        cadenaTemp += izquierdo
                    }else if(r == centro){                        
                        cadenaTemp += ' ';
                    } else {
                        
                        cadenaTemp += derecho
                    }
                }
                
            }else if(i == centro){
                for (let r = 0; r < inputx; r++) {
                    if(r < centro){
                        cadenaTemp += '-'
                    }else if(r == centro){                    
                        cadenaTemp += 'x';
                    } else {                        
                        cadenaTemp += '-'
                    }
                    
                }
                
            } else {
                
                for (let r = 0; r < inputx; r++) {
                    if(r < centro){
                        cadenaTemp += derecho
                    }else if(r == centro){                        
                        cadenaTemp += ' ';
                    } else {
                        cadenaTemp += izquierdo                        
                    }                    
                }
            }

            // limpieza string
            cadenaTemp = ConstruyeX.limpiarString(cadenaTemp,i);
            cadena += cadenaTemp;
            cadena += '\n';          
            cadenaTemp = ''
        }

        console.log(cadena);


        // let inputx = inputx;
             
    }
    static construyeSinX(inputx){
        let centro = inputx/2;
        let izquierdo = `\\`;
        let derecho = `/`;   

        let cadena = '';

        let cadenaTemp = '';

        for (let i = 0; i < inputx; i++) {

            if(i < centro){
                for (let r = 0; r < inputx; r++) {
                    if(r < centro){
                        cadenaTemp += izquierdo
                    } else {                        
                        cadenaTemp += derecho
                    }
                }                
            } else {
                
                for (let r = 0; r < inputx; r++) {
                    if(r < centro){
                        cadenaTemp += derecho
                    } else {
                        cadenaTemp += izquierdo                        
                    }                   
                }
            }

            // limpieza string
        

            cadenaTemp = ConstruyeX.limpiarString(cadenaTemp,i);
            cadena += cadenaTemp;
            cadena += '\n';          

            cadenaTemp = ''
            
        }

        console.log(cadena);
    }


    static limpiarString(string, valorActual){
        
            let activoIzq = valorActual;
            let activoDer = string.length - valorActual - 1;                        
            let stringInArray = string.split('');
            
            for (let i = 0; i < stringInArray.length; i++) {
                if(i != activoIzq && i!= activoDer){                    
                    stringInArray[i] = ' ';
                }                
            }
                
            stringInArray = stringInArray.toString();
            let nuevaCadena = '';            

            for (let i = 0; i < stringInArray.length; i++) {
                if(stringInArray[i] !== ','){
                        nuevaCadena += stringInArray[i];
                    }                
                }                                           
            return(nuevaCadena);              
    }

}



// ejercicio 4

let datosTabla = document.querySelector('#datosTabla');


let objetoPeticion = [
    {
        'receptor': 'Mario López',
        'fecha': '10/10/2022',
        'importe_subtotal': '$ 7,205.40',
        'numero_factura':'1'
    },
    {
        'receptor': 'Luiz Guitierrez',
        'fecha': '11/10/2022',
        'importe_subtotal': '$ 4,000.00',
        'numero_factura':'2'
    },
    {
        'receptor': 'Fernanda Campos',
        'fecha': '12/10/2022',
        'importe_subtotal': '$ 7,135.40',
        'numero_factura':'3'
    },
    {
        'receptor': 'Renata Gómez',
        'fecha': '13/10/2022',
        'importe_subtotal': '$ 2,800.40',
        'numero_factura':'4'
    },
]
// guardamos como string para la simulacion
objetoPeticion = JSON.stringify(objetoPeticion);


class Factura {
    static peticionHttp(parametro){        
        // fetch(`https://pruebas.zendha.net?${parametro}`)
        // .then().catch(            
        // );
        return objetoPeticion;
    };

    static  ivaDevuelto(){
        let datos = JSON.parse(Factura.peticionHttp());
        // console.log(datos);

        for (const cliente in datos) {
            if (datos.hasOwnProperty.call(datos, cliente)) {
                let importe = datos[cliente].importe_subtotal;
                importe = parseFloat(importe.replace('$','').replace(' ','').replace(',',''),10);                                
                let importeTotal = importe * 1.16;
                let iva = importeTotal - importe

                
                datos[cliente].iva = `$ ${iva.toFixed(2)}`;
                datos[cliente].importeTotal = `$ ${importeTotal}`;

                // console.log(datos);   

            }
        }

        Factura.agregarATabla(datos);
    }

    static agregarATabla(datos){
        // let datosConsulta = JSON.parse(datos);
        console.log(datos);
        let datosTabla = '';

        for (const cliente in datos) {
            if (datos.hasOwnProperty.call(datos, cliente)) {
                datosTabla += '<div class="cliente">';
                datosTabla += `<div>${cliente.receptor}</div>`;
                datosTabla += `<div>${cliente.fecha}</div>`;
                datosTabla += `<div>${cliente.numero_factura}</div>`;
                datosTabla += `<div>${cliente.importe_subtotal}</div>`;
                datosTabla += `<div>${cliente.iva}</div>`;
                datosTabla += `<div>${cliente.importeTotal}</div>`;
                datosTabla += '</div>';
            }
        }

        // objetoPeticion.innerHTML= datosTabla;

    }

}




console.log(Factura.ivaDevuelto());