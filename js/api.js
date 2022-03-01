const userLinkForm = document.getElementById("user-link-form");
const generatedLinkContainer = document.getElementById("generated-links");
const userInput = document.getElementById("url");

// get localStorage data 
const localData = localStorage.getItem("linksCard");
let savedCards = localData ? JSON.parse(localData) : [];


function copyToClipboard(shortURL, btnEl) {
    userInput.value = shortURL;
    userInput.select();
    document.execCommand("copy");
    userInput.value = null;
    btnEl.classList.add("copied");
    btnEl.innerText = "Copyed!";
    setTimeout(()=> {
        btnEl.classList.remove("copied");
        btnEl.innerText = "Copy";
    }, 2000)
}

// check if shorten link cards exist; if exist then display them 
if (savedCards) {
    savedCards.forEach(card => {
        generatedLinkContainer.innerHTML += card;
    });
    const buttons = document.querySelectorAll(".copyBtn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let short = button.previousElementSibling.innerText;
            copyToClipboard(short, button)
        });
    });

}

userLinkForm.addEventListener("submit", (e) => {

    e.preventDefault();
    let userLink = userInput.value;
    
    fetch(`https://api.shrtco.de/v2/shorten?url=${userLink}`)
    .then(res => res.json())
    .then(data => {

        // catch error  
        if (!data.ok) {
            alert("Please, Enter a Valid URL");
            userInput.value = null;
        }

        // shorten link 
        let shortenURL = data.result.full_short_link2;

        // create card div 
        const div = document.createElement("div");
        div.classList.add("linkcards");
        div.innerHTML = `
            <P class="link">${userLink}</P>
            <hr>
            <p class="shortlink">${shortenURL}</p>
        `;

        // create copy button
        const copyBtn = document.createElement("button");
        copyBtn.classList.add("btn");
        copyBtn.classList.add("copyBtn");
        copyBtn.innerText = "Copy";

        // copy sorten link to clipboard 
        copyBtn.addEventListener("click", () => {
            copyToClipboard(shortenURL, copyBtn);
        });

        // append button to div and card in to generated link container 
        div.append(copyBtn);
        generatedLinkContainer.append(div);
        savedCards.push(div.outerHTML);
        // add to link shorten card to localStorage 
        localStorage.setItem("linksCard", JSON.stringify(savedCards));
        userInput.value = null;
    });
});
