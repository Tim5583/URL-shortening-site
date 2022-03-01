const userLinkForm = document.getElementById("user-link-form");
const generatedLinkContainer = document.getElementById("generated-links");


userLinkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let userInput = e.target.firstElementChild;
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
        console.log(data)
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
        copyBtn.innerText = "Copy";

        // copy sorten link to clipboard 
        copyBtn.addEventListener("click", () => {
            userInput.value = shortenURL;
            userInput.select();
            document.execCommand("copy");
            userInput.value = null;
            copyBtn.classList.add("copied");
            copyBtn.innerText = "Copyed!";
            setTimeout(()=> {
                copyBtn.classList.remove("copied");
                copyBtn.innerText = "Copy";
            }, 2000)
        });

        // append button to div and card in to generated link container 
        div.append(copyBtn);
        generatedLinkContainer.append(div);
        userInput.value = null;
    });
});
