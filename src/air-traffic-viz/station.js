import * as THREE from "three";

export default class Station {
  constructor({ scene, globe, latDeg, longDeg, name }) {
    this.name = name;
    this.stationGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 10, 5);
    this.stationMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.stationMesh = new THREE.Mesh(this.stationGeo, this.stationMaterial);

    // Get Cartesian coordinates for the station's latitude and longitude on the globe
    const { x, y, z } = globe.getCartesian(latDeg, longDeg);

    this.stationMesh.position.set(x, y, z);

    const normal = new THREE.Vector3(x, y, z).normalize();

    // A quaternion is computed to rotate the station to align its local "up" axis with the normal vector. The more you know.

    // I was thinking of doing some euler angles or whatever they are called. Calculate the angle based on origin and current x, y, z and then set the rotation.
    // Apparently this avoids something called gimbal lock, allow for smooth rotations without problems from 359 to 0 animations
    // Also this is optimized for space and computation
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), // Station's default "up" direction
      normal // Normal vector pointing away from the sphere's center
    );

    // copy so we dont mess with references to the object itself
    this.stationMesh.quaternion.copy(quaternion);

    scene.add(this.stationMesh);
  }

  getMesh() {
    return this.stationMesh;
  }
}
