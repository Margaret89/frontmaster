import {$, Inputmask} from './common';

var widthWindow = $(window).width();
var deviceType = 'desktop';
var changeDevice = false;

if(widthWindow < 768){
	deviceType = 'mobile';
}else if(widthWindow >= 768 && widthWindow < 992){
	deviceType = 'tablet';
}else{
	deviceType = 'desktop';
}

$(window).on('resize', function(){
	widthWindow = $(window).width();

	if(widthWindow < 768 && deviceType == 'tablet'){
		deviceType = 'mobile';
		changeDevice = true;
	}else if((widthWindow >= 768 && deviceType == 'mobile') ||(widthWindow < 992 && deviceType == 'desktop')){
		deviceType = 'tablet';
		changeDevice = true;
	}else if(widthWindow >= 992 && deviceType == 'tablet'){
		deviceType = 'desktop';
		changeDevice = true;
	}else{
		changeDevice = false;
	}
});

// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');

// Валидация форм
function errorField(form, event) {
	form.find('.js-form-site-item').removeClass('error');
	form.find('.form-site-msg-error').remove();
	
	form.find('input[type=email]').each(function(){
		mailValid($(this));
	});

	form.find('.js-input-mail').each(function(){
		mailValid($(this));
	});

	function mailValid(elem) {
		var email = $(elem).val().trim();
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		if (!pattern.test(email) && (email.length > 1)) {
			$(elem).closest('.js-form-site-item').addClass('error');
			$(elem).attr('placeholder','Укажите корректный E-mail');
		}
	}

	form.find('input,textarea,select').filter('[required]').each(function(){
		if($(this).val().length < 1){
			$(this).closest('.js-form-site-item').addClass('error');

			if($(this).hasClass('js-phone')){
				$(this).attr('placeholder','Укажите ваш номер телефона');
			} else {
				$(this).attr('placeholder','Заполните поле');
			}
		}

		if($(this).attr('type') == 'checkbox' && !$(this).prop('checked')){
			$(this).closest('.js-form-site-polit').append('<div class="form-site-msg-error">Подтвердите обработку персональных данных</div>')
		}
		if($(this).attr('type') == 'radio' && !$('input[name="'+$(this).attr("name")+'"]').is(':checked')){
			$(this).closest('.js-form-site-item').addClass('error');
			$(this).closest('.js-form-site-item').append('<div class="form-site-msg-error">Заполните поле</div>')
		}
	});

	if(form.find('.js-form-site-item.error').length){
		event.preventDefault();
	}
}

if($('.js-valid-form').length){
	$('.js-valid-form').on('click', '.js-btn-submit', function(e){
		var $form = $(this).closest('form');
		errorField($form, e);
	});

	$('.js-valid-form').on('submit', 'form', function(e){
		var successTitle = $(this).closest('.js-valid-form').data('success');
		var successText = $(this).closest('.js-valid-form').data('text');
		var tempSuccessTitle = $('.js-success-alert-title').text();

		if(successTitle){
			$('.js-success-alert-title').text(successTitle);
		} else {
			$('.js-success-alert-title').text(tempSuccessTitle);
		}

		if(successText == 'none'){
			$('.js-success-alert-text').css('display', 'none');
		} else {
			$('.js-success-alert-text').text(successText);
		}

		$.fancybox.close();
		$.fancybox.open({
			src  : '#msg-success',
			type : 'inline',
			opts : {
				
			}
		});

		// Эти 2 строки закоментировать, чтобы произошла отправка формы. При интеграции использовать php ajax
		$(this)[0].reset();
		e.preventDefault();
	});
}

// Табуляция
if ($('.js-tabs-page').length) {
	$('.js-tabs-page-list').each(function(){
		$(this).find('.js-tabs-page-item:first').addClass("active");
	});

	$('.js-tabs-page-content').each(function(){
		$(this).find('.js-tabs-page-content-item:first').fadeIn();
	});

	$('.js-tabs-page-item').on('click', function(e) {
		e.preventDefault();
		var $parent = $(this).parents('.js-tabs-page');

		$parent.find('.js-tabs-page-content-item').hide();
		$parent.find('.js-tabs-page-item').removeClass('active');

		$(this).addClass("active");
		$parent.find('#' + $(this).attr('data-item')).fadeIn();
	});
}

// Вертикальная табуляция
if ($('.js-tabs-page-vert').length) {
	$('.js-tabs-page-vert-list').each(function(){
		$(this).find('.js-tabs-page-vert-item:first').addClass("active");
	});

	$('.js-tabs-page-vert-content').each(function(){
		$(this).find('.js-tabs-page-vert-content-item:first').fadeIn();
	});

	$('.js-tabs-page-vert-item').on('click', function(e) {
		e.preventDefault();
		var $parent = $(this).parents('.js-tabs-page-vert');

		$parent.find('.js-tabs-page-vert-content-item').hide();
		$parent.find('.js-tabs-page-vert-item').removeClass('active');

		$(this).addClass("active");
		$parent.find('#' + $(this).attr('data-item')).fadeIn();
	});
}

// Оформление нестандартного селекта
if($('.js-select').length){
	$('.js-select').select2({
		minimumResultsForSearch: -1,
	});
}

// Обрезание многострочного текста по количеству символов
if ($('.js-short-text').length) {
	var arrShortText = [];

	$('.js-short-text').each(function(index){
		arrShortText[index]=$(this).text();
	});

	function sliceText(){
		$('.js-short-text').each(function( index ) {
			var newsText = arrShortText[index];
			
			var size = $(this).data('count');

			if(newsText.length > size){
				$(this).html(newsText.slice(0, size) + ' ...');
			}
		});
	}
	
	sliceText();
}

// Слайдер отзывов
if($('.js-review-slider').length){
	$('.js-review-slider').slick({
		dots: true,
		appendArrows: $('.js-review-slider-nav'),
		appendDots: $('.js-review-slider-nav'),
		prevArrow: '<button id="prev" type="button" class="slider-nav__arr slider-nav__arr_left"><svg class="icon ic-arrow-left" width="10" height="19"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="slider-nav__arr slider-nav__arr_right"><svg class="icon ic-arrow-right" width="10" height="19"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
	});
}
// Добавление пункта "еще" в меню
if ($('.js-header').length) {
	if(deviceType == 'desktop'){
		var arrItems = []; //массив пунктов меню

		//Собираем массив  ширинами элементов меню
		$('.js-main-menu-item').each(function() {
			arrItems.push($(this).outerWidth(true));
		});

		moreMenu();
	}

	$(window).on('resize', function(){
		if(deviceType == 'desktop' && changeDevice == true){
			//Собираем массив с элементами меню
			arrItems = [];

			$('.js-main-menu-item').each(function() {
				arrItems.push($(this).outerWidth(true));
			});
		}

		if(deviceType == 'desktop'){
			moreMenu();
		}
		
		if(deviceType == 'tablet' && changeDevice == true){
			$('.js-main-menu-more-sub').children('.js-main-menu-item').each(function() {
				$(this).appendTo('.js-main-menu');
				$('.js-main-menu-more').remove();
			});
		}
	});

	function moreMenu() {
		let widthElems = 0; //Ширина всех элементов шапки кроме меню
		let widthMenu = 0; //Ширина самого меню
		let widthCurMenu = 0; //Ширина нового меню
		let widthHeader = $('.js-header').width(); //Ширина шапки без padding
		let countCurItem = $('.js-main-menu').children('.js-main-menu-item').length;

		for (let index = 0; index < arrItems.length; index++) {
			widthMenu = widthMenu + arrItems[index];
		}

		// Вычисляем сумму ширин элементов шапки кроме меню
		$('.js-header > *').each(function() {
			if(!$(this).hasClass('js-main-menu-wrap')){
				widthElems = widthElems + $(this).outerWidth(true);
			}
		});
		
		if((widthElems+widthMenu) > widthHeader || countCurItem != arrItems.length){
			widthCurMenu = widthHeader - widthElems - 100; // Вычисляем новую ширину меню

			// Добавляем пункт "еще", если его нет
			if(!$('.js-main-menu-more').length){
				$('.js-main-menu').append('<li class="main-menu__item js-main-menu-more"><span class="main-menu__link">Еще...</span><ul class="main-menu__sub-more js-main-menu-more-sub"></ul></li>');
			}

			// Добавляем/Удаляем пункты меню
			for (let index = 0; index < arrItems.length; index++) {
				if(widthCurMenu < arrItems[index]){
					widthCurMenu = 0;
					$('.js-main-menu-item[data-num='+index+']').appendTo('.js-main-menu-more-sub');
				}else{
					widthCurMenu = widthCurMenu - arrItems[index];

					if(countCurItem < (index+1)){
						$('.js-main-menu-more').before($('.js-main-menu-item[data-num='+index+']'));
					}
				}
			}
		}else{
			$('.js-main-menu-more').remove();
		}
	}
}

// Открыть/Закрыть мобильное меню
$('.js-open-menu').on('click',function(){
	$('.js-main-menu-wrap').addClass('open');
	$('.js-body').addClass('no-scroll');
});

$('.js-close-menu').on('click',function(){
	$('.js-main-menu-wrap').removeClass('open');
	$('.js-body').removeClass('no-scroll');
});