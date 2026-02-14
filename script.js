async function fetchAllData() {
  const randomId = Math.floor(Math.random() * 100) + 1;

  fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`)
    .then(response => response.json())
    .then(data => {
      renderTable(data, 'json-placeholder', 'Detalles del Post');
    })
    .catch(error => console.error('Error en JSONPlaceholder:', error));

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then(response => response.json())
    .then(data => {
      const simplifiedPoke = {
        Nombre: data.name.toUpperCase(),
        ID: data.id,
        Altura: `${data.height / 10} m`,
        Tipos: data.types.map(t => t.type.name).join(', ')
      };
      renderTable(simplifiedPoke, 'poke-api', 'Estadísticas Pokémon');
    })
    .catch(error => console.error('Error en Poke API:', error));

  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      const dogData = {
        Estado: data.status,
        Imagen: `<img src="${data.message}" style="width: 100px; border-radius: 5px;">`
      };
      renderTable(dogData, 'dog-api', 'Imagen del Perro');
    })
    .catch(error => console.error('Error en Dog API:', error));
}

function renderTable(data, containerId, title) {
  const container = document.getElementById(containerId);
  
  let tableHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th colspan="2">${title}</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const key in data) {
    tableHTML += `
      <tr>
        <td class="font-weight-bold">${key}</td>
        <td>${data[key]}</td>
      </tr>
    `;
  }

  tableHTML += `
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}