var color = ["maroon", "purple", "yellow", "darkgreen", "aqua", "blueviolet", "chocolate", "crimson", "deeppink"];
var colorIndex = 0;
var row = 1;
var playCount = 0, stopCount = 0, loopCount = 0;
var rowCount = 1;
//
var songMap = new Map();
function showContent() {

    var i = 0;
    var curFiles = $('#myfile')[0].files;
    for (; i < curFiles.length; i++) {
        var file = curFiles[i];
        $('#template')
            .clone()                                                       // CLONE THE TEMPLATE
            .attr('id', 'row' + (row++))                                  // MAKE THE ID UNIQUE
            .appendTo($('#myTable tbody'))                               // APPEND TO THE TABLE
            .css("background-color", color[colorIndex % color.length])  //CHANGE BACKGTOUND COLOR
            .show();                                                   // SHOW IT
        var place = '#row' + (row - 1) + "> #fileName"
        $(place).text(file.name);
        $(place).attr('id', 'fileName' + (row - 1));
        $('#myTable tbody tr:eq(' + (row - 1) + ') input:checkbox').attr('id', 'chk' + (row - 1));
        colorIndex++;
        rowCount++;

    }
    scanList();
    timeCalc();
    slider();
    // $('#myfile')[0].files = null;



}

function play() {
    scanList();
    if (songMap.size == 0) {
        alert("No Songs to play!")
    }
    else {
        if (playCount == 1) {
            alert("already play...")
        }
        else if (playCount == 0 || (playCount == 1 && stopCount == 0)) {
            //play songs
            playSong();
        }



    }
}
function stop() {
    if (playCount == 0) {
        alert("You didnt play!")

    }
    else if (playCount == 1 && stopCount == 0) {
        //stop playing songs
        stopSong();


    } else if (playCount == 0 && stopCount == 1) {
        alert("already stopped.");
    }
    if (loopCount == 1) { loopSongStop() }

}
function loop() {

    if (loopCount == 0) {

        loopSong();
    }
    else {
        loopSongStop();

    }

}


function scanList() {

    var i = 0;

    for (; i < rowCount - 1; i++) {
        var row = "#row" + (i + 1);
        fs = '#fileName' + (i + 1);
        fsName = $(fs).html();
        var audio = new Audio("./sounds/" + fsName);
        //audio update the current time
        if (i == 0) {
            seekSlider = document.getElementById('seek-slider');
            audio.addEventListener('timeupdate', () => {
                var time = (audio.currentTime);
                seekSlider.value = time;
                text = $("#current-time").text();
                $("#current-time").text("0:" + Math.round(time));
                console.log(time)

            }, false);
        }
        //if song mute turn volume down
        id = "chk" + (i + 1);
        var isChecked = document.getElementById(id).checked;
        if (isChecked) {
            audio.volume = 0;

        }
        else {
            audio.volume = 1;

        }
        songMap.set(fsName, audio);

    }

}
function playSong() {
    if (songMap.size == 0) {
        alert("There aren't any songs...")
    }
    else {
        $('#playSpan').text("on")
        $('#stopSpan').text("off")
        playCount = 1;
        stopCount = 0;
        for (let [key, value] of songMap.entries()) {

            value.play();

        }
    }
}
function stopSong() {
    if (songMap.size == 0) {
        alert("There aren't any songs...")
    }
    else {
        $('#playSpan').text("off")
        $('#stopSpan').text("on")
        stopCount = 1;
        playCount = 0;
        for (let [key, value] of songMap.entries()) {
            value.pause();
            value.currentTime = 0;
        }

    }
}
function loopSong() {
    if (songMap.size == 0) {
        alert("There aren't any songs...")
    }
    else {
        $('#loopSpan').text("on")
        loopCount = 1;
        timeoutID = setTimeout(() => {
            if (palyCount == 1) { playSong(); }
            if (loopCount == 1 && $("#seek-slider").value == "0:18") { resetSlider(); }
            loopSong();
        }, 0);
    }

}
function loopSongStop() {
    if (songMap.size == 0) {
        alert("There aren't any songs...")
    }
    else {
        loopCount = 0;
        $('#loopSpan').text("off")
        clearTimeout(timeoutID);
    }

}

function muteSong(id) {
    number = id.replace('chk', '');
    fs = "#fileName" + number;
    var name = $(fs).text();
    var isChecked = document.getElementById(id).checked;
    var audio = songMap.get(name);
    if (isChecked) {
        audio.volume = 0;

    }
    else {
        audio.volume = 1;

    }
    songMap.set(name, audio);
}


function timeCalc() {
    durationContainer = document.getElementById('duration');
    //set the time 
    durationContainer.textContent = "0:18";
}
function slider() {
    $("#audio-player-container").css("display", "block");
    var name = $("#fileName1").text();
    var audio = songMap.get(name);
    //set the function to the slider
    seekSlider = document.getElementById('seek-slider');
    /*  audio.addEventListener('timeupdate', () => {
          console.log("hi")
          seekSlider.value = audio.currentTime;
      }, false);*/
    seekSlider.addEventListener('change', () => {
        //change the song time
        for (let [key, value] of songMap.entries()) {

            value.currentTime = seekSlider.value;

        }

    });

}
function resetSlider() {
    $("#seek-slider").val(0);
}

