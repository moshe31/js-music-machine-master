document.addEventListener("DOMContentLoaded", function (event) {
  const pianoKeySounds = [
    {
      keyCode: 76,
      keyTrigger: "L",
      display: "B5",
      url: "https://www.dropbox.com/s/5ay0lnxgv192ol8/B5.mp3?raw=1",
      id: "wk-1"
    },
    {
      keyCode: 75,
      keyTrigger: "K",
      display: "A5",
      url: "https://www.dropbox.com/s/zfru1g2fqeswo2r/A5.mp3?raw=1",
      id: "wk-2",
    },
    {
      keyCode: 74,
      keyTrigger: "J",
      display: "G5",
      url: "https://www.dropbox.com/s/7mu8z9qg1qhd96z/G5.mp3?raw=1",
      id: "wk-3"
    },
    {
      keyCode: 72,
      keyTrigger: "H",
      display: "F5",
      url: "https://www.dropbox.com/s/usab3r9jc89jpb1/F5.mp3?raw=1",
      id: "wk-4"
    },
    {
      keyCode: 79,
      keyTrigger: "O",
      display: "A#5",
      url: "https://www.dropbox.com/s/3xggi1qws6iu5uh/As5.mp3?raw=1",
      id: "bk-1"
    },
    {
      keyCode: 73,
      keyTrigger: "I",
      display: "G#5",
      url: "https://www.dropbox.com/s/ed0b1wcjam9y6yo/Gs5.mp3?raw=1",
      id: "bk-2"
    },
    {
      keyCode: 85,
      keyTrigger: "U",
      display: "F#5",
      url: "https://www.dropbox.com/s/643oifp4rqznf05/Fs5.mp3?raw=1",
      id: "bk-3"
    }
  ];

  const padSounds = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      display: "Kick",
      url: "https://www.dropbox.com/s/e3aupywjj6nlclx/kick.mp3?raw=1",
      id: "pad-1"
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      display: "Snare",
      url: "https://www.dropbox.com/s/c6yf5n05lsgglhd/snare.mp3?raw=1",
      id: "pad-2",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      display: "Hi-Hat",
      url: "https://www.dropbox.com/s/d8mvp7doaigyvmj/hi-hat.mp3?raw=1",
      id: "pad-3"
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      display: "OpenHH",
      url: "https://www.dropbox.com/s/m0ov2ilfh98rohb/long-hi-hat.mp3?raw=1",
      id: "pad-4"
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      display: "T-Snare",
      url: "https://www.dropbox.com/s/w1hjm0rjn10xziu/808-tight-snare.mp3?raw=1",
      id: "pad-5"
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      display: "Sample",
      url: "https://www.dropbox.com/s/sk90qk6kpai9d6g/riff.mp3?raw=1",
      id: "pad-6"
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      display: "Drums-Stomp",
      url: "https://www.dropbox.com/s/r6ml8598cqyvy46/drums-stomp.mp3?raw=1",
      id: "pad-7"
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      display: "Mix Loop 1",
      url: "https://www.dropbox.com/s/y9gthdejo3gx61c/mix-loop-1.mp3?raw=1",
      id: "pad-8"
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      display: "Mix Loop 2",
      url: "https://www.dropbox.com/s/wkjy7m152vrst2g/mix-loop-2.mp3?raw=1",
      id: "pad-9"
    }
  ];
  var init = false;


  var pianoElements = document.getElementById('piano-keys').childNodes;
  var drumPadElements = document.getElementById('drum-machine').childNodes;

  [...pianoElements].map(function (x, i) {
    x.onmousedown = function () { playSound(pianoKeySounds[i].keyTrigger, pianoKeySounds[i].id, pianoKeySounds[i].display, 'keydown'); };
    x.onmouseup = function () { playSound(pianoKeySounds[i].keyTrigger, pianoKeySounds[i].id, pianoKeySounds[i].display, 'keyup'); };

    var sound = document.createElement('audio');
    sound.id = pianoKeySounds[i].keyTrigger;
    sound.src = pianoKeySounds[i].url;
    sound.class = 'clip';
    x.appendChild(sound);
  });

  drumPadElements = [...drumPadElements].filter(function (y, i) {
    if (y.id === 'pad-' + i) {
      return y;
    }
  });

  drumPadElements.map(function (z, i) {
    z.classList.add("drum-pad");
    z.onmousedown = function () { playSound(padSounds[i].keyTrigger, padSounds[i].id, padSounds[i].display, 'keydown'); };
    z.onmouseup = function () { playSound(padSounds[i].keyTrigger, padSounds[i].id, padSounds[i].display, 'keyup'); };

    var sound = document.createElement('audio');
    sound.id = padSounds[i].keyTrigger;
    sound.src = padSounds[i].url;
    sound.class = 'clip';
    z.appendChild(sound);

  });

  function playSound(key, id, disp, e) {

    if (init) {
      var sound = document.getElementById(key);
      if (e === 'keydown') {
        if (sound.currentTime === 0) {
          sound.play();
          displayKey(disp);
        }

      } else {
        sound.currentTime = 0;
        sound.pause();
      }
      if(id.indexOf('p') !== -1){
        padKeyPressState(id, e);
        
      }else {
        pianoKeyPressState(id, e);
        
      }
      
    }
  }

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('touchstart', handleKeyDown);
  document.addEventListener('touchend', handleKeyUp);

  function handleKeyDown(e) {
    
  if (init) {
    var piano = pianoKeySounds.filter((x) => x.keyCode === e.keyCode || e.target.parentNode.id === x.id);
    if (piano.length !== 0) {
      piano = piano[0];
      if (piano.keyCode === e.keyCode || e.target.parentNode.id === piano.id) {
        playSound(piano.keyTrigger, piano.id, piano.display, 'keydown');
      }
    } else {
      var pad = padSounds.filter((y) => y.keyCode === e.keyCode || e.target.parentNode.id === y.id);
      if (pad.length !== 0) {
        pad = pad[0];
        if (pad.keyCode === e.keyCode || e.target.parentNode.id === pad.id) {
          playSound(pad.keyTrigger, pad.id, pad.display, 'keydown');
        }
      }
    }
  }
}

  function handleKeyUp(e) {
    if (init) {
      var piano = pianoKeySounds.filter((x) => x.keyCode === e.keyCode);
    if (piano.length !== 0) {
      piano = piano[0];
      if (piano.keyCode === e.keyCode || e.target.parentNode.id === piano.id) {
        playSound(piano.keyTrigger, piano.id, piano.display, 'keyup');
      }
    } else {
      var pad = padSounds.filter((y) => y.keyCode === e.keyCode);
      if (pad.length !== 0) {
        pad = pad[0];
        if (pad.keyCode === e.keyCode || e.target.parentNode.id === pad.id) {
          playSound(pad.keyTrigger, pad.id, pad.display, 'keyup');
        }
      }
     }
    }
  }

  document.getElementById('button').onclick = function () { letsPlay() };
  function letsPlay() {
    init = true;
    document.getElementById('elements').classList.add('active');
    beginAnimation();

  }
  function beginAnimation() {
    document.getElementById('elements').classList.add('piano-animation');

    var text = document.getElementById('text');
    text.style.transform = 'translateY(155px)';
    text.style.opacity = 0;

    var button = document.getElementById('button');
    button.style.transform = 'translateY(155px)';
    button.style.opacity = 0;

    var keyText = document.getElementsByTagName('text');
    for (let i = 0; i < keyText.length; i++) {
      keyText[i].style.fillOpacity = 1;
    }
    //White Keys path data
    const pathData = [
      "M536.41,34a19.26,19.26,0,0,0-3.48-11.08l-346.65-.3V100.9h350.1c0-.25,0-.49,0-.74Z",
      "M532.95,22.93c-.16-.24-.35-.48-.55-.73a27.08,27.08,0,0,0-4.33-4.08l-.05,0a10.65,10.65,0,0,0-2.41-1.35,23.77,23.77,0,0,0-7.15-1.54H186.28v7.44l346.65.3Z",
      "M186.28,100.9v18.26H520.82a16.75,16.75,0,0,0,10.08-5.47,22.26,22.26,0,0,0,3.37-4.66,20.49,20.49,0,0,0,2.14-5.92V100.9H186.28Z",
      "M536.41,213V146.84a19.24,19.24,0,0,0-3.85-11.58L186.28,135v78.77h350.1C536.39,213.49,536.41,213.25,536.41,213Z",
      "M536.41,213.73H186.28V232H520.82a16.75,16.75,0,0,0,10.08-5.47,22.27,22.27,0,0,0,3.37-4.66,20.49,20.49,0,0,0,2.14-5.93Z",
      "M532.95,135.26a24,24,0,0,0-4.93-4.85c-2.91-2.24-7.91-2.8-9.56-2.89H186.28V135l346.29.3Z",
      "M536.41,325V258.85a19.24,19.24,0,0,0-3.73-11.42l-346.41-.3v78.61h350.1C536.39,325.5,536.41,325.26,536.41,325Z",
      "M536.41,325.74H186.28V344H520.82a16.75,16.75,0,0,0,10.08-5.47,22.27,22.27,0,0,0,3.37-4.66,20.49,20.49,0,0,0,2.14-5.93Z",
      "M532.95,247.43a24,24,0,0,0-4.93-4.85c-2.91-2.24-7.91-2.8-9.56-2.89H186.28v7.44l346.41.3Z",
      "M536.41,371.46a19.23,19.23,0,0,0-3.53-11.12H186.28v77.41H536.41s0-.09,0-.14Z",
      "M186.28,437.75V456H520.82a16.75,16.75,0,0,0,10.09-5.47,22.26,22.26,0,0,0,3.37-4.66,20.5,20.5,0,0,0,2.14-5.93v-2.21H186.28Z",
      "M533,360.34A23.38,23.38,0,0,0,528,355.8c-2.91-2.24-7.91-2.8-9.57-2.89H186.28v7.44H533Z"
    ];
    const textPosition = [
      "translate(524.5 69.56) rotate(-90)", "translate(524.5 181.46) rotate(-90)", "translate(524.5 294.97) rotate(-90)", "translate(524.5 408.48) rotate(-90)"
    ];
    var whiteKey = document.getElementById('piano-keys').childNodes;
    var num = 0;
    var t = 0;
    for (let i = 1; i <= 4; i++) {
      var whiteKey = document.getElementById('wk-' + i).childNodes;
      //console.log(whiteKey);

      [...whiteKey].map(function (x) {

        if (x.hasAttribute("d")) {
          x.setAttribute("d", pathData[num]);
          //console.log(pathData);
          num++;
        } else if (x.hasAttribute("transform")) {
          x.setAttribute("transform", textPosition[t]);
          t++;
        }
      })

    }
  }

  function pianoKeyPressState(id, e) {
    var key = document.getElementById(id);

    if (id.indexOf('w') === 0) {
      if (e === 'keydown') {

        key.style.transform = "scaleX(0.90)";
        var fill = key.childNodes;
        fill[0].style.fill = "#f1ecec";

      } else {
        key.style.transform = "scaleX(1)";
        var fill = key.childNodes;
        fill[0].style.fill = "#fff";
      }

    } else if (id.indexOf('b') === 0) {
      if (e === 'keydown') {

        key.style.transform = "scaleX(0.95)";
        var fill = key.childNodes;
        fill[0].style.fill = "rgb(53, 51, 51)";

      } else {
        key.style.transform = "scaleX(1)";
        var fill = key.childNodes;
        fill[0].style.fill = "rgb(67, 63, 63)";
      }
    }
  }

  function padKeyPressState(id, e){
    var key = document.getElementById(id);
    num = parseFloat(id.split('pad-').join(''));
    num = num + 1;
      if (e === 'keydown') {
        var fill = key.childNodes;
        fill[0].style.fill = "rgb(255, 168, 91)";
        fill[0].style.width = "32px";
        fill[0].style.height = "32px";
        speakerBounce();
      }

      if (e === 'keyup') {
        var fill = key.childNodes;
        fill[0].style.width = "33.61px";
        fill[0].style.height = "32.91px";
        fill[0].style.fill = "url(#radial-gradient-"+num+")";
      }
    }
  
  function displayKey(disp) {
    var display = document.getElementById('display').childNodes;
    [...display][3].textContent = disp;
  }
  function speakerBounce() {
    document.getElementById('inner-speaker').style.transform = "scale(1.020)";
    setTimeout(function () {
      document.getElementById('inner-speaker').style.transform = "scale(1)";
    }, 100);
  }
});