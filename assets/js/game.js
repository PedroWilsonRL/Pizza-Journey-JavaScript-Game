import { GAME_WIDTH, GAME_HEIGHT, TILE_SIZE } from './config.js';
import { drawMap, drawMapUpper, drawBlockedTiles, drawTeleportTiles, checkTeleportTile, setCurrentMap, currentMap } from './map.js';
import { player, updatePlayer, drawPlayer } from './player.js';
import { npc, updateNPC, drawNPC, handleDialog, drawDialogBox } from './npc.js';
import { showMainMenu } from './mainmenu.js';
import { toggleMenu, isMenuOpen, updateMenuInput, drawMenu } from './menu.js';

const canvas = document.getElementById('canvas1');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const dialogBoxImage = new Image();
dialogBoxImage.src = 'assets/characters/dialogbox.png';

const keysPressed = {};
let zPressed = false;
let zHandled = false;

window.addEventListener('keydown', (e) => {
  keysPressed[e.key] = true;

  if (e.key === 'Enter') {
    toggleMenu();
  }

  if (e.key === 'z') {
    if (!zPressed) {
      zPressed = true;
      zHandled = false;
    }
  }
});

window.addEventListener('keyup', (e) => {
  keysPressed[e.key] = false;

  if (e.key === 'z') {
    zPressed = false;
    zHandled = false;
  }
});

let canTeleport = true;
let flashAlpha = 0;
let flashState = 'idle';
let lastMap = currentMap;
let pendingTeleportData = null;

const ZOOM = 1.4;
const MAP_WIDTH = 40 * TILE_SIZE;
const MAP_HEIGHT = 25 * TILE_SIZE;

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.save();

  let zoom = currentMap === 2 || currentMap === 3 ? 1.8 : 1.4;

  let camX = player.x + TILE_SIZE / 2;
  let camY = player.y + TILE_SIZE / 2;

  const halfWidth = (GAME_WIDTH / zoom) / 2;
  const halfHeight = (GAME_HEIGHT / zoom) / 2;

  if (camX < halfWidth) camX = halfWidth;
  if (camX > MAP_WIDTH - halfWidth) camX = MAP_WIDTH - halfWidth;
  if (camY < halfHeight) camY = halfHeight;
  if (camY > MAP_HEIGHT - halfHeight) camY = MAP_HEIGHT - halfHeight;

  ctx.scale(zoom, zoom);
  ctx.translate(-camX + halfWidth, -camY + halfHeight);

  drawMap(ctx);
  drawBlockedTiles(ctx);
  drawTeleportTiles(ctx);

  if (flashState === 'idle' && !isMenuOpen()) {
    updatePlayer(keysPressed);

    if (currentMap === 1) {
      updateNPC();
      const dialogHandled = handleDialog(zPressed, zHandled, player.x, player.y, player.width, player.height);
      if (dialogHandled) zHandled = true;
    }

    const teleportData = checkTeleportTile(player.x, player.y);
    if (teleportData.teleport && canTeleport) {
      canTeleport = false;
      lastMap = currentMap;
      pendingTeleportData = teleportData;
      flashAlpha = 0.08;
      flashState = 'fadeIn';
    }
  }

  if (flashState === 'fadeIn') {
    flashAlpha += 0.08;
    if (flashAlpha >= 1) {
      flashAlpha = 1;
      flashState = 'teleport';
    }
  } else if (flashState === 'teleport') {
    if (pendingTeleportData.targetMap === 1) {
      setCurrentMap(1);
      player.x = 19 * TILE_SIZE;
      player.y = 11 * TILE_SIZE;
    } else if (pendingTeleportData.targetMap === 2) {
      setCurrentMap(2);
      player.x = lastMap === 3 ? 31 * TILE_SIZE : 20 * TILE_SIZE;
      player.y = lastMap === 3 ? 6 * TILE_SIZE : 19 * TILE_SIZE;
    } else if (pendingTeleportData.targetMap === 3) {
      setCurrentMap(3);
      player.x = 21 * TILE_SIZE;
      player.y = 19 * TILE_SIZE;
    }
    pendingTeleportData = null;
    flashState = 'fadeOut';
  } else if (flashState === 'fadeOut') {
    flashAlpha -= 0.02;
    if (flashAlpha <= 0) {
      flashAlpha = 0;
      flashState = 'idle';
      canTeleport = true;
    }
  }

  if (currentMap === 1) drawNPC(ctx);
  drawPlayer(ctx);
  drawMapUpper(ctx);
  drawDialogBox(ctx, GAME_WIDTH, GAME_HEIGHT, dialogBoxImage);

  if (flashAlpha > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${flashAlpha})`;
    ctx.fillRect(camX - halfWidth, camY - halfHeight, GAME_WIDTH / zoom, GAME_HEIGHT / zoom);
  }

  ctx.restore();

  updateMenuInput(keysPressed);
  drawMenu(ctx, GAME_WIDTH, GAME_HEIGHT);

  requestAnimationFrame(gameLoop);
}

dialogBoxImage.onload = () => {
  showMainMenu(() => {
    gameLoop();
  });
};
