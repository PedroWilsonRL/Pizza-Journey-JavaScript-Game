let menuOpen = false;

const menuImage = new Image();
menuImage.src = 'assets/characters/menu.png'; 

let selectedOptionIndex = 0;
const menuOptions = ['bag', 'money wallet', 'map', 'chef', 'save' , 'options', 'exit'];

export function toggleMenu() {
  menuOpen = !menuOpen;
  selectedOptionIndex = 0; 
}

export function isMenuOpen() {
  return menuOpen;
}

export function updateMenuInput(keysPressed) {
  if (!menuOpen) return;

  if (keysPressed['ArrowUp']) {
    selectedOptionIndex = (selectedOptionIndex - 1 + menuOptions.length) % menuOptions.length;
    keysPressed['ArrowUp'] = false;
  }
  if (keysPressed['ArrowDown']) {
    selectedOptionIndex = (selectedOptionIndex + 1) % menuOptions.length;
    keysPressed['ArrowDown'] = false;
  }
  if (keysPressed['Enter']) {
    const selected = menuOptions[selectedOptionIndex];
    if (selected === 'exit') {
      toggleMenu();
    }
   
    keysPressed['Enter'] = false;
  }
}

export function drawMenu(ctx, canvasWidth, canvasHeight) {
  if (!menuOpen) return;

  
  const menuWidth = 373;
  const menuHeight = 355;
  const x = (canvasWidth - menuWidth) / 1.1;
  const y = (canvasHeight - menuHeight) / 8;

  ctx.drawImage(menuImage, x, y, menuWidth, menuHeight);

  ctx.font = 'bold 18px Emulogic';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const textColor = 'black';

  for (let i = 0; i < menuOptions.length; i++) {
    ctx.fillStyle = textColor;

    const optionY = y + 50 + i * 26;
    const optionText = menuOptions[i];
    const optionX = x + 60; // 

    if (i === selectedOptionIndex) {
      ctx.fillText('→', x + 20, optionY);
    }

    ctx.fillText(optionText, optionX, optionY);
  }
}


