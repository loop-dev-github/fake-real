// get a random number between {min} and {max}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// URLs for fake and real pictures 
function realPic(){
  const id = random(10000, 70000);
  return `https://whichfaceisreal.blob.core.windows.net/public/realimages/${id}.jpeg`;
}
const fakePic = "https://thispersondoesnotexist.com/"

function game() {
  
  // * core variables
  // {imagesCon} is where both the images will sit
  const imagesCon = document.getElementById("images");
  // {resultCon} is where the answer feedback will sit
  const resultCon = document.getElementById("result");
  // {streakCon} is where the streak score will sit
  const streakCon = document.getElementById("streak");
  // {streak} is the current streak of the player
  let streak = 0;
  
  // use {draw} to generate new images
  function draw() {
    // clear children to start fresh each time
    imagesCon.innerHTML = "";
    resultCon.innerHTML = "";
    
    // make {imagesCon} clickable
    imagesCon.style.pointerEvents = "auto"
    
    // prepare play again button
    const again = document.createElement("button");
    again.textContent = "Play again!"
    again.onclick = draw;
    
    // prepare answer function
    function answer(real) {
      resultCon.textContent = real ? "You are Correct! " : "You are Incorrect :( ";
      streak = real ? streak + 1 : 0;
      streakCon.innerHTML = "Streak: " + streak;
    }
    
    // random array
    const randomBool = Math.random() > 0.5;
    const arr = [randomBool, !randomBool]
    for (const isReal of arr) {
      // create img from each loop
      const img = document.createElement("img");
      img.src = isReal ? realPic() : fakePic;
      img.onclick = function() {
        // make {imagesCon} non clickable to prevent cheating
        imagesCon.style.pointerEvents = "none"
        resultCon.textContent = isReal ? "You are Correct! " : "You are Incorrect :( ";
        streak = isReal ? streak + 1 : 0;
        streakCon.innerHTML = "Streak: " + streak;
        // show the {again} button after a click
        resultCon.appendChild(again);
      }
      // remember to put the new {img} in {imagesCon}
      imagesCon.appendChild(img);
    }
  }
  // remember to run {draw} the first time
  draw()
}

// start the game on load
game()
