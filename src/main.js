import HikeController from './hikeController.js'

const hikeController = new HikeController('hikes')
window.addEventListener('load', () => {
  hikeController.showHikeList()
})
