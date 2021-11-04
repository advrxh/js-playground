// app js

// render movie comp

const renderMovieComp = (movieInfo) => {
    const { name, year, genre, rating, thumbUrl } = movieInfo

    const moviesCont = document.querySelector('.movies')

    const movieComp = document.createElement('div')
    movieComp.classList.add('movie')

    // movie comp children

    // thumbnail comp

    const thumbImg = document.createElement('img')
    thumbImg.classList.add('thumb')
    thumbImg.alt = name
    thumbImg.src = thumbUrl

    // foooter cont comp 

    const movieFoot = document.createElement('div')
    movieFoot.classList.add('foot')

    // footer comp children

    const movieTitle = document.createElement('h3')
    movieTitle.classList.add('title')
    movieTitle.innerText = name

    const movieYear = document.createElement('p')
    movieYear.innerText = year

    const movieGenre = document.createElement('p')
    movieGenre.innerHTML = genre

    // rating cont

    const movieRatingCont = document.createElement('div')
    movieRatingCont.classList.add('rating-cont')

    movieRatingCont.innerHTML = `<i class="fa fa-star"></i>\n<span class="rating">${rating}</span>`

    movieFoot.appendChild(movieTitle)
    movieFoot.appendChild(movieYear)
    movieFoot.appendChild(movieGenre)
    movieFoot.appendChild(movieRatingCont)

    movieComp.appendChild(thumbImg)
    movieComp.appendChild(movieFoot)

    moviesCont.appendChild(movieComp)

}

// api

const BASE_URL = 'https://api.themoviedb.org/3'

const parseImgUrl = (file_url) => {

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'

    if (file_url !== null) {
        return IMG_BASE_URL + file_url
    } else {
        return 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-photo%2Flettering-oops-comic-text-sound-effects-yellow-background_23-2147948805.jpg&f=1&nofb=1'
    }

}

const parseGenres = (genre_ids) => {
    const genres = JSON.parse(localStorage.getItem('config'))['genres']
    var genres_str = ''

    for (id of genre_ids) {
        for (genre of genres) {
            if (genre.id == id) {
                genres_str += genre.name + ' '
            }
        }
    }

    return genres_str
}

const parseData = (data_obj) => {
    var parsedMovieObj = []

    for (movie of data_obj.results) {
        const { poster_path, genre_ids, title, release_date, vote_average } = movie

        var parsedMovie = {
            name: title,
            year: String(release_date).slice(0, 4),
            genre: parseGenres(genre_ids),
            rating: vote_average,
            thumbUrl: parseImgUrl(poster_path)
        }

        parsedMovieObj.push(parsedMovie)

    }

    return parsedMovieObj
}

const fetchMovies = async(API_KEY, query) => {
    const data = await fetch(BASE_URL + `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`)
        .then(resp => {
            return resp.json()
        })
        .catch(err => { return null })

    return parseData(data)
}

const fetchRandom = async(API_KEY) => {
    const page_no = Math.floor((Math.random() * 500) + 1)
    const data = await fetch(BASE_URL + `/discover/movie?sort_by=vote_count.desc&include_adult=true&page=${page_no}&api_key=${API_KEY}`)
        .then((resp) => {
            return resp.json()
        })
        .catch((err) => {
            return null;
        })

    return parseData(data)

}


// storage and key handling 

const fetchApiKey = () => {
    if (!(localStorage.getItem('config') === null)) {
        return JSON.parse(localStorage.getItem('config'))['key']
    } else {
        setupKey();
    }
}

const fetchGenres = async(key) => {
    const genre_data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`)
        .then((resp) => {
            return resp.json()
        })
        .catch(err => { return null; })

    return genre_data
}


const setupKey = () => {
    const key = prompt('Enter the API_KEY [TMDB API KEY]:')
    const genres = fetchGenres(key).then((r => {
        localStorage.setItem('config', JSON.stringify({ key: key, genres: r.genres }))
    }));
}




// main

const main = () => {

    const key = fetchApiKey();

    const search_btn = document.querySelector('.search .btn')
    const search_inp = document.querySelector('.search .inp')
    const moviesCont = document.querySelector('.movies')

    moviesCont.innerHTML = ''

    fetchRandom(key).then(movies => {
        movies.map(movie => renderMovieComp(movie))
    })

    const search = () => {

        query = search_inp.value

        fetchMovies(key, query).then(movies => {
            if (movies.length !== 0) {
                moviesCont.innerHTML = ''
                for (movie of movies) {
                    renderMovieComp(movie)
                }
            } else {
                moviesCont.innerHTML = '<h1 class="err">Could Not Find a Match! :/</h1>'
            }
        })

        search_inp.value = ''
    }

    search_btn.addEventListener('click', (e) => {
        search()
    })

    search_inp.addEventListener('keydown', e => {
        if (e.key === "Enter" || e.keyCode === 13) {
            search()
        }
    })

}

window.onload = () => {
    main()

    const logoComp = document.querySelector('nav .logo-text')

    logoComp.addEventListener('click', (e) => {
        main()
    })
}