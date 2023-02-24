import {setupGround, updateGround} from "./ground.js";
import {setupAstro, updateAstro} from "./astronaut.js";
import {setupRock, updateRock} from "./rock.js";
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const scoreElem=document.querySelector("[data-score]");
const startScreenElem=document.querySelector("[data-start-screen]");
const worldElem = document.querySelector("[data-world]");

setPixelWorldScale();
window.addEventListener("resize", setPixelWorldScale);
document.addEventListener("keydown", handleStart,{once: true});



let lastTime;
let speedScale;
let score;
function update(time){
    if(lastTime == null){
        lastTime = time;
        window.requestAnimationFrame(update);
        return
    }
    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updateAstro(delta, speedScale);
    updateRock(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    

    lastTime = time;
    window.requestAnimationFrame(update);
}

function handleStart(){
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupAstro();
    setupRock();
    startScreenElem.classList.add("hide");
    window.requestAnimationFrame(update);
}

function updateScore(delta) {
  score += delta * .01; //for every 10s, score increases by 10
  scoreElem.textContent = Math.floor(score);
}

function updateSpeedScale(delta) {
  speedScale += delta * 0.0001;
}

function setPixelWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
