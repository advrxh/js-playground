// app js

// component rendering

const renderProfile = (user) => {
    console.log(user);

    const avatar = document.querySelector(".pfp a img");
    avatar.src = user.avatar;
    avatar.alt = user.name;
    avatar.parentElement.href = user.url;

    const name = document.querySelector("h3");
    name.innerHTML = user.name;

    const bio = document.querySelector(".bio p");
    bio.innerHTML = user.bio;

    const website = document.getElementById("website");
    const email = document.getElementById("email");
    const twitter = document.getElementById("twitter");

    website.setAttribute(
        "href",
        user.website !== null ? user.website : website.removeAttribute("href")
    );
    email.setAttribute(
        "href",
        user.email !== null ? user.email : email.removeAttribute("href")
    );
    twitter.setAttribute(
        "href",
        user.twitter !== null
            ? "https://twitter.com/" + user.twitter
            : twitter.removeAttribute("href")
    );

    const followers = document.querySelector(".user-details .flwrs");
    const following = document.querySelector(".user-details .flwing");
    const repoNo = document.querySelector(".user-details .repo-no");

    followers.innerHTML = user.followers;
    following.innerHTML = user.following;
    repoNo.innerHTML = user.repos_no;

    const repos = document.querySelector(".repos");
    repos.innerHTML = "";

    for (let i = 0; i < user.repos.length; i++) {
        var repoTag = document.createElement("li");
        var repoLink = document.createElement("a");

        repoTag.classList.add("repo");

        repoLink.setAttribute("target", "_blank");
        repoLink.href = user.repos[i].url;
        repoLink.innerText = user.repos[i].name;

        repoTag.appendChild(repoLink);

        repos.appendChild(repoTag);
    }
};

// github api handler

const fetchUser = async (username) => {
    const API_URL = `https://api.github.com/users/`;

    const userData = await fetch(API_URL + username)
        .then((resp) => (resp.status === 200 ? resp.json() : null))
        .catch((err) => null);

    return parseData(userData);
};

const fetchPopularRepos = async (repo_url) => {
    const repo_data = await fetch(repo_url)
        .then((resp) => resp.json())
        .catch((err) => null);

    var repos = [];

    if (repo_data.length <= 10) {
        for (repo of repo_data) {
            repos.push(parseRepoData(repo));
        }
    } else {
        for (let i = 0; i < 10; i++) {
            repos.push(parseRepoData(repo_data[i]));
        }
    }

    return repos;
};

const parseRepoData = (repo_data) => {
    const { name, html_url } = repo_data;

    return {
        name: name,
        url: html_url,
    };
};

const parseData = (user_data) => {
    const {
        bio,
        blog,
        email,
        followers,
        following,
        public_repos,
        name,
        login,
        repos_url,
        twitter_username,
        html_url,
    } = user_data;
    var parsedData;
    parsedData = fetchPopularRepos(repos_url).then((popular_repos) => {
        return {
            avatar:
                user_data.avatar_url !== null
                    ? user_data.avatar_url
                    : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fbokeh%2Fbokeh_PNG27.png",
            bio: bio,
            name: name === null ? login : name,
            website: blog === null || blog === "" ? "#" : blog,
            email: email === null || email === "" ? "#" : email,
            followers: followers,
            following: following,
            repos_no: public_repos,
            repos: popular_repos,
            twitter:
                twitter_username === null || twitter_username === ""
                    ? "#"
                    : twitter_username,
            url: html_url,
        };
    });

    return parsedData;
};

// color picker

const colorThief = new ColorThief();

const setImagePalette = (img_url) => {
    const img = new Image();

    let googleProxyURL =
        "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

    img.crossOrigin = "Anonymous";
    img.src = googleProxyURL + img_url;

    const rgbToHex = (r, g, b) =>
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("");

    img.addEventListener("load", () => {
        let palette = colorThief.getPalette(img);

        document.documentElement.style.setProperty(
            "--primary",
            rgbToHex(...palette[2])
        );
        document.documentElement.style.setProperty(
            "--secondary",
            rgbToHex(...palette[4])
        );
        document.documentElement.style.setProperty(
            "--tertiary",
            rgbToHex(...palette[7])
        );
    });
};

window.onload = () => {
    fetchUser("aadilvarsh").then((user) => {
        setImagePalette(user.avatar);
        renderProfile(user);
    });

    const search = document.querySelector(".search input");

    search.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && e.keyCode === 13) {
            fetchUser(search.value.trim()).then((user) => {
                if (user !== null) {
                    setImagePalette(user.avatar);
                    renderProfile(user);
                }
                search.value = "";
            });
        }
    });
};
