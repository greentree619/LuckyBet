// Time to use some industrial.js!
// This is where we'll initialize our components, 
// and change values with a small value simulator.

// Simulate data every 5 seconds
$(document).ready(function () {
    $(".industrial").industrial({});
    words = ["good", "evil", "money", "INT", "JS", "lisp", "C++", "C", "java", "nomer", "0xDE", "YAY!", "anims", "death", "BTC"];

    setInterval(function () {
        $(".industrial.thermometer").each(function () {
            $(this).industrial(Math.floor(Math.random() * 100));
        });
    }, 4000);

});