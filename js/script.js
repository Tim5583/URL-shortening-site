const hamburgerIcon = document.getElementById("hamburger-icon");
const navItems = document.querySelectorAll(".nav-items");


// show and hide navitems when hamburger icon tirggered
hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("open")
    navItems.forEach((item) => {
        let setDisplay;
        const displayStatus = item.style.display;
        if (displayStatus == "block") {
            setDisplay = "none";
        } else {
            setDisplay = "block";
        }

        item.style.display = setDisplay;
    });
});
