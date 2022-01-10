const signUp = document.getElementById('signUp');
const signIn = document.getElementById('signIn');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const container = document.getElementById('container');


signUp.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signIn.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

registerButton.addEventListener('click', () => {
	document.getElementById('registerForm').submit();
});

loginButton.addEventListener('click', () => {
	document.getElementById('loginForm').submit();
});
