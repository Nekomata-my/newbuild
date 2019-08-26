window.$ = require("jquery");
function yt(){
    console.log("李雨婷")
}
function xs(){
    $("#bt_xs").click(()=>{
        $("p").toggle();
    })
}
export{yt,xs}
