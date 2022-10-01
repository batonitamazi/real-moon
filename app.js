let scene;
let camera;
let renderer;


function main() {
    const canvas = document.querySelector('#c');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    
    
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true,  alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setClearColor(0xfffff, 0.0);


    // create moonGeometry

    const moonGeometry = new THREE.SphereGeometry(0.5, 42, 42);

    const moonMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('texture/moon.jpg'),
        bumpScale: 0.8,
    });

    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    // scene.add(moonMesh);

    // set ambientlight

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientlight);

    // set point light

    const pointerlight = new THREE.PointLight(0xffffff, 0.9);

    // set light position

    pointerlight.position.set(5, 3, 5);
    scene.add(pointerlight);



    // star

    const stargeometry = new THREE.SphereGeometry(80, 64, 64);

    const starmaterial = new THREE.MeshBasicMaterial({

        map: new THREE.TextureLoader().load('texture/galaxy.png'),
        side: THREE.BackSide
    });

    const starmesh = new THREE.Mesh(stargeometry, starmaterial);

    scene.add(starmesh);

    // window.addEventListener('mousemove', function (event) {
    //     camera.position.setFromSphericalCoords(2, Math.PI * - event.clientY / window.innerHeight/4, 0);
    //     camera.lookAt(moonMesh.position);
    // }, false)
    const mouse = {
        x: undefined,
        y: undefined,
    }
    const group  = new THREE.Group()
    group.add(moonMesh)
    scene.add(group);

    // canvas.addEventListener('mousemove', function (event) {
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    //     mouse.y = (event.clientY / window.innerHeight) * 2 - 1        
    // }, false)

    const animate = () => {
        requestAnimationFrame(animate);
        moonMesh.rotation.y -= 0.0015;
        // group.rotation.x = mouse.y
        // group.rotation.y = mouse.x
        

        render();
    }

    const render = () => {
        renderer.render(scene, camera);

    }

    animate();
}

window.onload = main;