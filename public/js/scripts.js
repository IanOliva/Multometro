


/*Toggle dropdown list*/

var userMenuDiv = document.getElementById("userMenu");
var userMenu = document.getElementById("userButton");

var navMenuDiv = document.getElementById("nav-content");
var navMenu = document.getElementById("nav-toggle");

document.onclick = check;

function check(e) {
    var target = (e && e.target) || (event && event.srcElement);

    //User Menu
    if (!checkParent(target, userMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, userMenu)) {
            // click on the link
            if (userMenuDiv.classList.contains("invisible")) {
                userMenuDiv.classList.remove("invisible");
            } else { userMenuDiv.classList.add("invisible"); }
        } else {
            // click both outside link and outside menu, hide menu
            userMenuDiv.classList.add("invisible");
        }
    }

    //Nav Menu
    if (!checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, navMenu)) {
            // click on the link
            if (navMenuDiv.classList.contains("hidden")) {
                navMenuDiv.classList.remove("hidden");
            } else { navMenuDiv.classList.add("hidden"); }
        } else {
            // click both outside link and outside menu, hide menu
            navMenuDiv.classList.add("hidden");
        }
    }

}

function checkParent(t, elm) {
    while (t.parentNode) {
        if (t == elm) { return true; }
        t = t.parentNode;
    }
    return false;
}




//  Script para calcular el total en función de la multa y el porcentaje de la jurisdicción

document.addEventListener("DOMContentLoaded", function () {
    const multaInput = document.getElementById("multa");
    const jurisdiccionSelect = document.getElementById("jurisdiccion");
    const totalInput = document.getElementById("total");

    function calcularTotal() {
        const multa = parseFloat(multaInput.value) || 0;
        const selectedOption = jurisdiccionSelect.options[jurisdiccionSelect.selectedIndex];
        const porcentaje = parseFloat(selectedOption.getAttribute("data-porcentaje")) || 0;

        // Calcular el total como porcentaje de la multa
        const total = (multa * porcentaje) / 100;
        totalInput.value = Math.round(total); // Mostrar el total 
    }

    // Escuchar eventos de cambio y entrada en los inputs
    multaInput.addEventListener("input", calcularTotal);
    jurisdiccionSelect.addEventListener("change", calcularTotal);
});



