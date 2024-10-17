import WorldBuilder from "./worldBuilder";

const world = new WorldBuilder();
world.addStations([
  { name: "Station 1", lat: -90, long: 0 },
  { name: "Station 2", lat: 45, long: 45 },
  { name: "Station 3", lat: -30, long: 30 },
]);

world.addAirplanes([{ name: "Airplane 1", start: "Station 1", end: "Station 2" }]);

const camera = world.getCamera();
const controls = world.getControls();
const renderer = world.getRenderer();
const scene = world.getScene();
const globe = world.getMesh();

world.airplanes[0].createArcBetweenStations();

function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y -= 0.001;
  controls.update();
  renderer.render(scene, camera);
}

animate();
