import { TILE_SIZE } from './config.js';

const mapImage1 = new Image();
mapImage1.src = 'assets/maps/city_map.png';

const mapUpperImage1 = new Image();
mapUpperImage1.src = 'assets/maps/city_map upper.png';

const mapImage2 = new Image();
mapImage2.src = 'assets/maps/restaurant_map.png';

const mapUpperImage2 = new Image();
mapUpperImage2.src = 'assets/maps/restaurant_map upper.png';

const mapImage3 = new Image();
mapImage3.src = 'assets/maps/kitchen_map.png';

const mapUpperImage3 = new Image();
mapUpperImage3.src = 'assets/maps/kitchen_map upper.png';

export let currentMap = 1;

export function setCurrentMap(mapNumber) {
  currentMap = mapNumber;
}


const blockedTilesMap1 = [
  [12, 19], [16, 19], [6, 20], [6, 19], [6, 18], [6, 21], [6, 22], [6, 17], [6, 16], [6, 15],
  [6, 14], [6, 13], [6, 12], [6, 11], [6, 10], [6, 9], [6, 8], [6, 7], [6, 6], [6, 5], [6, 4],
  [6, 3], [6, 2], [6, 1], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4],
  [15, 4], [16, 4], [17, 4], [18, 4], [19, 4], [20, 4], [21, 4], [22, 4], [23, 4], [24, 4],
  [25, 4], [26, 4], [27, 4], [28, 4], [29, 4], [30, 4], [31, 4], [32, 4], [33, 4], [34, 4],
  [34, 5], [34, 6], [34, 7], [34, 8], [34, 9], [34, 10], [34, 11], [34, 12], [34, 13], [34, 14],
  [34, 15], [34, 16], [34, 17], [34, 18], [34, 19], [34, 20], [34, 21], [33, 21], [32, 21],
  [31, 21], [30, 21], [29, 21], [28, 21], [27, 21], [26, 21], [25, 21], [24, 21], [23, 21],
  [22, 21], [21, 21], [20, 21], [19, 21], [18, 21], [17, 21], [16, 21], [15, 21], [14, 21],
  [13, 21], [12, 21], [11, 21], [10, 21], [9, 21], [8, 21], [7, 21],
];

const blockedTilesMap2 = [
  [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12],
  [5, 13], [5, 14], [5, 15], [5, 16], [5, 17], [5, 18], [5, 19], [5, 20], [6, 21], [7, 21], [8, 21],
  [9, 21], [10, 21], [11, 21], [12, 21], [13, 21], [14, 21], [15, 21], [16, 21], [17, 21], [22, 21],
  [23, 21], [24, 21], [25, 21], [26, 21], [27, 21], [28, 21], [29, 21], [30, 21], [31, 21], [32, 21],
  [33, 21], [34, 20], [34, 19], [34, 18], [34, 17], [34, 16], [34, 15], [34, 14], [34, 13], [34, 12],
  [34, 11], [34, 10], [34, 9], [34, 8], [34, 7], [34, 6], [33, 7], [28, 7], [27, 7], [26, 7],
  [25, 7], [24, 7], [23, 7], [22, 7], [21, 7], [20, 7], [19, 7], [18, 7], [17, 7], [16, 7],
  [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7], [7, 7], [6, 7],
];

const blockedTilesMap3 = [
  [18, 19], [17, 19], [16, 19], [15, 19], [14, 19], [13, 19], [12, 19], [11, 19], [10, 19], [9, 19], [8, 19], [7, 19], [6, 19], [5, 19], 
  [6, 18], [6, 17], [6, 16], [6, 15], [6, 14], [6, 13], [6, 12], [6, 11], [6, 10], [6, 9], [6, 8], [6, 7], [6, 6], [6, 5], [6, 4], [6, 3], [6, 2],
  [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5],
  [23, 5], [24, 5], [25, 5], [26, 5], [27, 5], [28, 5], [29, 5], [30, 5], [31, 5], [32, 5], [33, 5], [34, 5], [34, 6], [34, 7], [34, 8], [34, 9],
  [34, 10], [34, 11], [34, 12], [34, 13], [34, 14], [34, 15], [34, 16], [34, 17], [34, 18], [34, 19], [34, 20], [33, 19], [32, 19], [31, 19], [30, 19], [29, 19],
  [28, 19], [27, 19], [26, 19], [25, 19], [24, 19], [23, 19]
];

export const teleportTilesMap1 = [
  [18, 10],
  [19, 10]
];

export const teleportTilesMap2_toMap1 = [
  [20, 20], [19, 20]
];

export const teleportTilesMap2_toMap3 = [
  [30, 5], [31, 5]  
];

export const teleportTilesMap3_toMap2 = [
  [18, 20], [19, 20], [20, 20], [21, 20], [22, 20]  
];

export function drawMap(ctx) {
  if (currentMap === 1) {
    ctx.drawImage(mapImage1, 0, 0);
  } else if (currentMap === 2) {
    ctx.drawImage(mapImage2, 0, 0);
  } else if (currentMap === 3) {
    ctx.drawImage(mapImage3, 0, 0);
  }
}

export function drawMapUpper(ctx) {
  if (currentMap === 1) {
    ctx.drawImage(mapUpperImage1, 0, 0);
  } else if (currentMap === 2) {
    ctx.drawImage(mapUpperImage2, 0, 0);
  } else if (currentMap === 3) {
    ctx.drawImage(mapUpperImage3, 0, 0);
  }
}

    export function drawBlockedTiles(ctx) {
    
      //ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
      let tiles;
      if (currentMap === 1) {
        tiles = blockedTilesMap1;
      } else if (currentMap === 2) {
        tiles = blockedTilesMap2;
      } else if (currentMap === 3) {
        tiles = blockedTilesMap3;
      }
      tiles.forEach(([tileX, tileY]) => {
        //ctx.fillRect(tileX * TILE_SIZE, tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      });
    }

    export function drawTeleportTiles(ctx) {
      
      //ctx.fillStyle = 'rgba(0, 0, 255, 0.4)';
      let tiles;
      if (currentMap === 1) {
        tiles = teleportTilesMap1;
      } else if (currentMap === 2) {
        tiles = [...teleportTilesMap2_toMap1, ...teleportTilesMap2_toMap3];
      } else if (currentMap === 3) {
        tiles = teleportTilesMap3_toMap2;
      } else {
        tiles = [];
      }
      tiles.forEach(([tileX, tileY]) => {
        //ctx.fillRect(tileX * TILE_SIZE, tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      });
    }


export function isBlocked(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);

  let tiles;
  if (currentMap === 1) {
    tiles = blockedTilesMap1;
  } else if (currentMap === 2) {
    tiles = blockedTilesMap2;
  } else if (currentMap === 3) {
    tiles = blockedTilesMap3;
  }

  return tiles.some(([bx, by]) => bx === tileX && by === tileY);
}

export function checkTeleportTile(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);

  if (currentMap === 1) {
    return {
      teleport: teleportTilesMap1.some(([tx, ty]) => tx === tileX && ty === tileY),
      targetMap: 2
    };
  } else if (currentMap === 2) {
    if (teleportTilesMap2_toMap1.some(([tx, ty]) => tx === tileX && ty === tileY)) {
      return { teleport: true, targetMap: 1 };
    }
    if (teleportTilesMap2_toMap3.some(([tx, ty]) => tx === tileX && ty === tileY)) {
      return { teleport: true, targetMap: 3 };
    }
    return { teleport: false, targetMap: null };
  } else if (currentMap === 3) {
    if (teleportTilesMap3_toMap2.some(([tx, ty]) => tx === tileX && ty === tileY)) {
      return { teleport: true, targetMap: 2 };
    }
    return { teleport: false, targetMap: null };
  }

  return { teleport: false, targetMap: null };
}