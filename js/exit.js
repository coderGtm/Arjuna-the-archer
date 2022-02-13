function makeExitConfigs0() {

/* Standard syntax */
document.addEventListener("fullscreenchange", function() {
  location.reload();
});

/* Firefox */
document.addEventListener("mozfullscreenchange", function() {
  location.reload();
});

/* Chrome, Safari and Opera */
document.addEventListener("webkitfullscreenchange", function() {
  location.reload();
});

/* IE / Edge */
document.addEventListener("msfullscreenchange", function() {
  location.reload();
});
}

function makeExitConfigs() {
    document.addEventListener('fullscreenchange', (event) => {
  if (!document.fullscreenElement) {
    location.reload();
  }
});
}