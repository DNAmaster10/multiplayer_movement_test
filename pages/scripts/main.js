var c = document.getElementById("main_game_canvas");
var ctx = c.getContext("2d");
//This is multiplied by the main game loop delay
var get_request_delay = 50;
var main_game_loop_delay = 10;

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
    send_player_position();
}
function get_other_positions() {
    $.ajax({
        url: './get_positions.php',
        type: "GET",
        success: function(data) {
            var other_player_positions_array = data.split(".");
        }
    });
}
function update_others() {
    get_other_positions();

}
function interpolate_calculate() {
}
function move_others() {
    for (let i = 0; i < total_positions - 1; i++) {
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
