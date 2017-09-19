var core = function(window) {
  'use strict';
  var T = window.THREE;
  // Super cool way of calling a constructor with arguments
  var construct = function(constructor, args) {
    var F = function() {
      return constructor.apply(this, args);
    };
    F.prototype = constructor.prototype;
    return new F();
  };
  // Doing meshes manually is for losers
  var build = function(geoType, geoProps, matType, matProps) {
    var geo = construct(T[geoType], geoProps);
    var mat = construct(T[matType], matProps);
    var mesh = new T.Mesh(geo, mat);
    return mesh;
  };
  var options = {
    fov: 70,
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: 1,
    near: 0.1,
    far: 1000
  };
  var setControllerMethod = function(camera, domElement) {
    var controls = new T.OrbitControls(camera, domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(camera.position.x, camera.position.y, camera.position.z);
    return controls;
  };
  var resizeRenderer = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width / height;
    window.camera.aspect = aspect;
    window.camera.updateProjectionMatrix();
    window.renderer.setSize(width, height);
  };
  var setCameraOptions = function() {
    var camera;
    camera = new T.PerspectiveCamera(
      core.options.fov,
      core.options.aspect,
      core.options.near,
      core.options.far
    );
    return camera;
  };
  // Override some options based on context
  options.aspect = options.width / options.height;
  var addGround = function(height) {
    var groundTexture = textureLoader.load('js/grid.png');
    groundTexture.wrapS = groundTexture.wrapT = T.RepeatWrapping;
    groundTexture.repeat.set(512, 512);
    window.ground = core.build(
      'PlaneBufferGeometry', [1000, 1000, 100],
      'MeshLambertMaterial', [{
        color: 0xffffff,
        map: groundTexture
      }]
    );
    if (height == undefined) {
      height = -10;
    }
    ground.position.y = height;
    ground.rotation.x = -Math.PI / 2;
    window.scene.add(ground);
  };
  var init = function() {
    // expose textureLoader globally
    window.textureLoader = new T.TextureLoader();
    window.renderer = new T.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    window.scene = new T.Scene();
    window.camera = setCameraOptions();
    scene.add(camera);
    renderer.setSize(options.width, options.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    document.body.appendChild(renderer.domElement);
    window.controls = setControllerMethod(camera, renderer.domElement);
    camera.position.set(0, 0, 100);
    window._renderer = renderer;
    window.addEventListener('resize', function() {
      resizeRenderer();
    }, false);
  };
  return {
    options: options,
    init: init,
    addGround: addGround,
    construct: construct,
    build: build
  };
}(window);
