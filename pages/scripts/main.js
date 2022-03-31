var c = document.getElementById("main_game_canvas");
var ctx = c.getContext("2d");
var player_x = 10;
var player_y = 10;
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
document.addEventListener("keydown", function(e) {
    if(e.key === "w") {
        player_y = player_y - 10;
    }
    else if(e.key === "a") {
        player_x = player_x - 10;
    }
    else if(e.key === "s") {
        player_y = player_y + 10;
    }
    else if(e.key === "d") {
        player_x = player_x + 10;
    }
})
function move_player() {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.rect(player_x, player_y, 10, 10);
}
function send_player() {
    $.ajax({
        url: './get_positions.php',
        type: "GET",
        data: {player_x:player_x, player_y:player_y}
    });
}
function main_game_loop() {
    move_player();
    get_positions();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < total_positions; i++) {
        current_position_array = positions_array[i].split(",");
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.rect(current_position_array[0],current_position_array[1],10,10);
    }
    send_player();
    ctx.stroke();
}
setInterval(main_game_loop, 2000);
