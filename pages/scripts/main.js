var c = document.getElementById("mian_game_canvas");
var ctx = c.getContext("2d);
$.ajax({
        url: './get_positions.php',
        type: "GET",
        success: function(data) {

        }
});
function get_positions() {
    $.ajax({
        url: './get_positions.php',
        type: "GET",
        success: function(data) {
            var positions_array = data.split(".");
            var total_positions = positions_array.length;
        }
    });
}
function draw_player() {

}
function send_player() {

    $.ajax({
        url: './get_positions.php',
        type: "GET",
        data: {player_pos_x:player_pos_x, player_pos_y:player_pos_y}.
        success: function(data) {
            var positions_array = data.split(".");
            var total_positions = positions_array.length;
        }
    });
}
function draw() {
    get_positions();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < total_positions; i++) {
        current_position_array = positions_array[i].split(",");
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.rect(current_position_array[0],current_position_array[1],10,10);
        ctx.stroke();
    }
    draw_player();
    send_player();
}
setInterval(draw, 10);
