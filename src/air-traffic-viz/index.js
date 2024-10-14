import WorldBuilder from "./worldBuilder";

const world = new WorldBuilder();
world.addStations([
  { name: "Station 1", lat: -90, long: 0 },
  { name: "Station 2", lat: 45, long: 45 },
  { name: "Station 3", lat: -30, long: 30 },
]);

const camera = world.getCamera();
const controls = world.getControls();
const renderer = world.getRenderer();
const scene = world.getScene();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
