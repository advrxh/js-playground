// app js

// localstorage
const getKey = () => {
    key = JSON.parse(localStorage.getItem("key"));

    if (!key) {
        newKey = prompt("Enter API key.");
        localStorage.setItem("key", JSON.stringify({ key: newKey }));
        location.reload(true)
    }

    return key.key;
};

// fetch weather msgs and cache them
const fetchWeatherCodeInfo = async () => {
    const info = await fetch(
        "https://www.weatherapi.com/docs/weather_conditions.json"
    )
        .then((resp) => resp.json())
        .catch((err) => console.error(err));

    return info;
};

// api
const fetchWeather = async (q) => {
    const KEY = getKey();
    const URL = `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${q}`;

    const weather = await fetch(URL)
        .then((resp) => resp.json())
        .catch((err) => console.error(err));

    return weather;
};

// get a formatted conveyable msg
const getWeatherMsg = (code) => {
    const WEATHER_INFO = JSON.parse(localStorage.getItem("weather"));

    for (i of WEATHER_INFO) {
        if (i.code == code) {
            return i.day;
        }
    }
    return "";
};

// format
const parseResp = (resp) => {
    const data = {
        location: resp.location.name,
        timezone: resp.location.tz_id,
        country: resp.location.country,
        climate: {
            condition: resp.current.condition.text,
            temp: resp.current.feelslike_c,
        },
        icon: resp.current.condition.icon.replace("64x64", "128x128"),
        msg: getWeatherMsg(resp.current.condition.code),
    };

    return data;
};

// main
window.onload = () => {
    // load whether messages
    fetchWeatherCodeInfo().then((r) =>
        localStorage.setItem("weather", JSON.stringify(r))
    );
    
    const inp = document.getElementById('inp-cmp')

    const weatherIt = (q) => {
        const temp = document.getElementById('temp')
        const msg = document.getElementById('msg')
        const condition = document.getElementById('condition')
        const icon = document.getElementById('icon')
        const name = document.getElementById('name')
        const tz = document.getElementById('tz')
        const country = document.getElementById('country')

        fetchWeather(q).then(
            (r) => {
                weatherData = parseResp(r)
                temp.innerText = weatherData.climate.temp
                condition.innerText = weatherData.climate.condition
                icon.setAttribute('src', weatherData.icon)
                name.innerText = weatherData.location
                tz.innerText = weatherData.timezone
                country.innerText = weatherData.country
                msg.innerText = weatherData.climate.condition !== weatherData.msg ? weatherData.msg : ''
                
            } 
        )

        .catch(
            (err) => console.error(err)
        )
    }

    inp.addEventListener('keyup', (e) => {
        if (e.keyCode === 13){
            weatherIt(inp.value);
            inp.value = ''
        }
    }) 
    weatherIt('Delhi')    
};
