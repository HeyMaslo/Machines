window.HTML5PRO = window.HTML5PRO || {};
HTML5PRO.APPS = HTML5PRO.APPS || {};

YUI().use(['node'], function (Y) {

  HTML5PRO.APPS.Radio = function () {

    var audio,
        audioChiado,
        audioList = Y.one('audio'),
        audioContainner = Y.one('#audio_containner'),
        audioSource,
        volumeAudio = 1,
        anguloAtual = 0,
        anguloInicial = null,

        tuner = Y.one(".tuner .controllerCont"),
        tunerRotElement = Y.one(".tuner .controller"),
        tunerCenterX = tuner.getXY()[0] + (tuner._node.offsetWidth / 2),
        tunerCenterY = tuner.getXY()[1] + (tuner._node.offsetHeight / 2),
        tunerDown = false,

        numChannels = 10,
        displayWidth = 230,
        channel = 88.0,
        audios = {},
        volume = {},

        pointer = Y.one(".pointer"),
        pointerPosInicial = 0,
        pointerPosFinal = 227,

        volume = Y.one(".volume .controllerCont"),
        volumeRotElement = Y.one(".volume .controller"),
        volumeCenterX = volume.getXY()[0] + (volume._node.offsetWidth / 2),
        volumeCenterY = volume.getXY()[1] + (volume._node.offsetHeight / 2),
        volumeDown = false,

        volumeAnguloAtual = 0,
        volumeAnguloInicial = null,

        // blockMove = 0,
        playing = false;

    bind = function() {

      Y.one(".on-off").on('click', onOff);

      Y.one('doc').on('keydown', function(e) { if (e.keyCode == 32) onOff(e);});

      Y.one(".global-radio").on('mouseup', function(e) {
        volumeDown = false;
        volumeAnguloInicial = null;
        anguloInicial = null;
        blockMove = 0;
      });

      // --- Volume --- //

      volume.on('mousedown', function(e) {

        volumeDown = true;

        var self = this,
            anguloEmRadianos = Math.atan2(volumeCenterY - e.pageY, volumeCenterX - e.pageX);

        volumeAnguloInicial = (anguloEmRadianos * (180 / Math.PI)) - volumeAnguloAtual;

      });

      volume.on('mousemove', function(e) {

        if (volumeAnguloInicial !== null) {

          var self = this,
              anguloEmRadianos = Math.atan2(volumeCenterY - e.pageY, volumeCenterX - e.pageX),
              anguloRelativo = anguloEmRadianos * (180 / Math.PI),
              anguloTemp = volumeAnguloAtual;

          volumeAnguloAtual = (volumeAnguloInicial * 0) + (anguloRelativo - volumeAnguloInicial);

          var angTemp = (anguloTemp - volumeAnguloAtual);

          //mantem o angulo entre 0 e 360
          if (volumeAnguloAtual < 0) {
            volumeAnguloAtual += 360;
          }

          if (volumeAnguloAtual > 360) {
            volumeAnguloAtual -= 360;
          }

          if (volumeAnguloAtual < 90 && anguloTemp > 270 && blockMove != -1) {
              blockMove = 1;
              volumeAnguloInicial = null;
          }

          if (volumeAnguloAtual < 180 && anguloTemp < 270 && blockMove != 1) {
              blockMove =- 1;
              volumeAnguloInicial = null;
          }

          if (blockMove == -1) {
              volumeAnguloAtual = 180;
          }

          if (blockMove == 1) {
            volumeAnguloAtual = 360;
          }

          volumeAudio = (volumeAnguloAtual - 180) / 180;

          setVolume(volumeAudio);

          Y.one(volumeRotElement).setStyle("MozTransform", "rotate(" + volumeAnguloAtual + "deg)");
          Y.one(volumeRotElement).setStyle("webkitTransform", "rotate(" + volumeAnguloAtual + "deg)");
          Y.one(volumeRotElement).setStyle("transform", "rotate(" + volumeAnguloAtual + "deg)");
        }

      });

      // --- Tuner --- //

      tuner.on('mouseup', function (e) {
        tunerDown = false;
        anguloInicial = null;
      });

      tuner.on('mousedown', function (e) {

        tunerDown = true;

        var self = this,
            anguloEmRadianos = Math.atan2(tunerCenterY - e.pageY, tunerCenterX - e.pageX);

        anguloInicial = (anguloEmRadianos * (180 / Math.PI)) - anguloAtual;

      });

      tuner.on('mousemove', function (e) {

        if (anguloInicial !== null) {

          var self = this,
              anguloEmRadianos = Math.atan2(tunerCenterY - e.pageY, tunerCenterX - e.pageX),
              anguloRelativo = anguloEmRadianos * (180 / Math.PI),
              anguloTemp = anguloAtual;

          anguloAtual = (anguloInicial * 0) + (anguloRelativo - anguloInicial);
          var angTemp = (anguloTemp - anguloAtual);

          if (angTemp > 180) {
            angTemp -= 360;
          }
          if (angTemp < -180) {
            angTemp += 360;
          }

          pointerPosInicial += angTemp * -0.07;

          if (pointerPosInicial < 0) {
            anguloInicial=anguloRelativo;
            anguloTemp=anguloAtual=0;
            pointerPosInicial = 0;
          } else if (pointerPosInicial > pointerPosFinal) {
            anguloInicial=anguloRelativo;
            anguloTemp=anguloAtual=0;
            pointerPosInicial = pointerPosFinal;
          }

          pointer.setStyle("left", pointerPosInicial);

          Y.one(tunerRotElement).setStyle("MozTransform", "rotate(" + anguloAtual + "deg)");
          Y.one(tunerRotElement).setStyle("webkitTransform", "rotate(" + anguloAtual + "deg)");
          Y.one(tunerRotElement).setStyle("transform", "rotate(" + anguloAtual + "deg)");

          // calcula canal e ruido
          var newChannel = (88 + 2*(pointerPosInicial * 9)/ displayWidth).toFixed(1);

          if (newChannel != channel) {
            channel = newChannel;
            setVolume(volumeAudio);
          }
        }
      });
    };

    setVolume = function(vol){
      if (playing) {
        if (channel in volume) {
            audioChiado.volume = (1 - volume[channel]) * vol;
            audios[channel].volume = volume[channel] * vol;
        } else {
            audioChiado.volume = vol;
        }
      } else {
        audioChiado.volume = 0;
        if (channel in audios) {
            audios[channel].volume = 0;
        }
      }
    };

    onOff = function(e) {
        e.preventDefault();
        if (playing) {
          playing = false;
          setVolume(0);
          Y.one(".case").removeClass('on');
        } else {
          playing = true;
          setVolume(volumeAudio);
          Y.one(".case").addClass('on');
        }
        setVolume(volumeAudio);
    };

    return {

      init: function() {

        stations = [{freq:91.7, url:'http://129.25.22.28:8000/listen'},
                    {freq:88.5, url:'http://wxpnhi.streamguys.com/xpnhi'},
                    {freq:90.1, url:'http://pubint.ic.llnwd.net/stream/pubint_wrti2'}
        ]
        for (var i=0; i < stations.length; i++) {
          var station = stations[i]
          var newAudio = document.createElement('audio');
          newAudio.setAttribute('preload', 'auto');
          newAudio.innerHTML = '<source src="' + station.url + '" type="audio/mpeg">';
          audioContainner.appendChild(newAudio);
          newAudio.volume = 0;
          newAudio.play();
          audios[station.freq] = newAudio;
          for (var j = -0.5; j <= 0.5; j+=0.1){
            audios[(station.freq + j).toFixed(1)] = newAudio;
            volume[(station.freq + j).toFixed(1)] = 1*(1-Math.abs(j+j)).toFixed(1);
          }
        }

        audioChiado = document.getElementById("audio_chiado");
        audioSource = Y.one('#audio source');
        audioChiado.volume = 0;

        //loop
        audioChiado.addEventListener("ended", function(e){ e.target.play(); }, false);

        audioChiado.play();
        bind();
      }
    };
  };

  var radio = new HTML5PRO.APPS.Radio();
  radio.init();

});

