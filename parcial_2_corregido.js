// Crear la ESCENA
var scene = new THREE.Scene();


function cubo(x, y, z, color, material, alambre) {

    // CREAR UN CUBO    
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);

    var cubeMaterial
    switch (material) {
        case 'Basic':
            cubeMaterial = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Standard':
            cubeMaterial = new THREE.MeshStandardMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Physical':
            cubeMaterial = new THREE.MeshPhysicalMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Phong':
            cubeMaterial = new THREE.MeshPhongMaterial({
                color: color,
                wireframe: alambre
            });
            break;
        case 'Lambert':
            cubeMaterial = new THREE.MeshLambertMaterial({
                color: color,
                wireframe: alambre
            });
            break;
    }
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);



    //A�adir el cubo a la escena

    scene.add(cube);
    return cube;
}

function init() {


    // Crear la camara

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


    // crear un render y establecer el tama�o

    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));

    renderer.setSize(window.innerWidth, window.innerHeight);



    // Mostrar los ejes    
    var axes = new THREE.AxesHelper(20);

    scene.add(axes);



    cuboA = [];  //Arreglo para almacenar los cubos
    colorA = [0xF30C0C, 0xBEF30C, 0x32a840]; //Para diferenciar los colores
    lado = 3; // valor del lado inicial de los cubos 

    //Se crean los 3 cubos de mismo tama�o en el origen
    for (var i = 0; i < 3; i++) {
        cuboA.push(cubo(lado, lado, lado, colorA[i], 'Physical', false));
    }

    /*Se escalan los cubos, el primero se omite porque es la base y los 
    cubos se modifican del segundo en adelante de mitad en mitad
    cuboA[1].scale.set(lado / 2, lado / 2, lado / 2);
    cuboA[2].scale.set(lado / 4, lado / 4, lado / 4);
    */

    /*Se transladan en los ejes X y Z para que no se ubiquen en el origen*/
    for (var i = 0; i < 3; i++) {
        cuboA[i].translateX(lado / 2);
        cuboA[i].translateY(lado / 2); 
        cuboA[i].translateZ(lado / 2);
    }

    for (var i=0; i < 3; i++){
     if( i==1 || i==2){
       escala = 1/(2*i);
       unidades = (lado/2)+(lado/4)+(((lado/2 + lado/4)/2))*(i-1);
       cuboA[i].scale.set(escala, escala, escala);
       cuboA[i].translateY(unidades);
      }  
    }

    /*Se transladan en el eje Y, en este caso la relaci�n es la 
    mitad a medida que aumenta el n�mero de cubos
    cuboA[0].translateY(lado / 2); //Se translada para que su centro no sea el origen
    cuboA[1].translateY(lado + lado / 4); //Se translada para que quede encima del primer cubo
    cuboA[2].translateY(lado + lado / 2 + lado / 8); //Se translada para que quede encima de los dos cubos
    */
  
    //Luz (requerida para el material MeshLambertMaterial)
    // Luz proveniente de un punto en el espacio, semejante al sol.
    light = new THREE.PointLight(0xFFFF00);

    //  Localizaci�n de la luz. (x, y, z).
    light.position.set(5, 5, 10);
    scene.add(light);


    // POSICION DE LA CAMARA
    //La camara se acomoda para ver la escena lo m�s parecido al ejercicio planteado.
    camera.position.set(3*lado, 3*lado, 3*lado);

    camera.lookAt(scene.position);



    // agregue la salida del renderizador al elemento html
    document.getElementById("webgl-output").appendChild(renderer.domElement);



    // renderizar la escena

    renderer.render(scene, camera);
}