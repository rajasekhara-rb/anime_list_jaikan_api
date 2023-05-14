function createNodeAndAppendChild(element, id, cls, parent) {
    let ele = document.createElement(`${element}`);
    ele.setAttribute("class", `${cls}`);
    ele.setAttribute("id", `${id}`);
    parent.appendChild(ele);
    return ele
}

// console.log(createNode('div'));

let inputEle = createNodeAndAppendChild('input', 'input', 'form-control m-2 mx-3', document.body);
inputEle.setAttribute('placeholder', "Enter some name");
let submitBtn = createNodeAndAppendChild('button', 'btn', 'btn btn-warning m-2 mx-3', document.body);
submitBtn.innerHTML = 'Submit';
submitBtn.setAttribute('onclick', 'getAnimie()');

let divEle = createNodeAndAppendChild("div", 'main', "container-fluid d-flex flex-wrap p-2 m-1", document.body);

async function getAnimie() {
    let query = inputEle.value;
    // console.log(query);
    if (query != "") {
        try {
            let data = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`);
            let anime = await data.json();
            // console.log(anime);
            displayData(anime)
            inputEle.value = "";
            return anime;
        } catch (error) {
            console.log(error);
        }
    }
    else {
        alert("input cannot be blank")
    }
}

function displayData(data) {

    if (data['data'] != "") {
        data["data"].forEach(element => {
            let card = createNodeAndAppendChild('div', 'card', 'w-25 bg-warning m-1 mx-3 rounded border border-danger d-flex flex-column align-items-center', divEle);
            let a = createNodeAndAppendChild('a', '', 'm-2', card);
            a.setAttribute("href", `${element.url}`);
            a.setAttribute("target", "_blank");
            let img = createNodeAndAppendChild('img', 'img', 'img rounded border border-primary', a);
            img.setAttribute('src', `${element.images.jpg.image_url}`);
            let title = createNodeAndAppendChild("h4", "title", "bold p-2", card);
            title.innerHTML = `${element.title}`;
            // let synopsis = createNodeAndAppendChild('p', "", "p-2", card);
            // synopsis.innerHTML = `${element.synopsis}`;

            let btn = createNodeAndAppendChild('a', "btn", "btn btn-danger m-1", card);
            btn.innerHTML = 'Watch Trailer';
            btn.setAttribute('href', `${element.trailer.url}`);
            btn.setAttribute('target', "_blank");

            let Watchbtn = createNodeAndAppendChild('a', "btn", "btn btn-info m-1", card);
            Watchbtn.innerHTML = 'More Info';
            Watchbtn.setAttribute('href', `${element.url}`);
            Watchbtn.setAttribute('target', "_blank");
        });
    }
    else {
        divEle.innerText = "Nothing to show";
    }
};