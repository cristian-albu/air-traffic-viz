import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Station {
  constructor({ globe, latDeg, longDeg, name }) {
    this.name = name;
    this.loader = new GLTFLoader();

    this.lat = latDeg;
    this.long = longDeg;
    this.coordonates = globe.getCartesian(latDeg, longDeg);

    this.loader.load(
      "/station.glb",
      (gltf) => {
        const { x, y, z } = this.coordonates;
        gltf.scene.position.set(x, y, z);

        // copy so we dont mess with references to the object itself
        gltf.scene.quaternion.copy(globe.getQuarterion(x, y, z));

        gltf.scene.scale.set(0.1, 0.1, 0.1);

        globe.getMesh().add(gltf.scene);

        this.stationMesh = gltf.scene;
      },
      undefined,
      (err) => console.log(err)
    );
  }

  getMesh() {
    return this.stationMesh;
  }
}
