// app js

// html elements
const qEl = document.querySelector('#question')
const optEls = {
    a: document.getElementsByClassName('option-a'),
    b: document.getElementsByClassName('option-b'),
    c: document.getElementsByClassName('option-c'),
    d: document.getElementsByClassName('option-d'),
}

const nxtBtnEl = document.getElementById('nxt-btn')
const subBtnEl = document.getElementById('sub-btn')

// constants
const question_data = [{
        question: 'Who sang the song SUNDOWN-(1974)?',
        options: {
            a: 'James Taylor',
            b: 'Tracy Chapman',
            c: 'Gordon Lightfoot',
            d: 'Don McLean'
        },
        answer: 'c'
    },
    {
        question: 'Who sang the bond theme for Daniel Craigs "No time to die"?',
        options: {
            a: 'Dua Lipa',
            b: 'Billie Eillish',
            c: 'Selina Gomez',
            d: 'Justin Beiber'
        },
        answer: 'b'
    },
    {
        question: 'Which Famous music band sang ROXANNE?',
        options: {
            a: 'The Police',
            b: 'The Beatles',
            c: 'California',
            d: 'Fleetwood Mac'
        },
        answer: 'a'
    },
]

const loadQ = () => {

    nxtBtnEl.setAttribute('disabled', 'true')
    qEl.style.background = "#96a9df"

    for (opt of Object.values(optEls)) {
        if (opt[1].checked) {
            opt[1].checked = false
        }
    }

    q = question_data[Math.floor(Math.random() * question_data.length) + 0]

    qEl.innerHTML = q.question

    for (key of Object.keys(q.options)) {
        optEls[key][0].childNodes[2].data = q.options[key]
        optEls[key][1].setAttribute('value', key)
    }

    nxtBtnEl.onclick = () => {
        loadQ()
    }

    subBtnEl.onclick = () => {
        const checkedOp = document.querySelector('input[name=option]:checked')

        if (checkedOp.attributes.value.value === q.answer) {
            nxtBtnEl.attributes.removeNamedItem('disabled')
            qEl.style.background = '#96dfa0'
        } else {
            qEl.style.background = '#d85353'
        }
    }
}

window.onload = e => {
    loadQ()
}

document.onload = e => {
    loadQ()
}