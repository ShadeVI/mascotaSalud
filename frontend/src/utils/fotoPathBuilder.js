import noImageProfile from '../assets/noImageProfile.png'
import noImageAnimal from '../assets/noimageAnimal.jpg'
import { BACKEND_ENDPOINTS } from '../constants/endpoints'

const URL_ROUTES = {
  profile: 'profile_images',
  animals: 'animal_images'
}

export const fotoPathBuilder = ({ type, foto }) => foto ? `${BACKEND_ENDPOINTS.BASE_URL}${URL_ROUTES[type]}/${foto}` : type === 'profile' ? noImageProfile : noImageAnimal
