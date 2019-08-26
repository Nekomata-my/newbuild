function lq(){
    console.log("罗强")
}
function abc(a,b){
    return a+b;
}
function btn(){
   let li_ = document.querySelectorAll('li');
   for(let i = 0;i < li_.length;i++){
       li_[i].onclick = function(){
           console.log(this);
       }
   }
}

class Bar {
    doStuff() {
      console.log('stuff');
    }
  }
  var b = new Bar();

export{lq,abc,btn,b}