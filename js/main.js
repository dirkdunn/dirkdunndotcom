(function(){
  vex.defaultOptions.className = 'vex-theme-flat-attack';
  var fibSection = document.querySelector('.fib'),
  fibSeq = [0,1],
  fibIndex = 0,
  fibInterval = 300,
  fibLength = 100,
  fibRunning = true,
  fib,

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
  turnRobotRed = function(el){
    var powerbar = el.querySelectorAll('.powerbar');
    powerbar[0].style.fill = 'rgb(202, 43, 43)';
    powerbar[1].style.fill = 'rgb(176, 36, 36)';

  },
  turnRobotGreen = function(el){
    var powerbar = el.querySelectorAll('.powerbar');
    powerbar[0].style.fill = 'rgb(43, 202, 68)'
    powerbar[1].style.fill = 'rgb(40, 176, 36)'
  },

  fibGenerator = function(){
    fib = setInterval(function(){
      var nextFib = fibSeq[fibSeq.length-1] + fibSeq[fibSeq.length-2];
      fibSeq.push(nextFib);
      fibIndex++;
      fillFib();

      if(fibSeq.length > fibLength){
        fibSeq.splice(0,1);
      }
      // console.log('pushing..', generateColor() ,typeof fibSeq[fibIndex], fibSeq[fibIndex])
    }, fibInterval)
  },
  setHandlers = function(){
    document.querySelector('.projects').addEventListener('mousedown',function(e){
      vex.dialog.alert({
          message: 'Projects Here',
      })
    });

    document.querySelector('.button.resume').addEventListener('mousedown',function(e){
      vex.dialog.alert({
          message: 'Would you like to download or view it in browser?',
          input:[
            '<div class="resume-options">',
              '<a href="#" class="button browser-view">Browser</a>',
              '<a href="#" class="button download-resume">Download</a>',
            '</div>'
          ].join('')
      })
    });

    document.querySelector('#robot_container').addEventListener('mousedown',function(e){

      function tada(){
        var el = this,
          className = 'tada';
        if (el.classList)
          el.classList.add(className);
        else
          el.className += ' ' + className;

        setTimeout(function(){
          if (el.classList)
            el.classList.remove(className);
          else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },1000)
      }

      function toggleFib(){
        if(fibRunning){
          clearInterval(fib);
          fibRunning = false;
        } else {
          fibGenerator();
          fibRunning = true;
        }
      }

      tada.call(this);
      toggleFib();

    })

    document.querySelector('#robot_main').addEventListener('mouseover',function(e){
      if(fibRunning){
        turnRobotRed(this);
      } else {
        turnRobotGreen(this);
      }
    })

    document.querySelector('#robot_main').addEventListener('mouseout',function(e){
      if(fibRunning){
        turnRobotGreen(this);
      } else {
        turnRobotRed(this);
      }
    })

  };



  function main(){
    fibGenerator();
    setHandlers();
  }

  main();

})();
