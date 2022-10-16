/*start global variables*/

//random background Option vatiable 
let randomBackgroundOption = true;

//random background Option interval
let backgroundInterval;

/*end global variables*/


/*local storage*/
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor)
    document.querySelectorAll("#setting-box .colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}

//background option
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        randomBackgroundOption = true;
    } else {
        randomBackgroundOption = false;
    }

    document.querySelectorAll("#setting-box .random-lists li").forEach(element => {
        if (element.dataset.background === localStorage.getItem("options")) {
            element.classList.add("active");
        }
    });
}

/*End local storage*/

/*setting box*/
//toggle 
let settingBox = document.querySelector("#setting-box");
let iconBox = document.querySelector(".icon-box");
let settingIcon = document.querySelector(".setting-icon");
iconBox.addEventListener("click", () => {
    settingBox.classList.toggle("open");
    settingIcon.classList.toggle("fa-spin");
    document.querySelector(".setting-container").classList.toggle("hidden");
});

//switch main colors
document.querySelectorAll("#setting-box .option-box .colors-list li").forEach(li => {
    li.addEventListener("click", (e) =>{
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
        
        handleActive(e);
    });
});


//switch random background
document.querySelectorAll("#setting-box .random-lists li").forEach(li => {
    li.addEventListener("click", (e) =>{
        localStorage.setItem("options", e.target.dataset.background);
        
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            randomBackgroundOption = true;
            randomBackgroundImgs();
            localStorage.setItem("background_option", true);
            
        } else {
            randomBackgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
        
    });
});

// reset to default options
document.querySelector(".reset-option").onclick = function () {
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("options");

    window.location.reload();
}
/*End setting box*/

//functions

/*function to random background image*/
function randomBackgroundImgs () {
    backgroundInterval = setInterval(() =>{
        document.querySelector("#landing").style.backgroundImage = `url(images/0${Math.floor(Math.random() * 4)}.jpg)`;
    }, 3000);
}

if (randomBackgroundOption === true) {
    randomBackgroundImgs();
}

//navber scroll
const navbarLinks = document.querySelectorAll("#landing .landing-header li a");
scrollToSections(navbarLinks);

/* skill progress*/
let skills = document.querySelector("#skills");

window.onscroll = function () {
    let skillsOffSetScrollTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > skillsOffSetScrollTop + skillsOuterHeight - windowHeight) {
        let allSkills = document.querySelectorAll("#skills .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}
/* End skill progress*/

/*gallery*/
document.querySelectorAll("#gallery .gallery-images img").forEach(img => {
    img.addEventListener("click", (e)=> {
        //create overlay
        let overlay = document.createElement("div");
        overlay.classList = "popup-overlay";
        document.body.appendChild(overlay);
        //create popup box
        let popupBox = document.createElement("div");
        popupBox.classList = "popup-box";

        //create alt text
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            imgHeading.classList = "image-heading";
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }

        //create img inside popup box
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        //create close button
        let closeButton = document.createElement("span");
        let closeText = document.createTextNode("x");
        closeButton.appendChild(closeText);
        closeButton.classList = "close-button";
        popupBox.appendChild(closeButton);

    });
});

document.addEventListener("click", (e) => {
    if(e.target.className === "close-button") {
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();

    }
});
/*End gallery*/

/*bullets*/
const allBullets = document.querySelectorAll("#nav-bullets .bullet");
scrollToSections(allBullets);

let bulletsLi = document.querySelectorAll("#setting-box .options .bullets-option li");
let bulletsContainer = document.querySelector("#nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");


//local storage for bullets
if (bulletLocalItem !== null) {
    bulletsLi.forEach(bullet => {
        bullet.classList.remove("active");
    });
    
    if (bulletLocalItem === "yes") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

//handle to show options
bulletsLi.forEach(li => {
    li.addEventListener("click", (e) =>{
        if (li.dataset.option === "yes") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "yes");
        } else if (li.dataset.option === "no"){
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "no");
        }
        handleActive(e);
    });
});
/*End bullets*/

//function to handle active state 
function handleActive (event) {
    //remove active class from all li
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    //add active class for target li
    event.target.classList.add("active");
}

//function scroll to sections
function scrollToSections (elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
        })
        });
    });
}

/*toggle menu*/
let toggleBtn = document.querySelector(".toggle-menu");
let headerLinks = document.querySelector("#landing .hidden");

toggleBtn.onclick = function (e) {
    e.stopPropagation();

    this.classList.toggle("menu-active");
    headerLinks.classList.toggle("hidden");
}

//close toggle menu when click at anywhere on screen
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== headerLinks) {
        headerLinks.classList.add("hidden");
        toggleBtn.classList.remove("menu-active");
    }
});

//stop propagation on headerLinks 
headerLinks.onclick = function (e) {
    e.stopPropagation();
}
/*End toggle menu*/
