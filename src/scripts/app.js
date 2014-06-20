Prism.languages.typescript = Prism.languages.extend('clike', {
	'keyword': /\b(class|extends|implements|interface|new|case|do|while|else|if|for|in|switch|throw|private|public|static|get|set|function|var|try|catch|finally|while|with|default|break|continue|delete|return|each|module|super|this|null|Infinity|-Infinity|NaN|undefined|true|false|instanceof|typeof|void|arguments)\b/g,
	'preprocessor': /^\s*#.*/gm,
	'number': /\b-?(0x)?\d*\.?\d+\b/g
});



/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

	'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg( className ) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
		};
		removeClass = function( elem, c ) {
			elem.classList.remove( c );
		};
	}
	else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function( elem, c ) {
			elem.className = elem.className.replace( classReg( c ), ' ' );
		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};

// transport
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( classie );
	} else {
		// browser global
		window.classie = classie;
	}

})( window );
/**
 * borderMenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

	// http://stackoverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	function init() {

		var menu = document.getElementById( 'bt-menu' ),
			trigger = menu.querySelector( 'a.bt-menu-trigger' ),
		// triggerPlay only for demo 6
			triggerPlay = document.querySelector( 'a.bt-menu-trigger-out' ),
		// event type (if mobile use touch events)
			eventtype = mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function() {
				classie.remove( menu, 'bt-menu-open' );
				classie.add( menu, 'bt-menu-close' );
			},
			closeClickFn = function( ev ) {
				resetMenu();
				overlay.removeEventListener( eventtype, closeClickFn );
			};

		var overlay = document.createElement('div');
		overlay.className = 'bt-overlay';
		menu.appendChild( overlay );

		trigger.addEventListener( eventtype, function( ev ) {
			ev.stopPropagation();
			ev.preventDefault();

			if( classie.has( menu, 'bt-menu-open' ) ) {
				resetMenu();
			}
			else {
				classie.remove( menu, 'bt-menu-close' );
				classie.add( menu, 'bt-menu-open' );
				overlay.addEventListener( eventtype, closeClickFn );
			}
		});

		if( triggerPlay ) {
			triggerPlay.addEventListener( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();

				classie.remove( menu, 'bt-menu-close' );
				classie.add( menu, 'bt-menu-open' );
				overlay.addEventListener( eventtype, closeClickFn );
			});
		}

	}

	init();

})();


/*

 <iframe src="http://www.youtube.com/embed/4aQwT3n2c1Q" height="315" width="560" allowfullscreen="" frameborder="0">
 </iframe>
 */

Array.prototype.slice.call( document.querySelectorAll('[xp-frame]') ).map( function( el ){

	var ids = el.getAttribute('id').split(':');
	var provider = ids[0];
	var videoID = ids[1];
	var iframe = document.createElement('iframe');
	iframe.setAttribute('width','560');
	iframe.setAttribute('height','315');
	iframe.setAttribute('allowFullScreen','');
	iframe.setAttribute('webkitallowfullscreen','');
	iframe.setAttribute('mozallowfullscreen','');
	iframe.setAttribute('frameborder','0');
	el.appendChild( iframe );
	switch ( provider )
	{
		case "youtube":
			iframe.src ="//www.youtube.com/embed/"+videoID;
		break;
		case "vimeo":
			iframe.src ="//player.vimeo.com/video/"+videoID;
		break;
		case "slides":
			iframe.src =videoID;
		break;
	}


});

Array.prototype.slice.call( document.querySelectorAll('[xp-code-play]') ).map( function( el ){

	var code = el.getElementsByTagName('pre')[0].outerText;
	while (el.lastChild) { el.removeChild(el.lastChild); }
	var img = document.createElement('img');
	img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAMAAACVQ462AAAApVBMVEUAAAAAbMkDbsoAbMkAbMkAbMkAbMlspswAbMkAbMkAbMkAbMkAbMkAbMkAbMkKdctmo8xupsxNmsxhocxupszv7/EAa8kAbsnx8PKiyeX/9/T89fNspcz/+fVGl8ymy+ZMmcxLn9gEfM2pzeav0Of38/MgitExkdT//vZTo9kAdcvU4u0AY8VvsN7o6/C20+mXxONnrNzB2Opcn8xhqdsAbckAa8iBj7aKAAAAIXRSTlMAYG8wQBAgpMV/n+uP2LJOnFiRIKb///////////////W5ppeZAAABg0lEQVRIx+2U2W6DMBBFzVr2dANjKHVjsy8hSUv+/9NqlvQBQ5o+tFKlHCF7LKGj8RUMuDFBSshTks3VgjKL0RzawMeHqwVFHszJqff6crVgG7lzAvTPBMG3Al37fUE4krh+wrafC3YxHqiSXYtx604CXRU1RxoFqtGXogRYKc4FSUXqE4R1fagKUtclxaPAs3VZ79RB4Iiy0QHDAKBf+A5oQ1KKqgame3RAdBLobNGsQaCwx5Mlj+2dtJBB1JI0D4MCZn7g+mgSyEMAo0DQNXa2BSDYS99BQkkauv6esBaqiBeonabL7CxowBHWBcyQEZhV5wz6V21rcNjDFYDSyZ1yQZAEO5SVRTwJTBWIY4hsU6y+I8O0wIUr4GOYf5Tbs0A0PXMDgGABxWGVxtKTPXVZgHtBUpA0JQThrww4BI2fByEjOmZFFAbxNsuKNqerAsUU+ImEGYjGMcKYxgwaN3BFYJkGPxNPHgcsV35nSQJzNuLb6wLvnGCVp+e7Je7Bjb/gE1HHRdnzinVOAAAAAElFTkSuQmCC';

	img.addEventListener('click',function()
	{
		window.open('//www.typescriptlang.org/Playground/#src='+encodeURIComponent( code ) );
	})
	img.style.cursor="pointer";
	el.appendChild( img );


});


Prism.highlightAll();