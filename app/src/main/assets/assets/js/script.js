let ListClintes   = []
let ListPages     = []
let ListPayments  = []
let ListBoost     = []
$(function(){   
    $("input").hover(
    function(event) {
        $("#navigatonbar").hide();
    },
    function (event) {
        $("#navigatonbar").show();
        }
    );
    
    //let chart = document.querySelector('canvas').chart;
    
   // $(document).on('click', function(){
        
        // When the document is clicked, update the chart 
        // with a random value and animate it.
        
       // let newData = [150,150,150,150,200,150,150]
        //chart.data.datasets[0].data = newData
        //chart.data.labels = newData
        //chart.update();
        //alert(chart.data.datasets[0].data[2])
   // });
    
});
// Setup isScrolling variable
var isScrolling;

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}
var wheelOpt = supportsPassive ? { passive: false } : false;

//disableScroll()

function CallScroll(elm) {
    $("#eDebug").text("Scrolling")
    // Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );
	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {
       // $("#eDebug").text("Stop Scroll")
        base = elm.clientWidth / 3
    

        $("#eDebug").text("-> " + elm.scrollLeft)
    
            if(base < elm.scrollLeft){
                index = parseInt(elm.scrollLeft / 360)
                //elm.scrollTo(index * 360,0);
                $("#eDebug").text("Scroll To " + index * 360)
                //alert(0)
            } else{
                //elm.scrollTo(0, 0);
            }
    }, 20);
    /*
    elm.addEventListener('pointerup', (event) => {
        
    });
    */
    
}

function disableScroll() {
    
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    //window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    //window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  function preventDefault(e) {

    $("#eDebug").text("Try Scrolling - " + e)
    e.preventDefault();
    
        scrollToX(360)
        //
    
  }


  async function scrollToX(x) {
    for (let index = 0; index <= 120; index += 3) {
        await sleep(1)
        document.getElementById("mainPage").scrollTo(index*3,0); 
    }
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}