export const createRoute = (route, str) => str ? route.replace(/:[a-zA-Z0-9]+/i, str) : route
