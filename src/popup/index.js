let lightThemeBtn = document.getElementById(`theme-light-btn`);
let darkThemeBtn = document.getElementById(`theme-dark-btn`);

lightThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light theme-selected`;
	darkThemeBtn.className = `theme theme-dark`;
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light`;
	darkThemeBtn.className = `theme theme-dark theme-selected`;
}
