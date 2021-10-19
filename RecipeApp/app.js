// app js


window.onload = (e) => {
    const input = document.getElementsByTagName('input')
    const submit = document.querySelector('#search-submit')
    const recipes = document.getElementById('recipes')
    const recipePopup = document.querySelector('.recipe-popup')

    recipePopup.style.visibility = "hidden"

    submit.addEventListener('click', () => {
        getRecipeByName(input[0].value).then((r) => {
            recipes.innerHTML = ""
            try {
                for (meal of r) {
                    createRecipe(meal)
                }
            } catch (TypeError) {
                recipes.innerHTML = `<h1 class="heading">No recipes on <i>${input[0].value}</i> was found</h1>`
            }

            input[0].value = ""
        })
    })

    const createRecipe = (recipeData) => {

        const { strMealThumb, idMeal, strMeal, strCategory, strArea, strYoutube, strTags } = recipeData
        var tags = []

        tags.push(strCategory, strArea)
        if (strTags) {
            for (i of strTags.split(',')) {
                tags.push(i)
            }
        }

        const _recipe = document.createElement('div')
        _recipe.classList.add('recipe')

        const _recipe_header = document.createElement('div')
        _recipe_header.classList.add('recipe-header')

        const heading = document.createElement('h3')
        heading.classList.add('heading')
        heading.id = idMeal
        heading.innerText = strMeal

        heading.addEventListener('click', (e) => openPopup(e.srcElement.id))

        const utube_icon = document.createElement('a')
        utube_icon.setAttribute('href', strYoutube)
        utube_icon.setAttribute('target', '_blank')
        utube_icon.innerHTML = '<i id="utube-icon" class="fa fa-youtube-play" aria-hidden="true"></i>'

        _recipe_header.appendChild(heading)
        _recipe_header.appendChild(utube_icon)

        const thumb = document.createElement('div')
        thumb.classList.add('thumb')
        thumb.innerHTML = `<img src="${strMealThumb}" alt="${strMeal}" />`

        const tagsEl = document.createElement('ul')
        tagsEl.classList.add('tags')

        for (tag of tags) {
            var _li = document.createElement('li')
            _li.innerHTML = tag
            tagsEl.appendChild(_li)
        }

        _recipe.appendChild(_recipe_header)
        _recipe.appendChild(thumb)
        _recipe.appendChild(tagsEl)

        document.querySelector('#recipes').appendChild(_recipe)
    }

    const getRandomRecipe = async() => {
        const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(r => r.json())
            .catch(e => console.error(e))

        return data.meals
    }

    const getRecipeById = async(id) => {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((r) => r.json())
            .catch((e) => console.error(e))

        return data.meals[0]
    }

    const getRecipeByName = async(name) => {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .then((r) => r.json())
            .catch((e) => console.error(e))

        return data.meals
    }

    const openPopup = (id) => {

        var recipeData = getRecipeById(id).then((r) => r)

        recipeData.then((r) => {
            createPopup(r)
        })

    }

    const getEmbedLink = (url) => {

        var _split = url.split('/')
        _split = _split[_split.length - 1]
        _split = _split.split("=")
        _split = _split[_split.length - 1]

        return 'https://www.youtube.com/embed/' + _split
    }

    const createPopup = (r) => {
        const { strMeal, strInstructions, strMealThumb, strYoutube } = r

        const heading = document.querySelector('#popup .heading')
        const content = document.querySelector('#popup #content p')
        const thumb = document.querySelector('#popup #popupThumb img')
        const utubeEmbed = document.querySelector("#popup .youtubeEmbed iframe")
        const closePopup = document.getElementById("closePopup")

        heading.innerHTML = strMeal
        content.innerHTML = strInstructions

        thumb.setAttribute('src', strMealThumb)
        thumb.setAttribute('alt', strMeal)

        utubeEmbed.setAttribute('src', getEmbedLink(strYoutube))

        closePopup.addEventListener('click', () => {
            recipePopup.style.visibility = "hidden"
        })

        recipePopup.style.visibility = 'visible'
    }

    for (let i = 0; i < 10; i++) {
        getRandomRecipe().then((r) => {
            createRecipe(r[0])
        })
    }
}