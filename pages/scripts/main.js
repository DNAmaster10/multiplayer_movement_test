var c = document.getElementById("mian_game_canvas");
var ctx = c.getContext("2d);
$.ajax({
        url: './send_message_handle.php',
        type: "POST",
        data: {message:input_message},
        success: function(data) {
            console.log(data);
            slideIn();
        }
});
function draw() {

}
setInterval(draw, 10);
