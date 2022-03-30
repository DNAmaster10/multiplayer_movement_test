var c = document.getElementById("mian_game_canvas");
var ctx = c.getContext("2d);
$.ajax({
        url: './get_positions.php',
        type: "GET",
        success: function(data) {

        }
});
function draw() {
    ctx.beginPath();
    ctx.rect();
}
setInterval(draw, 10);
//ctx.clearRect(0,0,canvas.width,canvas.height);
