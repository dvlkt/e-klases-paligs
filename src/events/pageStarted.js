let loadStartEvent = new Event("pageStarted");
setTimeout(() => { window.dispatchEvent(loadStartEvent); }, 50); // This is such a terrible solution but I'll come up with something better later on