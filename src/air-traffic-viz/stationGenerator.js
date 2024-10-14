import * as THREE from "three";

export default class StationGenerator {
    constructor() {
        const textureLoader = new THREE.TextureLoader()
        const specularMap = textureLoader.load('path/to/your/specular_map.jpg');
    }
}