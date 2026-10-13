const mastermindDemo = document.getElementById("MastermindDemo");
const mastermindLightbox = document.getElementById('mastermindLightbox');
const mastermindClose = document.getElementById('mastermind-close');
//initialize

function showMasterMindVideo(){
  mastermindLightbox.style.display = 'block';
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
