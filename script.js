document.addEventListener("DOMContentLoaded", () => {
    fetchCursos();
    getUserLocation();
});

function fetchCursos() {
    fetch("http://localhost:3000/cursos")
        .then(response => response.json())
        .then(data => {
            let coursesList = document.getElementById("courses");
            data.forEach(course => {
                let div = document.createElement("div");
                div.classList.add("course");
                div.innerHTML = `<h3>${course.nome}</h3><p>${course.descricao}</p><p>Local: ${course.endereco}</p>`;
                coursesList.appendChild(div);
            });
        });
}

function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch("http://localhost:3000/localizacao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
        });
    } else {
        alert("Geolocalização não disponível.");
    }
}
