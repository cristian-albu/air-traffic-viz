import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Airplane {
  constructor({ name, globe, start, end }) {
    this.name = name;
    this.loader = new GLTFLoader();
    this.start = start;
    this.end = end;

    this.coordonates = this.start.coordonates;

    this.loader.load(
      "/plane.glb",
      (gltf) => {
        const { x, y, z } = this.coordonates;
        gltf.scene.position.set(x, y, z);

        // copy so we dont mess with references to the object itself
        gltf.scene.quaternion.copy(globe.getQuarterion(x, y, z));

        gltf.scene.scale.set(0.1, 0.1, 0.1);

        const parent = globe.getMesh();
        parent.add(gltf.scene);
        parent.add(this.createArcBetweenStations());

        this.mesh = gltf.scene;
      },
      undefined,
      (err) => console.log(err)
    );
  }

  createArcBetweenStations(arcSegments = 100) {
    const start = this.start.coordonates;
    const end = this.end.coordonates;

    const mid = start.clone().lerp(end, 0.5);
    mid.normalize().multiplyScalar(start.length() * 1.1);

    const startMid = start.clone().lerp(mid, 0.4);
    startMid.normalize().multiplyScalar(start.length() * 1.05);

    const endMid = end.clone().lerp(mid, 0.4);
    endMid.normalize().multiplyScalar(end.length() * 1.05);

    const curve = new THREE.CatmullRomCurve3([start, startMid, mid, endMid, end]);

    const points = curve.getPoints(arcSegments);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });

    const arc = new THREE.Line(geometry, material);

    return arc;
  }
}
