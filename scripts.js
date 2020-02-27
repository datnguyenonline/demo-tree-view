var width = 48;

function collapseChild(element, num) {
	if (!$(element).hasClass('opened')) {
		var html = '<div class="_19BOU">';
		var idList = [];
		for (var i = 0; i < num; i++) {
			var j = (i - 2) >= 0? i : 0;
			var height = 24 + (87 * i) + (10 * j);
			var line = [{x:0, y:12}, {x:96, y:12}];
			var c = [{x:0, y:12}, {x:width, y:12}, {x:0, y:(height-1)}, {x:width, y:(height-1)}];
			if (i == 0)
				var path = 'M' + line[0].x + ',' + line[0].y + ' ' + line[1].x + ',' + line[1].y;
			else
				var path = 'M' + c[0].x + ',' + c[0].y + ' C' + c[1].x + ',' + c[1].y + ' ' + c[2].x + ',' + c[2].y + ' ' + c[3].x + ',' + c[3].y;

			var id = makeID(5);
			html += '<div class="KyT_x">';
			html += '<div class="_3Phhl _3Phhl-appear-done _3Phhl-enter-done">';
			html += '<svg class="_2iQnq';
			if (i == 0)
				html += ' r2O7n';

			html += '" height="'+height+'" width="96">';
			html += '<path d="'+path+'"></path>';
			html += '</svg>';
			html += '<div class="_2cLYs">';
			html += '<div class="_2L_AO">';
			html += '<div class="G5f3K _3fK5H _3UNxK" id="draggable_'+id+'" draggable="true">';
			html += '<div class="_1pGPA">';
			html += 'This is test '+ (i + 1);
			html += '</div>';
			html += '</div>';
			var newNum = randomNumber();
			html += '<button class="GM2fp _35weZ _1s_-P _1ykqL _1wIei _18M12" type="button" onclick="collapseChild(this,'+newNum+')">'+newNum+' &gt;</button>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			idList.push(id);
		}
		html += '</div>';
		$(element).parent().parent().append(html);

		$.each(idList, function(index, value) {
			initDraggable('draggable_'+value);
		});

		updateParent(element);

		$(element).addClass('opened');
	} else {
		if ($(element).parent().next().is('div')) {
			$(element).parent().next().remove();
			$(element).removeClass('opened');
			updateParent(element);
		}
	}
}

function updateParent(element) {
	var parent = $(element).parent().parent().parent().parent();
	if ($(parent).attr('class') == 'KyT_x') {
		updateLine($(parent));
		updateParent($(parent));
	}
}

function updateLine(element) {
	if ($(element).next().is('div')){
		var height = 0;
		var childList = $(element).parent().children();
		$.each(childList, function( index, value ) {
			if (index <= $(element).index()) {
				height += $(value).height() + 24;
			}
		});
		$(element).next().find('svg').first().attr('height', height);
		var c_update = [{x:0, y:12}, {x:width, y:12}, {x:0, y:(height-1)}, {x:width, y:(height-1)}];
		var path_update = 'M' + c_update[0].x + ',' + c_update[0].y + ' C' + c_update[1].x + ',' + c_update[1].y + ' ' + c_update[2].x + ',' + c_update[2].y + ' ' + c_update[3].x + ',' + c_update[3].y;
		$(element).next().find('svg').find('path').first().attr('d', path_update);
		updateLine($(element).next());
	}

}

function randomNumber() {
	return Math.floor((Math.random() * 5) + 1);
}

function makeID(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function initDraggable(element_id) {
	var element = '#' + element_id;
	$(element).draggable({
		revert: true
	});
	$(element).droppable({
		accept: $['id^="draggable_"'],
	    drop: function(event, ui)
	    {
	    	// has child opened
	    	if ($(ui.draggable).parent().next().is('div')) {
	    		$(ui.draggable).parent().next().remove();
	    		$(ui.draggable).parent().find('button').removeClass('opened');
	    		updateParent(ui.draggable);
	    	}
	    	if ($(element).parent().next().is('div')) {
	    		$(element).parent().next().remove();
	    		$(ui.draggable).parent().find('button').removeClass('opened');
	    		updateParent(element);
	    	}

	    	// swap content and button
	    	var source = $(ui.draggable).parent().parent().parent().parent();
	    	$.each(source.parent().children(), function(index, value) {
	    		if (element_id == $(value).children().children().children().children().attr('id')){
	    			$(ui.draggable).css({ "left": "0", "top": "0" });
	    			$(ui.draggable).removeClass('ui-draggable-dragging');
			        var copy_to = $(element).parent().html();
			        var copy_from = $(ui.draggable).parent().html();
			        var parent_to = $(ui.draggable).parent();
			        var parent_from = $(element).parent();
			        parent_to.html(copy_to);
			        parent_from.html(copy_from);
			        initDraggable(element_id);
			        initDraggable(ui.draggable[0].id);
				}
	    	});
	    }
	})
}

$(function() {
	$('.wrapper').width($( window ).width()/5*4);
	$('.wrapper').height($( window ).height()/5*4);
});

const slider = document.querySelector('.wrapper');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
	isDown = true;
	slider.classList.add('active');
	startX = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
	isDown = false;
	slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
	isDown = false;
	slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
	if(!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 3; //scroll-fast
	slider.scrollLeft = scrollLeft - walk;
});