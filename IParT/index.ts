
window.onload = () => {

    const f1 = document.getElementById("f1") as HTMLIFrameElement;

    const tokenIdDisplay = document.getElementById("token_id") as HTMLSpanElement;

    const nextTokenButton = document.getElementById("next") as HTMLSpanElement;
    nextTokenButton.onclick = () => load(currentTokenId + 1);

    const prevTokenButton = document.getElementById("prev") as HTMLSpanElement;
    prevTokenButton.onclick = () => load(currentTokenId - 1);

    const gotoTokenButton = document.getElementById("goto") as HTMLSpanElement;
    gotoTokenButton.onclick = () => load(Number.parseInt(gotoTokenInput.value));

    const gotoTokenInput = document.getElementById("goto_token") as HTMLInputElement;
    gotoTokenInput.onkeyup = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            gotoTokenButton.click();
        }
    }


    let currentTokenId = 0;
    function load(newTokenId:number) {
        if(newTokenId < 0) return;
        currentTokenId = newTokenId;
        tokenIdDisplay.innerText = currentTokenId.toString();
        gotoTokenInput.value = currentTokenId.toString();
        f1.setAttribute('src', `./IParTDist/index.html#${currentTokenId}`);
        document.location.hash = newTokenId.toString();
    }

    load(document.location.hash ? Number.parseInt(document.location.hash.substring(1)) : 0);

}