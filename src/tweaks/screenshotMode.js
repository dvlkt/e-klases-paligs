/*
	Screenshot Mode removes all personal information and replaces it with just some random text.
	This is not activatable from the GUI, the only way to access it is by uncommenting the following code:
*/
/* window.addEventListener(`pageLoaded`, () => {
	applyScreenshotMode();
}); */

const applyScreenshotMode = () => {
	if (window.location.href.includes(`/Family/Home`)) {

		for (let newsItemCountElement of document.querySelectorAll(`.widget-notification span.items`)) {
			newsItemCountElement.innerText = `(${Math.floor(Math.random() * 11 + 1)})`
		}
		for (let newsTagElement of document.querySelectorAll(`.dashboard-news-item .tag`)) {
			newsTagElement.innerText = `Jaunumi`
		}
		for (let newsTitleElement of document.querySelectorAll(`.dashboard-news-item h3`)) {
			newsTitleElement.innerText = generateRandomText(newsTitleElement.innerText.split(` `).length);
		}
		for (let newsContentElement of document.querySelectorAll(`.article-content`)) {
			newsContentElement.innerText = generateRandomText(newsContentElement.innerText.split(` `).length);
		}

	} else if (window.location.href.includes(`/Family/Diary`)) {
		
		for (let subjectElement of document.querySelectorAll(`.first-column .title`)) {
			subjectElement.innerText = generateRandomText(subjectElement.innerText.split(` `).length);
		}
		for (let topicElement of document.querySelectorAll(`.subject p`)) {
			topicElement.innerText = generateRandomText(topicElement.innerText.split(` `).length);
		}
		for (let homeworkElement of document.querySelectorAll(`.hometask p`)) {
			homeworkElement.innerText = generateRandomText(homeworkElement.innerText.split(` `).length);
		}
		for (let gradeElement of document.querySelectorAll(`.score.open-mark-file`)) {
			if (gradeElement.className.includes(`warning`)) {
				gradeElement.innerText = Math.floor(Math.random() * 2 + 1);
			} else {
				gradeElement.innerText = Math.floor(Math.random() * 5 + 4);
			}
		}

	}
}

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Elementum curabitur vitae nunc sed velit dignissim sodales. Elementum eu facilisis sed odio morbi quis commodo odio. Non enim praesent elementum facilisis. Iaculis eu non diam phasellus vestibulum lorem sed. Sed risus ultricies tristique nulla aliquet. Eu non diam phasellus vestibulum lorem sed risus. Nascetur ridiculus mus mauris vitae. Cursus euismod quis viverra nibh cras pulvinar. Libero nunc consequat interdum varius sit amet. Fringilla urna porttitor rhoncus dolor purus. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Tempus egestas sed sed risus pretium quam vulputate dignissim. Sit amet dictum sit amet justo donec enim. Eget dolor morbi non arcu risus quis varius quam quisque. Potenti nullam ac tortor vitae purus. Viverra tellus in hac habitasse platea dictumst. Varius quam quisque id diam vel quam elementum pulvinar.
Enim neque volutpat ac tincidunt vitae. Facilisis volutpat est velit egestas dui id. Fringilla ut morbi tincidunt augue interdum velit euismod in. Id porta nibh venenatis cras sed felis eget. Ornare suspendisse sed nisi lacus sed viverra tellus. Aliquam sem fringilla ut morbi tincidunt augue interdum. Aenean et tortor at risus viverra adipiscing. Diam donec adipiscing tristique risus nec feugiat. Est ultricies integer quis auctor elit. Pharetra sit amet aliquam id diam maecenas ultricies.
Egestas fringilla phasellus faucibus scelerisque. Et leo duis ut diam quam. Id donec ultrices tincidunt arcu non. Sem fringilla ut morbi tincidunt augue. Feugiat vivamus at augue eget arcu dictum varius. Aliquet risus feugiat in ante metus dictum at tempor. Tincidunt praesent semper feugiat nibh. Scelerisque eu ultrices vitae auctor eu augue ut. Neque sodales ut etiam sit. Amet consectetur adipiscing elit ut aliquam purus. Mollis aliquam ut porttitor leo. Enim nulla aliquet porttitor lacus luctus. Varius duis at consectetur lorem donec massa sapien. Nisi porta lorem mollis aliquam ut. Amet purus gravida quis blandit turpis cursus in. Purus in massa tempor nec.
Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Lobortis elementum nibh tellus molestie nunc non blandit. In est ante in nibh mauris cursus. Pellentesque diam volutpat commodo sed egestas egestas. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Id nibh tortor id aliquet lectus proin nibh. Non arcu risus quis varius quam quisque id diam vel. Et sollicitudin ac orci phasellus egestas tellus rutrum. Blandit massa enim nec dui nunc. Gravida neque convallis a cras semper auctor. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar.
Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Sed enim ut sem viverra. Sit amet luctus venenatis lectus. Lacinia at quis risus sed vulputate odio ut enim. Libero volutpat sed cras ornare arcu dui vivamus arcu. Sit amet porttitor eget dolor morbi non arcu risus. Venenatis lectus magna fringilla urna porttitor rhoncus. Mi bibendum neque egestas congue quisque egestas. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Nulla aliquet enim tortor at auctor urna nunc id cursus. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Imperdiet dui accumsan sit amet nulla facilisi. Velit aliquet sagittis id consectetur purus. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Sed faucibus turpis in eu mi bibendum neque. Praesent semper feugiat nibh sed pulvinar proin. At auctor urna nunc id cursus. Ut tristique et egestas quis ipsum.
Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit. Eu ultrices vitae auctor eu augue. Pharetra sit amet aliquam id. Eget gravida cum sociis natoque. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Orci eu lobortis elementum nibh tellus molestie nunc non. Blandit aliquam etiam erat velit scelerisque in dictum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Feugiat vivamus at augue eget arcu dictum. Arcu odio ut sem nulla. Odio morbi quis commodo odio aenean sed adipiscing. Risus sed vulputate odio ut enim blandit volutpat maecenas.
In arcu cursus euismod quis viverra nibh. Aliquam purus sit amet luctus venenatis. Amet risus nullam eget felis eget nunc lobortis. Dui accumsan sit amet nulla facilisi. Odio ut enim blandit volutpat maecenas volutpat blandit. Ac felis donec et odio pellentesque diam volutpat. Ornare suspendisse sed nisi lacus sed viverra tellus in. Elementum eu facilisis sed odio morbi. Est velit egestas dui id ornare arcu odio. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Faucibus in ornare quam viverra.
Commodo nulla facilisi nullam vehicula. Volutpat ac tincidunt vitae semper quis. A arcu cursus vitae congue mauris rhoncus. Mauris rhoncus aenean vel elit scelerisque. Urna cursus eget nunc scelerisque viverra mauris. Cras ornare arcu dui vivamus arcu felis bibendum. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Erat velit scelerisque in dictum non consectetur a erat. Suscipit tellus mauris a diam. Integer eget aliquet nibh praesent tristique. Ut diam quam nulla porttitor massa id. At auctor urna nunc id cursus metus aliquam eleifend. Sit amet massa vitae tortor condimentum lacinia quis. Porta lorem mollis aliquam ut porttitor leo a. Tortor consequat id porta nibh venenatis cras sed. Consectetur adipiscing elit pellentesque habitant morbi tristique. Leo vel fringilla est ullamcorper eget. Ultrices tincidunt arcu non sodales neque sodales ut etiam.
At imperdiet dui accumsan sit amet nulla facilisi morbi. Nunc lobortis mattis aliquam faucibus purus in. Volutpat diam ut venenatis tellus. Mauris cursus mattis molestie a iaculis at erat. Vivamus at augue eget arcu dictum varius duis at. Ut diam quam nulla porttitor massa. Enim ut sem viverra aliquet. Pellentesque dignissim enim sit amet. Vel eros donec ac odio tempor orci dapibus ultrices in. Nisi porta lorem mollis aliquam ut porttitor leo a. Arcu non sodales neque sodales ut etiam sit amet. Et leo duis ut diam quam. In fermentum posuere urna nec tincidunt. Lectus proin nibh nisl condimentum id. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Arcu non sodales neque sodales ut. Vitae suscipit tellus mauris a diam maecenas. Etiam dignissim diam quis enim lobortis scelerisque. Tellus orci ac auctor augue mauris augue.
Neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Dui id ornare arcu odio ut sem nulla pharetra diam. Viverra maecenas accumsan lacus vel facilisis. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Feugiat sed lectus vestibulum mattis ullamcorper velit. Sagittis vitae et leo duis ut diam quam nulla. Non curabitur gravida arcu ac tortor dignissim convallis. Varius morbi enim nunc faucibus. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Luctus accumsan tortor posuere ac. Eget nunc lobortis mattis aliquam faucibus purus. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Odio pellentesque diam volutpat commodo. Viverra aliquet eget sit amet. Iaculis urna id volutpat lacus laoreet.`;
const generateRandomText = (length) => {
	let result = ``;
	for (let i = 0; i < Math.min(length, loremIpsum.split(` `).length - 1); i++) {
		if (i !== 0) {
			result += ` `;
		}

		result += loremIpsum.split(` `)[i];
	}
	return result;
}