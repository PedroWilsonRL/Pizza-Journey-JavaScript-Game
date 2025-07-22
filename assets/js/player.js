import { isBlocked } from './map.js';
import { isDialogActive } from './npc.js';



export const playerImage = new Image();
playerImage.src = 'assets/characters/people/hero.png';

export const shadowImage = new Image();
shadowImage.src = 'assets/characters/shadow.png';

export const player = {
  x: 19 * 32,
  y: 14 * 32,
  width: 78,
  height: 88,

  frameWidth: 184,
  frameHeight: 228,

  frameX: 0,
  frameY: 0,
  frameMax: 3,
  speed: 3,
  moving: false,
  direction: 'down'
};

let frameTimer = 0;
const frameInterval = 10;



export function updatePlayer(keysPressed) {

  player.moving = false;

  let dx = 0;
  let dy = 0;
  
  if (keysPressed['ArrowUp']) {
    dy = -player.speed;
    player.direction = 'up';
    player.moving = true;
  } else if (keysPressed['ArrowDown']) {
    dy = player.speed;
    player.direction = 'down';
    player.moving = true;
  } else if (keysPressed['ArrowLeft']) {
    dx = -player.speed;
    player.direction = 'left';
    player.moving = true;
  } else if (keysPressed['ArrowRight']) {
    dx = player.speed;
    player.direction = 'right';
    player.moving = true;
  }

  if (isDialogActive()) {
    player.frameX = 0;
    return;
  }

  const nextX = player.x + dx;
  const nextY = player.y + dy;

  const leftFootX = nextX - player.width / 2 + 10;
  const rightFootX = nextX + player.width / 2 - 10;
  const footY = nextY + player.height - 32;

const blockedLeft = isBlocked(leftFootX, footY);
const blockedRight = isBlocked(rightFootX, footY);
if (!blockedLeft && !blockedRight) {
  player.x = nextX;
  player.y = nextY;
}



  switch (player.direction) {
    case 'down': player.frameY = 0; break;
    case 'left': player.frameY = 1; break;
    case 'right': player.frameY = 2; break;
    case 'up': player.frameY = 3; break;
  }

  if (player.moving) {
    frameTimer++;
    if (frameTimer >= frameInterval) {
      player.frameX = (player.frameX + 1) % player.frameMax;
      frameTimer = 0;
    }
  } else {
    player.frameX = 0;
  }
}

export function drawPlayer(ctx) {

  const shadowWidth = player.width * 0.6;
  const shadowHeight = player.height * 0.3;

  ctx.drawImage(
    shadowImage,
    player.x - shadowWidth / 1.4,
    player.y - shadowHeight / 2 + 10,
    shadowWidth,
    shadowHeight
  );

  ctx.drawImage(
    playerImage,
    player.frameX * player.frameWidth,
    player.frameY * player.frameHeight,
    player.frameWidth,
    player.frameHeight,
    player.x - player.width / 2,
    player.y - player.height + 32,
    player.width,
    player.height
  );

  // DEBUG: desenha a hitbox do player
  //ctx.strokeStyle = 'red';
  //ctx.lineWidth = 2;
  //ctx.strokeRect(
    //player.x - player.width / 2,
    //player.y - player.height + 32,
    //player.width,
    //player.height
  //);
}
