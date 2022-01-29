var color = ["maroon", "purple", "yellow", "darkgreen", "aqua", "blueviolet", "chocolate", "crimson", "deeppink"];
var colorIndex = 0;
var row = 1;
var playCount = 0, stopCount = 0, loopCount = 0;
var nowPlay = [];
var flag = false;
var rowCount = 1;
var songMap = new Map();
function showContent() {
    nowPlay = []
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
        // playList.push(file.name);
        colorIndex++;
        rowCount++;
    }
    scanList();
    $('#myfile')[0].files = null;



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
        else if (playCount == 0) {
            //play songs
            $('#playSpan').text("on")
            $('#stopSpan').text("off")
            playCount = 1;
            stopCount = 0;
        }
        else if (playCount == 1) {
            //stop songs
            stopSong();
            $('#playSpan').text("off")
            playCount = 0;
            stopCount = 1;

        }
    }
    playSong()
}

function stop() {
    if (playCount == 0) {
        alert("You didnt play!")

    } else if (playCount == 1 && stopCount == 0) {
        //stop playing songs
        stopSong();
        $('#playSpan').text("off")
        $('#stopSpan').text("on")
        stopCount = 1;
        playCount = 0;
    } else if (playCount == 0 && stopCount == 1) {
        alert("already stopped.");
    }


}
function loop() {

    if (loopCount == 0) {
        $('#loopSpan').text("on")
        loopCount = 1;
        loopSong();
    }
    else {
        $('#loopSpan').text("off")
        loopCount = 0;
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
        songMap.set(fsName, audio);
        nowPlay.push(audio);
    }

}
function playSong() {
    if (songMap.size == 0) {
        alert("There aren't any songs...")
    }
    else {
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

        timeoutID = setTimeout(() => {
            $('#playSpan').text("on")
            playCount = 1;
            playSong();
            loopSong();
        }, 10);
    }
}
function loopSongStop() {
    if (songMap.size == 0) {
        alert("There aren't any songs...")
    }
    else {

        clearTimeout(timeoutID);
        stop();
    }

}

function muteSong(id) {
    number = id.replace('chk', '');
    fs = "#fileName" + number;
    var name = $(fs).text();
    var isChecked = $(id).is(':checked');
    var audio = songMap.get(name);
    if (!isChecked) {
        audio.muted = true

    }
    else {
        audio.muted = false

    }
    songMap.set(name, audio);
}