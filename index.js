import {nameInfoUrl} from "./settings.js"
import {countryList} from "./settings.js"
import {isoCountryList} from "./settings.js"

let nameInput = document.getElementById("nameInput").value;

async function fetchNameInfo(nameInput) {
    nameInput = document.getElementById("nameInput").value;
    let newNameInfoUrl = nameInfoUrl + nameInput;
    let data = await fetch(newNameInfoUrl).then(response => response.json());
    document.getElementById("info-tbody").innerHTML =
        `<tr>
                    <td>${data.name}</td>
                    <td>${data.gender}</td>
                    <td>${data.genderProbability}</td>
                    <td>${data.age}</td>
                    <td>${data.ageCount}</td>
                    <td id="countryId">${data.country}</td>
                    <td>${data.countryProbability.toFixed(2)}</td>
                    </tr>`;
    document.getElementById("json-view").style.display = "block";
    document.getElementById("country-bubble").style.display = "block";

    document.getElementById("json-view").innerHTML = JSON.stringify(data, null, 2);

}

function changeCountryIdToName() {
    let countryId = document.getElementById("countryId").innerHTML;
    console.log(countryId)
    if (countryId in isoCountryList) {
        document.getElementById("countryId").innerText = isoCountryList[countryId];
    }else
        document.getElementById("countryId").innerText = countryList[countryId];
}

function changeCountryNameToId() {
    let countryId = document.getElementById("countryId").innerHTML
    console.log(countryId)
    if (countryId in countryList) {
        document.getElementById("countryId").innerText = countryList[countryId];
    }else
        document.getElementById("countryId").innerText = isoCountryList[countryId]
}

let shouldSwitching = false;
let switching = true;
let priceDir = "asc";
function changeCountryName() {

    while (switching) {
        switching = false;
        if (priceDir === "asc") {
            changeCountryIdToName();
            priceDir = "desc";
            shouldSwitching = true;
            break;
        } else if (priceDir === "desc") {
            changeCountryNameToId();
            priceDir = "asc";
            shouldSwitching = true;
            break;
        }
    }
    if (shouldSwitching) {
        switching = true;
    } else {
        priceDir = "desc";
        switching = true;
    }
}

document.getElementById("searchBtn").onclick = () => fetchNameInfo(nameInput);
document.getElementById("countryBtn").onclick = () => changeCountryName();