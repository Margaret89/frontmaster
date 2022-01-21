import {$, Inputmask} from './common';

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