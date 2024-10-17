import * as THREE from "three";

export default class Globe {
  constructor(scene, radius = 10, widthSegments = 30, heightSegments = 30) {
    this.radius = radius;
    this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    const textureLoader = new THREE.TextureLoader();
    this.material = new THREE.MeshBasicMaterial({ map: textureLoader.load("./2k_earth_daymap.jpg") });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    scene.add(this.mesh);
  }

  // Converts degrees to radians
  getRadiansFromDegrees(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Calculate Cartesian coordinates from latitude and longitude

  // Must also look into THREE.Spherical() class and position.setFromSpherical(). Seems to be more optmized than doing the math.
  // But this teaches me some math so I guess I will leave it.
  getCartesian(latitudeDeg, longitudeDeg) {
    const theta = this.getRadiansFromDegrees(90 - latitudeDeg);
    const phi = this.getRadiansFromDegrees(longitudeDeg);

    const x = this.radius * Math.sin(theta) * Math.cos(phi);
    const y = this.radius * Math.cos(theta);
    const z = this.radius * Math.sin(theta) * Math.sin(phi);

    return new THREE.Vector3(x, y, z);
  }

  getQuarterion(x, y, z) {
    // A quaternion is computed to rotate the station to align its local "up" axis with the normal vector. The more you know.

    // I was thinking of doing some euler angles or whatever they are called. Calculate the angle based on origin and current x, y, z and then set the rotation.
    // Apparently this avoids something called gimbal lock, allow for smooth rotations without problems from 359 to 0 animations
    // Also this is optimized for space and computation
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), // Station's default "up" direction
      new THREE.Vector3(x, y, z).normalize() // Normal vector pointing away from the sphere's center
    );

    return quaternion;
  }

  getMesh() {
    return this.mesh;
  }
}
