const mastermindDemo = document.getElementById("MastermindDemo");
const mastermindLightbox = document.getElementById('mastermindLightbox');
const mastermindClose = document.getElementById('mastermind-close');
//initialize

function playPauseVideo(vid) {
  if (vid.paused){
  vid.play(); 
  }
  else { 
  vid.pause(); 
  }
}

mastermindLightbox.onkeydown = function(e){
  switch(e.key){
    case " ":
      // stops default behaviour of space bar. Stop page scrolling down
      e.preventDefault();
      playPauseVideo(mastermindDemo);
      break;
    case "Escape":
      hideMasterMindVideo();
      break;
    case "Home":
      event.preventDefault();
      video.currentTime = 0;
      video.play();
      break;
    case "M"://fallback intended.
    case "m":
      mastermindDemo.muted = !(mastermindDemo.muted);
      break;
    default:
      return;
  }
}

function showMasterMindVideo(){
  mastermindLightbox.style.display = 'block';
  mastermindLightbox.focus();
}

function hideMasterMindVideo(){
  mastermindLightbox.style.display = 'none';
  mastermindDemo.pause(); 
}

const punktspielDemo = document.getElementById("punktspielDemo");
const punktspielLightbox = document.getElementById('punktspielLightbox');
const punktspielClose = document.getElementById('punktspiel-close');
//initialize

function showPunktspielVideo(){
  //punktspielLightbox.style.display = 'block';
}

function hidePunktspielVideo(){
  punktspielLightbox.style.display = 'none';
  punktspielDemo.pause(); 
}
