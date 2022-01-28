var myArr = ["Audi", "BMW", "Ford", "Honda", "Jaguar", "Nissan"];

function showContent() {
    var temp, item, a, i;
    temp = document.getElementsByTagName("template")[0];
    //get the div element from the template:
    item = temp.content.querySelector("div");
    //for each item in the array:
    for (i = 0; i < myArr.length; i++) {
        //Create a new node, based on the template:
        a = document.importNode(item, true);
        //Add data from the array:
        a.textContent += myArr[i];
        // adding background
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";

        a.style.background = bgColor;
        //append the new node wherever you like:
        document.getElementsByTagName("table").appendChild(a);
    }
}