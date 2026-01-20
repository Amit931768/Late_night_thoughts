const saveBtn = document.getElementById("saveBtn");
const shayariInput = document.getElementById("shayariInput");
const shayariList = document.getElementById("shayariList");

let shayariData = JSON.parse(localStorage.getItem("shayari")) || [];

function renderShayari() {
    shayariList.innerHTML = "";

    shayariData.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "shayari-card";

        card.innerHTML = `
            <p>${item.text}</p>
            <small>${item.time}</small>
            <div class="action-buttons">
                <button class="edit-btn" onclick="editShayari(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteShayari(${index})">Delete</button>
            </div>
        `;

        shayariList.appendChild(card);
    });
}

saveBtn.addEventListener("click", () => {
    if (shayariInput.value.trim() === "") return;

    const newShayari = {
        text: shayariInput.value,
        time: new Date().toLocaleString()
    };

    shayariData.unshift(newShayari);
    localStorage.setItem("shayari", JSON.stringify(shayariData));
    shayariInput.value = "";
    renderShayari();
});

function deleteShayari(index) {
    shayariData.splice(index, 1);
    localStorage.setItem("shayari", JSON.stringify(shayariData));
    renderShayari();
}

function editShayari(index) {
    shayariInput.value = shayariData[index].text;
    shayariData.splice(index, 1);
    localStorage.setItem("shayari", JSON.stringify(shayariData));
    renderShayari();
}

renderShayari();
