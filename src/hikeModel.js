const hikeList = [
  {
    name: 'Bechler Falls',
    imgSrc: '/images/bechler.jpg',
    distance: '3 miles',
    difficulty: 'Easy',
    description: 'Beautiful short hike featuring Bechler Falls in Yellowstone National Park.'
  },
  {
    name: 'Teton Canyon',
    imgSrc: '/images/teton.jpg',
    distance: '5 miles',
    difficulty: 'Moderate',
    description: 'Scenic hike through Teton Canyon with excellent mountain views.'
  },
  {
    name: 'Denanda Falls',
    imgSrc: '/images/denanda.jpg',
    distance: '7 miles',
    difficulty: 'Hard',
    description: 'Challenging hike ending with a stunning view of Denanda Falls.'
  }
]

export default class HikeModel {
  getAllHikes() {
    return hikeList
  }

  getHikeByName(name) {
    return hikeList.find(hike => hike.name === name)
  }
}
