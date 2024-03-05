const URL_ROUTES = {
  profile: 'profile_images',
  animals: 'animal_images'
}

export const fotoPathBuilder = ({ type, foto }) => `http://localhost:3000/${URL_ROUTES[type]}/${foto}`
