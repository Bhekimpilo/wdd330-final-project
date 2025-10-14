export function renderHikeList(hikes, parent) {
  parent.innerHTML = ''
  hikes.forEach(hike => parent.appendChild(renderHikeCard(hike)))
}

export function renderHikeDetails(hike, parent) {
  parent.innerHTML = `
    <section class="hike-details">
      <h2>${hike.name}</h2>
      <img src="${hike.imgSrc}" alt="${hike.name}">
      <p><strong>Distance:</strong> ${hike.distance}</p>
      <p><strong>Difficulty:</strong> ${hike.difficulty}</p>
      <p>${hike.description}</p>
      <button id="backBtn">⬅ Back to List</button>
    </section>
  `
}

function renderHikeCard(hike) {
  const item = document.createElement('li')
  item.classList.add('hike')
  item.innerHTML = `
    <h2>${hike.name}</h2>
    <img src="${hike.imgSrc}" alt="${hike.name}">
    <p>${hike.distance} | ${hike.difficulty}</p>
  `
  item.addEventListener('click', () => {
    const event = new CustomEvent('showDetails', { detail: hike.name })
    document.dispatchEvent(event)
  })
  return item
}
