// Oggetto contenente i dati utente (può essere spostato su un server o file separato JSON)
const userData = {
    "user1": {
        "name": "Carlo Alberto Lisa",
        "images": [
            {
                "src": "asset/carlo/download.jpg",
                "description": "Questa è la descrizione dell'immagine 1."
            },
            {
                "src": "download2.jpg",
                "description": "Questa è la descrizione dell'immagine 2."
            }
        ]
    },
    "user2": {
        "name": "Maria Rossi",
        "images": [
            {
                "src": "asset/maria/download.jpg",
                "description": "Descrizione dell'immagine 1 per Maria."
            },
            {
                "src": "image2.jpg",
                "description": "Descrizione dell'immagine 2 per Maria."
            }
        ]
    }
};

// Funzione per recuperare i parametri dall'URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Funzione per aggiornare il titolo dinamicamente
function updateTitle() {
    const userId = getQueryParam('id'); // Recupera l'ID dell'utente dall'URL
    const user = userData[userId];

    if (user) {
        const titleElement = document.querySelector("h1");
        titleElement.innerText = `DICHIARAZIONE DELLA PRIVACY ${user.name}`;
    } else {
        alert("Utente non trovato. Verifica l'URL.");
    }
}

// Funzione per mostrare le immagini dell'utente
function showImages() {
    const userId = getQueryParam('id'); // Recupera l'ID dell'utente dall'URL
    const user = userData[userId];

    if (user) {
        document.getElementById('content').classList.add('hidden');

        const imagesDiv = document.getElementById("images");
        imagesDiv.innerHTML = ''; // Pulisce il contenuto precedente

        user.images.forEach(img => {
            const section = document.createElement("div");
            section.classList.add("section");

            const description = document.createElement("p");
            description.classList.add("description");
            description.innerText = img.description;

            const image = document.createElement("img");
            image.src = img.src;
            image.alt = img.description;

            section.appendChild(description);
            section.appendChild(image);
            imagesDiv.appendChild(section);
        });

        imagesDiv.classList.remove('hidden');
    } else {
        alert("Dati non trovati per l'utente specificato.");
    }
}

// Caricamento automatico dei dati all'apertura della pagina
document.addEventListener("DOMContentLoaded", () => {
    updateTitle(); // Aggiorna il titolo dinamicamente
});
