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

    return { x, y, z };
  }

  getMesh() {
    return this.mesh;
  }
}
