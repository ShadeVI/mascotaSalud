import noImageProfile from '../assets/noImageProfile.png'
import noImageAnimal from '../assets/noimageAnimal.jpg'

const URL_ROUTES = {
  profile: 'profile_images',
  animals: 'animal_images'
}

export const fotoPathBuilder = ({ type, foto }) => foto ? `http://localhost:3000/${URL_ROUTES[type]}/${foto}` : type === 'profile' ? noImageProfile : noImageAnimal
