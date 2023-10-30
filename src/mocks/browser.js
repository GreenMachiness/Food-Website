import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
// JSON response data
import recipeData from './data/recipeData.json'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  http.get('https://api.edamam.com/api/recipes/v2', (info) => {
    const {
      request,
      params,
      cookies
    } = info
    return HttpResponse.json(recipeData) // respond using a mocked JSON body
  }),
  http.get('hhttps://api.edamam.com/api/recipes/v2', ({ request, params, cookies }) => { // inline destructuring of the info object
    // JSON can be provided in-line
    // an options object can be provided as a second argument to change status and statusText
    return HttpResponse.json(['Tom', 'Jerry', 'Spike'], {status: 202, statusText: 'Accepted'})
  }),
)