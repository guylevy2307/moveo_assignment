var myArr = ["Audi", "BMW", "Ford", "Honda", "Jaguar", "Nissan"];
var song = ["Audi"];
var row = 1;
var playCount = 0, pauseCount = 0, loopCount = 0;
function showContent() {

    $('#template')
        .clone()                               // CLONE THE TEMPLATE
        .attr('id', 'row' + (row++))          // MAKE THE ID UNIQUE
        .appendTo($('#myTable tbody'))       // APPEND TO THE TABLE
        .css("background-color", "yellow")  //CHANGE BACKGTOUND COLOR
        .show();                           // SHOW IT

}

function play() {
    if (song.length == 0) {
        alert("No Songs to play!")
    }
    else {
        if (playCount == 1) {
            alert("already play...")
        }
        if (playCount == 0) {
            $('#playSpan').text("on")
            $('#pauseSpan').text("off")
            playCount = 1;
            pauseCount = 0;

        }

    }

}

function pause() {
    if (playCount == 0) {
        alert("You didnt play!")

    } else if (playCount == 1 && pauseCount == 0) {
        $('#playSpan').text("off")
        $('#pauseSpan').text("on")
        pauseCount = 1;
        playCount = 0;
    } else if (playCount == 0 && pauseCount == 1) {
        alert("already pause...");
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