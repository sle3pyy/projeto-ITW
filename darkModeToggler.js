function toggler(){
    let currentMode = localStorage.getItem('color-mode');
    if (currentMode == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-sun-o"></i>');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('color-mode','light');
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark');
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-moon-o"></i>');
        localStorage.setItem('color-mode','dark');
    } 
}

function starter(){
    let currentMode = localStorage.getItem('color-mode');
    if (currentMode == null) {
        localStorage.setItem('color-mode','light');
    }
    else if (currentMode == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','dark');
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-moon-o"></i>');
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','light');
        document.getElementById('dark-mode-toggle').innerHTML=('<i class="fa fa-sun-o"></i>');
        document.body.classList.remove('dark-mode');
    }

}

document.getElementById('dark-mode-toggle').addEventListener('click',()=>{toggler()});

$(document).ready(function () {starter()});