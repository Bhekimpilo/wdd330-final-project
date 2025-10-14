const hikeList = [
  {
    name: 'Bechler Falls',
    imgSrc: 'https://www.utahsadventurefamily.com/wp-content/uploads/2021/08/Bechler-Falls-9.jpeg',
    distance: '3 miles',
    difficulty: 'Easy',
    description: 'Beautiful short hike featuring Bechler Falls in Yellowstone National Park.'
  },
  {
    name: 'Teton Canyon',
    imgSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/8d/77/60/photo3jpg.jpg?w=1200&h=-1&s=1',
    distance: '5 miles',
    difficulty: 'Moderate',
    description: 'Scenic hike through Teton Canyon with excellent mountain views.'
  },
  {
    name: 'Denanda Falls',
    imgSrc: 'https://ugc.naturalatlas.com/photos/0/260/781/260781/IOAzCNxU/600.jpg?1717507894',
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
