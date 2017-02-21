(function(){
  var fibSection = document.querySelector('.fib'),
  fibSeq = [0,1],
  fibIndex = 0,
  fibInterval = 300,
  fibLength = 100,

  getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  generateColor = function(){
    var alphabet = ['A','B','C','D','E','F'],
    color = ['#'];

    for( var i=0;i<6;i++ ){
      var alphaChar = getRandomArbitrary(0,1);
      color.push(alphaChar ? alphabet[getRandomArbitrary(0,6)] : getRandomArbitrary(0,9))
    }

    return color.join('');
  },

  fillFib = function(){
    fibSection.innerHTML = "";
    for(var i = 0, length=fibSeq.length; i < length; i++){
      var newFib = document.createElement('span');
      newFib.style.color = generateColor();
      // newFib.className += String(i);
      newFib.innerHTML = fibSeq[i] + "&nbsp;"
      fibSection.appendChild(newFib);
    }
  },

  fibInterval = setInterval(function(){
    var nextFib = fibSeq[fibSeq.length-1] + fibSeq[fibSeq.length-2];
    fibSeq.push(nextFib);
    fibIndex++;
    fillFib();

    if(fibSeq.length > fibLength){
      fibSeq.splice(0,1);
    }
    // console.log('pushing..', generateColor() ,typeof fibSeq[fibIndex], fibSeq[fibIndex])
  }, fibInterval)


})();
