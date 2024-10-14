import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Globe from "./globe";
import Station from "./station";

export default class WorldBuilder {
  constructor() {
    this.worldRadius = 10;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.ambientLight = new THREE.AmbientLight(0x404040);

    this.scene.add(this.ambientLight);
    this.globe = new Globe(this.scene, this.worldRadius);
    this.handleResize();

    this.stations = [];

    this.generateRandomStations();
  }

  handleResize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  addStations(stationsData) {
    for (const { lat, long, name } of stationsData) {
      const station = new Station({ scene: this.scene, globe: this.globe, latDeg: lat, longDeg: long, name });
      this.stations.push(station);
    }
  }

  generateRandomStations() {
    const textureLoader = new THREE.TextureLoader();
    const specularMap = textureLoader.load("./2k_earth_specular_map.tif");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // canvas.width = specularMap.image.width;
    // canvas.height = specularMap.image.height;
    // context.drawImage(image.image, 0, 0);

    // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // console.log(imageData);
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  getControls() {
    return this.controls;
  }

  getRenderer() {
    return this.renderer;
  }
}
