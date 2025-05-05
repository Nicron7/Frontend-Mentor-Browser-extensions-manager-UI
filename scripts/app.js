const container = document.querySelector(".grid");
const buttons = document.querySelectorAll(".heading__button");
const modal = document.querySelector("#modal");
const logo = document.querySelector(".header__theme img");
const toggleTheme = document.querySelector(".header__theme");


toggleTheme.addEventListener("click", () => {
    if(document.body.classList.contains("light")){
        document.body.classList.remove("light");
        logo.src = "./assets/images/icon-sun.svg";
    } else {
        document.body.classList.add("light");
        logo.src = "./assets/images/icon-moon.svg";
    }
})

function fetchData(){
    fetch("data.json")
    .then(response => response.json())
    .then(json => addDataToDOM(json))
}

fetchData();

function addDataToDOM(data){
    data.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <div class="card__top">
            <div class="card__logo">
                <img src="${element.logo}" alt="${element.name}">
            </div>
            <div class="card__info">
                <h2 class="card__title">${element.name}</h2>
                <p class="card__desc">${element.description}</p>
            </div>
        </div>
        <div class="card__bottom">    
            <div class="card__remove">
                <a href="#">Remove</a>
            </div>
            <div class="card__toggle">
                <div tabindex="0" class="toggle__bar ${element.isActive ? "toggle__bar-active" : ""}">
                    <div class="toggle__circle"></div>
                </div>
            </div>
        </div>`    
        container.appendChild(card);
    }
    );
    const toggle = container.querySelectorAll(".toggle__bar");
    toggle.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.toggle("toggle__bar-active");
        })
    })
    const remove = container.querySelectorAll(".card__remove");
    removeCard(remove)
}

function btnActive(){
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            filterData(button);
            buttons.forEach(btn => {
                btn.classList.remove("heading__button-active");
            })
            button.classList.add("heading__button-active");
        })
    })
}

btnActive();

function filterData(elem){
    if(elem.getAttribute("name") === "active"){
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            const isActive = card.querySelector(".toggle__bar").classList.contains("toggle__bar-active");
            if(!isActive){
                card.style.display = "none";
            } else {
                card.style.display = "flex";
            }
        })
       }
       if(elem.getAttribute("name") === "inactive"){
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            const isActive = card.querySelector(".toggle__bar").classList.contains("toggle__bar-active");
            if(isActive){
                card.style.display = "none";
            } else {
                card.style.display = "flex";
            }
        })
       }
       if(elem.getAttribute("name") === "all"){
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.style.display = "flex";
        })
       }
}


function removeCard(elem){
    elem.forEach(element => {
        element.addEventListener("click", () => {
            modal.classList.toggle("modal-hidden");
            if(!modal.classList.contains("modal-hidden")){
                modal.querySelector("#cancel").addEventListener("click", () => {
                    modal.classList.add("modal-hidden");
                })
                modal.querySelector("#delete").addEventListener("click", () => {
                    element.parentElement.parentElement.remove();
                    modal.classList.add("modal-hidden");
                })
            }
        })
    })
    
}








