browser.storage.local.get(`profilePicture`).then((res) => {
    if (Object.keys(res).length !== 0) {
        if (document.querySelector(`.current-user-image.student-other`) !== null) {
            //document.querySelector(`.current-user-image.student-other`).style.filter = ``;
            //document.querySelector(`.current-user-image.student-other`).style.backgroundImage = `url("${res.profilePicture}")`;
        } else if (document.querySelector(`.welcome-greeting .welcome-greeting-image.student-other`) !== null) {
           // document.querySelector(`.welcome-greeting .welcome-greeting-image.student-other`).style.filter = ``;
            //document.querySelector(`.welcome-greeting .welcome-greeting-image.student-other`).style.backgroundImage = `url("${res.profilePicture}")`;
        }
    }
});