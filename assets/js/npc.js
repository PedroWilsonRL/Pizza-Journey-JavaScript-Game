import { isBlocked } from './map.js';

export const npcImage = new Image();
npcImage.src = 'assets/characters/people/npc1.png';

export const shadowImage = new Image();
shadowImage.src = 'assets/characters/shadow.png';

export const npc = {
  x: 10 * 32,
  y: 14 * 32,
  width: 58,
  height: 78,

  frameWidth: 280,
  frameHeight: 390,

  frameX: 0,
  frameY: 0,
  frameMax: 3,
  speed: 1,
  moving: false,
  direction: 'down',  
  moveDirection: 1,
};

let showDialog = false;
const dialogLines = [
  "Hello chef!",
  "Have you ever thought about accessing...",
  "GitHub.com/@PedroWilsonRL?",
  "Or access the YouTube channel...",
  "Pedrinho 8-bit?",
  "I heard that Pedrinho does some cool projects..."
];
let currentLine = 0;
let charIndex = 0;
let textTimer = 0;
const typingSpeed = 2;

let waitingNextLine = false;

export function isCollidingWithNPC(x, y, width, height) {
  const npcLeft = npc.x - npc.width / 2;
  const npcRight = npc.x + npc.width / 2;
  const npcTop = npc.y - npc.height + 32;
  const npcBottom = npc.y;

  const objLeft = x - width / 2;
  const objRight = x + width / 2;
  const objTop = y - height + 32;
  const objBottom = y;

  return !(
    objRight < npcLeft ||
    objLeft > npcRight ||
    objBottom < npcTop ||
    objTop > npcBottom
  );
}

export function updateNPC() {
  npc.moving = false;
  npc.frameX = 0;
  npc.frameY = 0;
}

export function handleDialog(zPressed, zHandled, playerX, playerY, playerWidth, playerHeight) {
  const colliding = isCollidingWithNPC(playerX, playerY, playerWidth, playerHeight);

  if (colliding && zPressed && !zHandled) {
    if (!showDialog) {

      const dx = playerX - npc.x;
      const dy = playerY - npc.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        npc.direction = dx > 0 ? 'right' : 'left';
      } else {
        npc.direction = dy > 0 ? 'down' : 'up';
      }

      showDialog = true;
      currentLine = 0;
      charIndex = 0;
      textTimer = 0;
      waitingNextLine = false;
      return true;
    } else if (waitingNextLine) {
      if (currentLine < dialogLines.length - 1) {
        currentLine++;
        charIndex = 0;
        textTimer = 0;
        waitingNextLine = false;
        return true;
      } else {
        showDialog = false;
        return true;
      }
    }
  }

  if (showDialog && !waitingNextLine) {
    textTimer++;
    if (textTimer >= typingSpeed) {
      textTimer = 0;
      if (charIndex < dialogLines[currentLine].length) {
        charIndex++;
      } else {
        waitingNextLine = true;
      }
    }
  }

  return false;
}


export function drawNPC(ctx) {

  switch (npc.direction) {
    case 'down': npc.frameY = 0; break;
    case 'left': npc.frameY = 2; break;
    case 'right': npc.frameY = 1; break;
    case 'up': npc.frameY = 3; break;
  }

  const shadowWidth = npc.width * 0.8;
  const shadowHeight = npc.height * 0.3;

  ctx.drawImage(
    shadowImage,
    npc.x - shadowWidth / 2,
    npc.y - shadowHeight / 12 + 10,
    shadowWidth,
    shadowHeight
  );

  ctx.drawImage(
    npcImage,
    npc.frameX * npc.frameWidth,
    npc.frameY * npc.frameHeight,
    npc.frameWidth,
    npc.frameHeight,
    npc.x - npc.width / 2,
    npc.y - npc.height + 32,
    npc.width,
    npc.height
  );

      // DEBUG: desenha a hitbox do NPC
      //ctx.strokeStyle = 'blue';
      //ctx.lineWidth = 2;
      //ctx.strokeRect(
        //npc.x - npc.width / 2,
        //npc.y - npc.height + 32,
        //npc.width,
        //npc.height
      //);
  }

export function drawDialogBox(ctx, canvasWidth, canvasHeight, dialogBoxImage) {
  if (!showDialog) return;

  const dialogWidth = 550;
  const dialogHeight = 150;
  const x = (canvasWidth - dialogWidth) / 6;
  const y = canvasHeight - dialogHeight - 20;

  ctx.drawImage(dialogBoxImage, x, y, dialogWidth, dialogHeight);

  const text = dialogLines[currentLine].substring(0, charIndex);
  ctx.fillStyle = "#000";
  ctx.font = "10px Emulogic";
  ctx.fillText(text, x + 28, y + 60);

  if (waitingNextLine) {
    ctx.fillText("[Z] continue", x + dialogWidth - 160, y + 110);
  }
}

export function isDialogActive() {
  return showDialog;
}
