export default function() {
  this.openFullscreen = elem => {
    try {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  this.closeFullscreen = () => {
    if (window.innerHeight !== window.screen.height) return;

    try {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  this.setStream = (video, srcObject) => {
    video.srcObject = srcObject;
  };
}
