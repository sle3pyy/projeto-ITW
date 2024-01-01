function toggler(){
    let currentMode = localStorage.getItem('color-mode');
    if (currentMode == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-sun-o"></i>');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('color-mode','light');
        console.log(localStorage.getItem('color-mode'));
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark');
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-moon-o"></i>');
        localStorage.setItem('color-mode','dark');
        console.log(localStorage.getItem('color-mode'));
    } 
}
function starter(){
    if (localStorage.getItem('color-mode') == null) {
        localStorage.setItem('color-mode','light');
        console.log(localStorage.getItem('color-mode'));
    }
    else if (localStorage.getItem('color-mode') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','dark');
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-moon-o"></i>');
        console.log(localStorage.getItem('color-mode'));
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','light');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-sun-o"></i>');
        document.body.classList.remove('dark-mode');
        console.log(localStorage.getItem('color-mode'));
    }

}

document.getElementById('dark-mode-toggle').addEventListener('click',()=>{toggler()});

$(document).ready(function () {starter()});