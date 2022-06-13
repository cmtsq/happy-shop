window.console = window.console || function(t) {};

window.open = function(){ console.log('window.open is disabled.'); };

window.print = function(){ console.log('window.print is disabled.'); };

// Support hover state for mobile.

if (false) {

  window.ontouchstart = function(){};

}



if (document.location.search.match(/type=embed/gi)) {

  window.parent.postMessage('resize', "*");

}

$('html,body').on('click', addProduct);

function addProduct(event) {

var offset = $('#end').offset(), flyer = $('<img class="u-flyer" src="./images/commom.bin.png"/>');

flyer.fly({

    start: {

        // left: event.pageX,

        // top: event.pageY
		left:350,
		top:350

    },

    end: {

        left: 100,

        top: 100,

        width:0,

        height: 0

    }

});

}

