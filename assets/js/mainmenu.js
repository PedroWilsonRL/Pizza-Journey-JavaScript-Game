export function showMainMenu(startCallback) {
  const menuContainer = document.createElement('div');
  menuContainer.style.position = 'absolute';
  menuContainer.style.top = '0';
  menuContainer.style.left = '0';
  menuContainer.style.width = '100%';
  menuContainer.style.height = '100%';
  menuContainer.style.backgroundColor = 'black';
  menuContainer.style.display = 'flex';
  menuContainer.style.flexDirection = 'column';
  menuContainer.style.alignItems = 'center';
  menuContainer.style.justifyContent = 'center';
  menuContainer.style.zIndex = '10';

  const logo = document.createElement('img');
  logo.src = 'assets/main_menu/Logo.png'; 
  logo.style.maxWidth = '50%';
  logo.style.height = 'auto';
  logo.style.marginBottom = '60px';
  menuContainer.appendChild(logo);

  const startImage = document.createElement('img');
  startImage.src = 'assets/main_menu/start_button.png'; 
  startImage.style.cursor = 'pointer';
  startImage.style.width = '300px'; 
  startImage.style.height = 'auto';

  startImage.addEventListener('click', () => {
    menuContainer.remove();
    startCallback(); 
  });

  menuContainer.appendChild(startImage);
  document.body.appendChild(menuContainer);
}
