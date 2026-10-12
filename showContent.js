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
