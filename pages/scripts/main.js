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
            old_positions_array = positions_array;
            positions_array = data.split(".");
            current_interpolate_position_array = positions_array;
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
function interpolate_calculate() {
    old_positions_array[i];
    interpolate_array = [];
    for (let i = 0; i < total_positions; i++) {
        temp_array = old_positions_array.split(",");
        var temp_array_2 = positions_array[i].split(",");
        transition_x = (temp_array_2[0] - temp_array[0]) / get_delay;
        transtion_y = (temp_array_2[1] - temp_array[1]) / get_delay;
        console.log(transition_x);
        console.log(transition_y);
        temp = transition_x.toString() + "," + transition_y.toString();
        interpolate_array.push(temp);
        console.log(interpolate_array);
    }
}
function move_others() {
    for (let i = 0; i < total_positions; i++) {
        temp_array = current_interpolate_position_array[i].split(",");
        temp = interpolate_array[i];
        console.log(temp);
        console.log(interpolate_array);
        temp_array_2 = temp.split(",");
        temp_array[0] = temp_array[0] + temp_array_2[0];
        temp_array[1] = temp_array[1] + temp_array_2[1];
        current_interpolate_position_array[i] = temp_array[0] + "," + temp_array[1];
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.rect(current_interpolate_position_array[0],current_interpolate_position_array[1],10,10);
        ctx.stroke();
        console.log(current_interpolate_position_array);
    }
}
function main_game_loop() {
    ctx.clearRect(0,0,c.width,c.height);
    move_player();
    get_loop = get_loop + 1;
    if (get_loop == get_delay) {
        get_positions();
        interpolate_calculate();
        send_player();
        get_loop = 0;
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
