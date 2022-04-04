var c = document.getElementById("main_game_canvas");
var ctx = c.getContext("2d");
//This is multiplied by the main game loop delay
var get_request_delay = 3;
var main_game_loop_delay = 1000;
var other_player_vectors = [0];
var player_x = 10;
var player_y = 10;
var loop_count = 0;
var other_player_positions_array = [];

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
function send_player_position() {
    $.ajax({
        url: './send_position.php',
        type: "GET",
        data: {player_x:player_x, player_y:player_y}
    });
}
function update_player() {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.rect(player_x, player_y, 10, 10);
    ctx.stroke();
}
function get_other_positions() {
    $.ajax({
        url: './get_positions.php',
        type: "GET",
        success: function(data) {
            var old_other_player_positions_array = other_player_positions_array;
            var other_player_positions_array = data.split(".");
            var other_players_ammount = other_player_positions_array.length;
            console.log("Other players are located at: " + other_player_positions_array);
        }
    });
}
function calculate_vectors() {
    for (let i = 0; i < other_players_ammount; i++) {
        var current_player_position = other_player_positions_array[i].split(",");
        var old_current_player_position = old_other_player_positions_array.split(",");
        var old_current_player_x = old_current_player_position[0];
        var old_current_player_y = old_current_player_position[1];
        var current_player_x = current_player_position[0];
        var current_player_y = current_player_position[1];
        var current_player_x_change = current_player_x - old_current_player_x;
        var current_player_y_change = current_player_y - old_current_player_y;
        var vector_string = "";
        if (current_player_x_change > 0) {
            vector_x = current_player_x_change / get_request_delay;
            vector_string = vector_x + ",";
        }
        else {
            vector_string = "0,";
        }
        if (current_player_y_change > 0) {
            vector_y = current_player_y_change / get_request_delay;
            vector_string = vector_string + vector_y;
        }
        else {
            vector_string = vector_string + "0";
        }
        other_player_vectors[i] = vector_string;
    }
}
function move_others() {
    for (let i = 0; i < other_players_ammount; i++) {
        var current_player_vector = other_player_vectors[i].split(",");
        var current_player_position = other_player_positions_array[i].split(",");
        var current_player_position_new_x = current_player_position[0] + current_player_vector[0];
        var current_player_position_new_y = current_player_position[1] + current_player_bector[1];
        var new_player_position = current_player_position_new_x + "," + current_player_position_new_y;
        other_player_positions_array[i] = new_player_position;
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.rect(current_player_position_new_x, current_player_position_new_y, 10, 10);
        ctx.stroke();
    }
}
function update_others() {
    loop_count = loop_count + 1;
    if (get_request_delay == loop_count) {
        send_player_position();
        get_other_positions();
        calculate_vectors();
    }
    var other_players_ammount = other_player_positions_array.length;
    if (other_players_ammount > 0) {
        move_others();
    }
}
function interpolate_calculate() {
}
function main_game_loop() {
    ctx.clearRect(0,0,c.width,c.height);
    update_player();
    update_others();
    ctx.stroke();
}
setInterval(main_game_loop, main_game_loop_delay);
 //       ctx.beginPath();
   //     ctx.lineWidth = "4";
  //      ctx.rect(current_position_array[0],current_position_array[1],10,10);
    //    ctx.stroke();
  //  for (let i = 0; i < total_positions; i++) {
   //     current_position_array = positions_array[i].split(",");
    //    ctx.beginPath();
    //    ctx.lineWidth = "4";
     //   ctx.rect(current_position_array[0],current_position_array[1],10,10);
      //  ctx.stroke();
      //  }
