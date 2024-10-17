import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Globe from "./globe";
import Station from "./station";
import Airplane from "./airplane";

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

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
    this.directionalLight.position.set(0, 1, 1); // Position the light

    this.scene.add(this.directionalLight);
    this.globe = new Globe(this.scene, this.worldRadius);
    this.globe.getMesh().rotation.z = 0.09;
    this.handleResize();

    this.stations = [];
    this.airplanes = [];
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
      const station = new Station({ globe: this.globe, latDeg: lat, longDeg: long, name });
      this.stations.push(station);
    }
  }

  addAirplanes(airplanesData) {
    for (const { start, end, name } of airplanesData) {
      const startingStation = this.stations.find((station) => station.name === start);
      const endingStation = this.stations.find((station) => station.name === end);

      const airplane = new Airplane({ globe: this.globe, start: startingStation, end: endingStation, name });
      this.airplanes.push(airplane);
    }
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

  getMesh() {
    return this.globe.getMesh();
  }
}
