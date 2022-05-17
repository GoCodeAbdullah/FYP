import GenericService from './GenericService'
import jwtDecode from 'jwt-decode'
class UserService extends GenericService {
  constructor() {
    super()
  }

  login = (email, password, role) =>
    new Promise((resolve, reject) => {
      this.post(`${role}/login`, { email, password })
        .then((token) => {
          localStorage.setItem('token', token)
          resolve(token)
        })
        .catch((err) => {
          reject(err)
        })
    })
  register_user = (customerDetails) =>
    this.post('customer/register', customerDetails)
  get_user = (id) => this.get('customer/' + id)
  register_gym = (gymDetails) => this.post('gym/gymregister', gymDetails)
  register_trainer = (trainerDetails) =>
    this.post('trainer/trainerregister', trainerDetails)
  logout = () => {
    localStorage.removeItem('token')
  }

  waterIntake = (water_intake) => {
    this.post('waterIntake/addWaterIntake', water_intake)
  }
  waterPage = (userId) => this.get('waterIntake/' + userId)

  isLoggedIn = () => {
    return localStorage.getItem('token') ? true : false
  }
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem('token')
      return jwtDecode(jwt)
    } catch (ex) {
      return null
    }
  }
  getoneUser = (user_id) => this.get('customer/' + user_id)

  getFood = (foodName) => this.post('food/name', foodName)
  getExcercise = (excerciseName) => this.post('excercise/name', excerciseName)

  getMealData = (customerId) => this.get('meal/mealdata/' + customerId)
  deleteMealData = (mealId) => this.delete('meal/' + mealId)
  createConvo = (convo) => this.post('conversation', convo)

  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == 'admin') return true
      else return false
    } else return false
  }
}

let userService = new UserService()
export default userService
