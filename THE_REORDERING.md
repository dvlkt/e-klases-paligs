# THE REORDERING - A massive back-end overhaul of the extension

## Directory structure

/src/stylesheets/ - Many CSS files that give the extension it's modern look

/src/events/pageStart.js - Adds the pageStart event

/src/events/pageLoading.js - Adds the pageLoading event

/src/events/pageLoadCompleted.js - Adds the pageLoadCompleted event

/src/events/urlChanged.js - Adds the urlChanged event

/src/analytics/main.js - Has various utility functions for analytics

/src/analytics/diary.js - Adds the analytics box to the diary

/src/popup/ - All of the files necessary for the popup to work

/src/res/ - All of the resources like fonts and images

/src/themes/ - The default theme JSON files

/src/tweaks/branding.js - Adds the branding like favicons & logos

/src/tweaks/pfp.js - Adds the profile picture

/src/tweaks/mail.js - Adds the mail view tweaks

/scripts/build.js - Builds the extension to /build/

/scripts/dev.js - Live builds the extension and opens it in a browser