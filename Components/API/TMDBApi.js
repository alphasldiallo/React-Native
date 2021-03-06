const API_TOKEN = "d28e0af1fb360e1558da665e441dec52"


//Fetch from URL
export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page='+page

  return fetch(url)
  .then((response)=> response.json())
  .catch((error) => console.error(error))
  
}

export function getFilmDetailFromApi (id) {
  const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=' + API_TOKEN + '&language=fr'

  return fetch(url)
  .then((response)=> response.json())
  .catch((error) => console.error(error))
  
}

export function getImageFromApi (name)
{
  return 'https://image.tmdb.org/t/p/w300' + name
}