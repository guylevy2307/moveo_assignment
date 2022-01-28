var color = ["maroon", "purple", "yellow", "darkgreen", "aqua", "blueviolet", "chocolate", "crimson", "deeppink"];
var colorIndex = 0;
var row = 1;
var playList = []
var playCount = 0, stopCount = 0, loopCount = 0;
var nowPlay = [];
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
        playList.push(file.name)
        colorIndex++;
    }





}

function play() {
    if (playList.length == 0) {
        alert("No Songs to play!")
    }
    else {
        if (playCount == 1) {
            alert("already play...")
        }
        if (playCount == 0) {
            //play songs
            $('#playSpan').text("on")
            $('#pauseSpan').text("off")
            playCount = 1;
            stopCount = 0;
            scanList();
        }

    }

}

function stop() {
    if (playCount == 0) {
        alert("You didnt play!")

    } else if (playCount == 1 && stopCount == 0) {
        //stop playing songs
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
    }
    else {
        $('#loopSpan').text("off")
        loopCount = 0;

    }

}


function scanList() {

    var i = 0, j = 0;
    for (; i < playList.length; i++) {
        var row = "#row" + (i + 1) + "> #mute> #cd";
        var cb = $(row).is(":checked")
        if (!cb) {

            var audio = new Audio("./sounds/" + playList[i]);
            nowPlay.push(audio);
            nowPlay[j].play();
            j++;

        }

    }

}