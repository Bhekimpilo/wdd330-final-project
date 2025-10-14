import HikeModel from './hikeModel.js'
import { renderHikeList, renderHikeDetails } from './hikes.js'

export default class HikeController {
  constructor(listId) {
    this.listElement = document.getElementById(listId)
    this.hikeModel = new HikeModel()

    document.addEventListener('showDetails', e => {
      const hike = this.hikeModel.getHikeByName(e.detail)
      this.showHikeDetails(hike)
    })
  }

  showHikeList() {
    const hikes = this.hikeModel.getAllHikes()
    renderHikeList(hikes, this.listElement)
  }

  showHikeDetails(hike) {
    renderHikeDetails(hike, this.listElement)
    document.getElementById('backBtn').addEventListener('click', () => this.showHikeList())
  }
}
