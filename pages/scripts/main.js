var c = document.getElementById("main_game_canvas");
var ctx = c.getContext("2d");
var player_x = 10;
var player_y = 10;
var total_positions = 4;
var positions_array = [0,0];
var interpolate_array = [0,0];
var get_loop = 0;
var transition_x = 0;
var transition_y = 0;
var temp = "";
var current_interpolate_position_array = [];
//get_delay is multiplied by loop_delay
var get_delay = 2;
var loop_delay = 500;
var temp_array = [];
var temp_array_2 = [];
var temp = "null";
var old_positions_array = [];
$.ajax({
        url: './get_positions.php',
        type: "GET",
        success: function(data) {

        }
});
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
function get_positions() {
    $.ajax({
        url: './get_positions.php',
        type: "GET",
        success: function(data) {
            old_positions_array = positions_array;
            positions_array = data.split(".");
            total_positions = positions_array.length;
        }
    });
}
function interpolate_calculate() {
    interpolate_array = [];
    for (let i = 0; i < total_positions; i++) {
        temp_array = old_positions_array[i].split(",");
        temp_array_2 = positions_array[i].split(",");
        dx = (temp_array_2[0] - temp_array[0]);
        dy = (temp_array_2[1] - temp_array[1]);
        temp = dy + "," + dx;
        interpolate_array.push(temp);
        console.log("Interpolate array: " + interpolate_array);
    }
}
function move_others() {
    for (let i = 0; i < total_positions; i++) {

    }
}
function main_game_loop() {
    ctx.clearRect(0,0,c.width,c.height);
    move_player();
    get_loop = get_loop + 1;
    if (get_loop == get_delay) {
        get_loop = 0;
        console.log("getting players positions");
        get_positions();
        interpolate_calculate();
        send_player();
    for (let i = 0; i < total_positions; i++) {
        var temp = positions_array[i];
        current_position_array = temp.split(",");
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.rect(current_position_array[0],current_position_array[1],10,10);
        ctx.stroke();
        }
    }
    move_others();
    ctx.stroke();
}
setInterval(main_game_loop, loop_delay);
