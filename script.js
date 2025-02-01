// Simuliamo un sistema di autenticazione
const userAuth = {
    isAuthenticated: true, // Qui andrebbe un vero controllo di login
    userId: "user1" // Dovresti ottenere l'ID dell'utente autenticato
};

// Simuliamo un database di utenti
const userData = {
    "user1": {
        "name": "Carlo Alberto Lisa",
        "images": [
            {
                "src": "asset/carlo/download.jpg",
                "description": "Questa è la descrizione dell'immagine 1."
            },
            {
                "src": "download (1).jpg",
                "description": "Questa è la descrizione dell'immagine 2."
            }
        ]
    },
    "user2": {
        "name": "Maria Rossi",
        "images": [
            {
                "src": "image1.jpg",
                "description": "Descrizione dell'immagine 1 per Maria."
            },
            {
                "src": "image2.jpg",
                "description": "Descrizione dell'immagine 2 per Maria."
            }
        ]
    }
};

// Funzione per aggiornare il titolo dinamicamente
function updateTitle(userId) {
    if (!userAuth.isAuthenticated) {
        alert("Accesso negato. Effettua il login.");
        return;
    }

    const user = userData[userId];

    if (user) {
        const titleElement = document.querySelector("h1");
        titleElement.innerText = `DICHIARAZIONE DELLA PRIVACY ${user.name}`;
    } else {
        alert("Errore: utente non trovato.");
    }
}

// Funzione per mostrare le immagini dell'utente cercato
function showImages(userId) {
    if (!userAuth.isAuthenticated) {
        alert("Accesso negato. Effettua il login.");
        return;
    }
    
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

// Funzione per cercare un utente
function searchUser() {
    const searchInput = document.getElementById("searchBar").value.trim();
    if (userData[searchInput]) {
        updateTitle(searchInput);
        showImages(searchInput);
    } else {
        alert("Utente non trovato.");
    }
}

// Caricamento automatico dei dati all'apertura della pagina
document.addEventListener("DOMContentLoaded", () => {
    updateTitle(userAuth.userId); // Aggiorna il titolo dinamicamente
    
    // Aggiungere una barra di ricerca dinamica
    const searchContainer = document.createElement("div");
    searchContainer.innerHTML = `
        <input type="text" id="searchBar" placeholder="Inserisci ID utente">
        <button onclick="searchUser()">Cerca</button>
    `;
    document.body.insertBefore(searchContainer, document.body.firstChild);
});
