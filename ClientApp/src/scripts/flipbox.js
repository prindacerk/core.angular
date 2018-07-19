/**
 * Do the clicking stuff
 *
 */

(function () {
    var boxes = document.querySelectorAll(".flipbox.effect__click");
    for (var i = 0, len = boxes.length; i < len; i++) {
        var card = boxes[i];
        clickListener(card);
    }

    function clickListener(card) {
        card.addEventListener("click", function () {
            var c = this.classList;
            c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
        });
    }
})();

/**
 * Do the random stuff
 *
 */

(function () {

    // cache vars
    var boxes = document.querySelectorAll(".flipbox.effect__random");
    var timeMin = 1;
    var timeMax = 3;
    var timeouts = [];

    // loop through boxes
    for (var i = 0, len = boxes.length; i < len; i++) {
        var card = boxes[i];
        var cardID = card.getAttribute("data-id");
        var id = "timeoutID" + cardID;
        var time = randomNum(timeMin, timeMax) * 1000;
        boxesTimeout(id, time, card);
    }

    // timeout listener
    function boxesTimeout(id, time, card) {
        if (id in timeouts) {
            clearTimeout(timeouts[id]);
        }
        timeouts[id] = setTimeout(function () {
            var c = card.classList;
            var newTime = randomNum(timeMin, timeMax) * 1000;
            c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
            boxesTimeout(id, newTime, card);
        }, time);
    }

    // random number generator given min and max
    function randomNum(min, max) {
        return Math.random() * (max - min) + min;
    }

})();