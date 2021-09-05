chrome.storage.local.get(`profilePicture`, (res) => {
    if (Object.keys(res).length !== 0) {
        if (document.querySelector(`.current-user-image.student-other`) !== null) {
            document.querySelector(`.current-user-image.student-other`).style.filter = `none`;
            document.querySelector(`.current-user-image.student-other`).style.backgroundImage = `url("${res.profilePicture}")`;
        } else if (document.querySelector(`.welcome-greeting .welcome-greeting-image.student-other`) !== null) {
            document.querySelector(`.welcome-greeting .welcome-greeting-image.student-other`).style.filter = `none`;
            document.querySelector(`.welcome-greeting .welcome-greeting-image.student-other`).style.backgroundImage = `url("${res.profilePicture}")`;
        }
    }
});