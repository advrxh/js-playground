// app js

const CAPS = "QWERTYUIOPASDFGHJKLZXCVBNM";
const LOWR = "qwertyuiopasdfghjklzxcvbnm";
const NUMS = "0123456789";
const SPCL = `!@#$%^&*()_+=-{}[]\\/,.<>;':"`;

const genPwd = (charLen, hasCaps, hasLowr, hasNums, hasSpcl) => {
    var chars = "";

    // making character set

    if (hasCaps) {
        chars += CAPS;
    }
    if (hasLowr) {
        chars += LOWR;
    }
    if (hasNums) {
        chars += NUMS;
    }
    if (hasSpcl) {
        chars += SPCL;
    }

    // converting a string to an array
    chars = Array(...chars);

    // shuffling the charset
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    // generating password
    let pwd = "";

    for (let i = 0; i < charLen; i++) {
        pwd += chars[Math.floor(Math.random() * chars.length)];
    }

    return pwd.length !== 0 &&
        ![hasCaps, hasLowr, hasNums, hasSpcl].every((i) => i == false)
        ? pwd
        : "That shit is empty!";
};

const getPwd = (pwdLen) => {
    const hasUpperCase = document.getElementById("inc-upr").checked;
    const hasLowerCase = document.getElementById("inc-lwr").checked;
    const hasNumbers = document.getElementById("inc-num").checked;
    const hasSpecialChars = document.getElementById("inc-spcl").checked;

    // inp comps
    const pwdDisplay = document.getElementById("out");

    pwd = genPwd(
        pwdLen,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChars
    );
    pwdDisplay.innerText = pwd;

    navigator.clipboard
        .writeText(pwd)
        .then(() => console.log("Copied to clipboard!"));
};

window.onload = () => {
    // var
    var pwdLen = 12;

    const pwdLenSlider = document.getElementById("pwd-len");
    const outContainer = document.getElementById("out-cont");

    // out comps

    const lenDisplay = document.getElementById("pwd-len-display");

    document.getElementById("inc-upr").checked = true;
    document.getElementById("inc-lwr").checked = true;
    document.getElementById("inc-num").checked = true;
    document.getElementById("inc-spcl").checked = true;

    pwdLenSlider.oninput = () => {
        lenDisplay.innerText = pwdLenSlider.value;
        pwdLen = Number(pwdLenSlider.value);
    };

    outContainer.onclick = () => getPwd(pwdLen);

    getPwd(pwdLen);
};
