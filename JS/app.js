document.addEventListener("DOMContentLoaded", () => {
  cargarContactos();
  const agregarBtn = document.getElementById("agregarContacto");
  agregarBtn.addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;

    if (nombre && apellido && telefono) {
      agregarContacto(nombre, apellido, telefono);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  });
});
function cargarContactos() {
  const contactosList = document.getElementById("contactos");
  fetch("http://www.raydelto.org/agenda.php")
    .then((response) => response.json())
    .then((data) => {
      contactosList.innerHTML = "";
      data.forEach((contacto) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const img2 = document.createElement("img");
        img.src = "/IMG/persona.png";
        const span = document.createElement("span");
        span.textContent = `${contacto.nombre} ${contacto.apellido} -`;

        img2.src = "/IMG/telefono.png";
        const span2 = document.createElement("span");
        span2.textContent = `${contacto.telefono}`;

        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(img2);
        li.appendChild(span2);
        contactosList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error al cargar los contactos:", error));
}

function agregarContacto(nombre, apellido, telefono) {
  const nuevoContacto = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
  };

  fetch("http://www.raydelto.org/agenda.php", {
    method: "POST",
    body: JSON.stringify(nuevoContacto),
  })
    .then((response) => response.json())
    .then(() => {
      cargarContactos();
      alert("Datos registrados");
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("telefono").value = "";
    })
    .catch((error) => console.error("Error al agregar el contacto:", error));
}
