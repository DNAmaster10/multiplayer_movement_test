var c = document.getElementById("main_game_canvas");
var ctx = c.getContext("2d");
var player_x = 10;
var player_y = 10;
var total_positions = 4;
var positions_array = [];
var interpolate_array = [];
var get_loop = 0;
var transition_x = 0;
var transition_y = 0;
var temp = "";
var current_interpolate_position_array = [];
//get_delay is multiplied by loop_delay
var get_delay = 100;
var loop_delay = 10;
var temp_array = [];
var temp_array_2 = [];
var temp = "null";
var old_positions_array = [];
var new_x = 0;
var new_y = 0;
var interpolation_ammount = [0,0]
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
    interpolation_ammount = [];
    for (let i = 0; i < total_positions -1; i++) {
        var this_old_pos_array = old_positions_array[i].split(",");
        var this_new_pos_array = positions_array[i].split(",");
        var this_old_x = parseInt(this_old_pos_array[0]);
        var this_old_y = parseInt(this_old_pos_array[1]);
        var this_new_x = parseInt(this_new_pos_array[0]);
        var this_new_y = parseInt(this_new_pos_array[1]);
        var change_in_x = (this_new_x - this_old_x);
        var change_in_y = (this_new_y - this_old_y);
        var average_change_in_x = (change_in_x) / get_delay;
        average_change_in_x = Math.round(average_change_in_x);
        var average_change_in_y = (change_in_y) / get_delay;
        average_change_in_y = Math.round(average_change_in_y);
        var change_in_x_change_in_y_average = String(average_change_in_x) + "," + String(average_change_in_y);
        interpolation_ammount.push(change_in_x_change_in_y_average);
    }
    console.log(interpolation_ammount);
}
function move_others() {
    for (let i = 0; i < total_positions - 1; i++) {
        var this_interpolation_ammount = interpolation_ammount[i].split(",");
        var this_interpolation_x = parseInt(this_interpolation_ammount[0]);
        var this_interpolation_y = parseInt(this_interpolation_ammount[1]);
        var this_pos = positions_array[i].split(",");
        var this_pos_x = parseInt(this_pos[0]);
        var this_pos_y = parseInt(this_pos[1]);
        var this_new_pos_x = this_pos_x + this_interpolation_x;
        var this_new_pos_y = this_pos_y + this_interpolation_y;
        var this_new_pos = String(this_pos_x) + "," + String(this_pos_y);
        positions_array[i] = this_new_pos;
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.rect(this_new_pos_x,this_new_pos_y,10,10);
        ctx.stroke();
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
        current_position_array = positions_array[i].split(",");
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
