var c = document.getElementById("main_game_canvas");
var ctx = c.getContext("2d");
var player_x = 10;
var player_y = 10;
var total_positions = 4;
var positions_array = [0,0];
var get_loop = 0;
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
            positions_array = data.split(".");
            total_positions = positions_array.length;
        }
    });
}
document.addEventListener("keydown", (event) => {
    if(event.key === "w") {
        player_y = player_y - 5;
    }
    else if(event.key === "a") {
        player_x = player_x - 5;
    }
    else if(event.key === "s") {
        player_y = player_y + 5;
    }
    else if(event.key === "d") {
        player_x = player_x + 5;
    }
})
function move_down() {
    player_y = player_y - 10;
}
function move_player() {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.rect(player_x, player_y, 10, 10);
    ctx.stroke();
}
function send_player() {
    $.ajax({
        url: './send_position.php',
        type: "GET",
        data: {player_x:player_x, player_y:player_y}
    });
}
function main_game_loop() {
    ctx.clearRect(0,0,c.width,c.height);
    move_player();
    get_loop = get_loop + 1;
    if (get_loop == 10) {
        get_positions();
        for (let i = 0; i < total_positions; i++) {
            var temp_array = positions_array[i];
            current_position_array = temp_array.split(",");
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.rect(current_position_array[0],current_position_array[1],10,10);
            ctx.stroke();
        }
        get_loop = 0;
    }
    send_player();
    ctx.stroke();
    console.log(get_loop);
}
setInterval(main_game_loop, 10);
