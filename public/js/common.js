"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			eforeLoad: function eforeLoad() {
				document.querySelector("html").classList.add("ficed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("ficed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	// табы  .
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /табы
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$("form").submit(function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		// листалка по стр
		$(".scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs'); //JSCCommon.mobileMenu();

	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect

	var x = window.location.host;
	var screenName;
	screenName = 'main-7.png';

	if (screenName && x === "localhost:3000") {
		$(".footer").after("<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	} // /добавляет подложку для pixel perfect


	function whenResize() {
		var topH = $("header ").innerHeight();

		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window
	//luckyone js
	//mnu js

	$('.burger-js').click(function () {
		$(this).toggleClass('active');
		$('.mob-mnu-cont-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});

	function mobMnuBlur() {
		if (!(event.currentTarget.closest('.sub-menu') === this.parentElement.querySelector('.sub-menu'))) {
			$(this.parentElement).toggleClass('active');
		}

		document.body.removeEventListener('click', mobMnuBlurHandler);
	}

	var mobMnuBlurHandler;
	$('.menu-item-has-children > a').click(function () {
		event.preventDefault();
		$('.menu-item-has-children').removeClass('active');
		$(this.parentElement).toggleClass('active');
		event.stopPropagation();
		document.body.removeEventListener('click', mobMnuBlurHandler);
		mobMnuBlurHandler = mobMnuBlur.bind(this);
		document.body.addEventListener('click', mobMnuBlurHandler);
	}); //

	var headerSlider = new Swiper('.header-slider-js', {
		slidesPerView: 1,
		loop: true,
		autoplay: 5000,
		//lazy-load
		lazy: {
			loadPrevNext: true
		},
		//pagination
		pagination: {
			el: $(this).find('.header-pugin-js'),
			clickable: true
		},
		//nav
		navigation: {
			nextEl: '.header-next-js',
			prevEl: '.header-prev-js'
		}
	}); //feedback slider

	var feedbackSlider = new Swiper('.feedback-slider-js', {
		slidesPerView: 'auto',
		//loop: true,
		//autoplay: 5000,
		//lazy-load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 120
		},
		spaceBetween: 30,
		//pagination
		pagination: {
			el: $(this).find('.feedback-pugin-js'),
			clickable: true
		}
	}); //news slider

	var newsSlider = new Swiper('.news-slider-js', {
		slidesPerView: 'auto',
		//loop: true,
		//autoplay: 5000,
		//lazy-load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 120
		},
		spaceBetween: 30,
		//pagination
		pagination: {
			el: $(this).find('.news-pugin-js'),
			clickable: true
		}
	}); //end luckyone js

	$('input.has-ph-js').blur(checkEmptyVal);

	function checkEmptyVal() {
		if (this.value !== '') {
			$(this).addClass('not-empty');
		} else {
			$(this).removeClass('not-empty');
		}
	} //


	var partnersSlider = new Swiper('.partners-slider-js', {
		slidesPerView: 'auto',
		//loop: true,
		//autoplay: 5000,
		//lazy-load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 12
		},
		spaceBetween: 30,
		//pagination
		pagination: {
			el: $(this).find('.partners-pugin-js'),
			clickable: true
		},
		//nav
		navigation: {
			nextEl: '.partners-prev-js',
			prevEl: '.partners-next-js'
		}
	}); //.go-top-js

	$('.go-top-js').click(function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}); //clients-slider

	var clientsSlider = new Swiper('.clients-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		//lazy-load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 12
		},
		spaceBetween: 10,
		//pagination
		pagination: {
			el: $(this).find('.clients-pugin-js'),
			clickable: true
		},
		//nav
		navigation: {
			nextEl: '.clients-prev-js',
			prevEl: '.clients-next-js'
		}
	});
	window.setTimeout(function () {
		clientsSlider.update();
	}, 1000); //wow js
	//catalog wow

	var dur = .6;
	var delay = 200;
	$('.sCatalog__col--js').each(function () {
		$(this).addClass("wow fadeIn");
		$(this).attr("data-wow-duration", dur + 's');
		$(this).attr("data-wow-delay", delay + 'ms');
		delay += 200;
	});
	dur = .5;
	delay = 100;
	$('.arrow').each(function () {
		$(this).addClass("wow slideInLeft");
		$(this).attr("data-wow-duration", dur + 's');
		$(this).attr("data-wow-delay", delay + 'ms');
	}); //

	var wow = new WOW({
		mobile: false
	});
	wow.init(); //end wow
	//scroll link

	fixedStip();

	function fixedStip() {
		var fixedStrip = document.querySelector('.scroll-top');
		if (!fixedStrip) return;
		window.addEventListener("scroll", toggleFixedStrip.bind(undefined, fixedStrip), {
			passive: true
		});
		toggleFixedStrip(fixedStrip);
		$(fixedStrip).click(function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}

	function toggleFixedStrip(fixedStrip) {
		if (window.scrollY > calcVh(50)) {
			$(fixedStrip).addClass('active');
		} else {
			$(fixedStrip).removeClass('active');
		}
	}

	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return v * h / 100;
	} //callback


	function closeCallBackOnMissClick() {
		if (event.target.closest('.callback-win--js')) return;
		$('.call-btn--js, .callback-win--js').removeClass('active');
		document.body.removeEventListener('click', closeCallBackOnMissClick);
	}

	$('.call-btn--js').click(function () {
		document.body.removeEventListener('click', closeCallBackOnMissClick);
		$('.call-btn--js, .callback-win--js').toggleClass('active');
		event.stopPropagation();
		document.body.addEventListener('click', closeCallBackOnMissClick);
	}); //fancy-bg paint()

	$('.paint-black-js').click(function () {
		window.setTimeout(function () {
			$('.fancybox-bg').removeClass('white-bg');
		}, 0);
	});
	$('.paint-white-js').click(function () {
		window.setTimeout(function () {
			$('.fancybox-bg').addClass('white-bg');
		}, 0);
	}); //qusetions modal js

	window.setTimeout(function () {
		window.addEventListener('scroll', QuestionModalHandler, {
			passive: true
		});
	}, 300);
	var sSeo = document.querySelector('.sSeo--js');

	function QuestionModalHandler() {
		if (!sSeo) {
			window.removeEventListener('scroll', QuestionModalHandler, {
				passive: true
			});
			return;
		}

		var sSeoTop = $(sSeo)[0].getBoundingClientRect().top + $(window)['scrollTop']();
		;

		if (window.scrollY + calcVh(100) > sSeoTop) {
			$.fancybox.open({
				src: '#questions-modal' //type: 'inline'

			}); //paint black

			window.setTimeout(function () {
				$('.fancybox-bg').removeClass('white-bg');
			}, 0);
			window.removeEventListener('scroll', QuestionModalHandler, {
				passive: true
			});
		}
	} //prod-card-js
	//open popup


	$('.prod-card-link-js').click(function () {
		event.preventDefault();
		var parent = this.closest('.prod-card-parent-js');
		if (!parent) return;
		$(parent).find('.prod-card--js').addClass('active');
		$('body').addClass('fixed2');
		$('html').addClass('fixed');
		var thisSlider = parent.querySelector('.prod-card-slider-js');
		var thisThumb = parent.querySelector('.prod-thumb-js');

		if (thisSlider && thisThumb) {
			thisSlider.swiper.update();
			thisThumb.swiper.update();
		} //close popup


		event.stopPropagation();
		document.body.removeEventListener('click', popUpMissClickHandler); //??

		document.body.addEventListener('click', popUpMissClickHandler);
	});

	function popUpMissClickHandler() {
		if (!event.target.closest('.prod-card__row--js') && !event.target.closest('.fancybox-inner')) {
			$('.prod-card--js').removeClass('active');
			$('body').removeClass('fixed2');
			$('html').removeClass('fixed');
			document.body.removeEventListener('click', popUpMissClickHandler); //??
		}
	} //prod card sliders


	$(".prod-card__slider--js").each(function () {
		var prodThumbSl = new Swiper($(this).find(".prod-thumb-js"), {
			slidesPerView: 'auto',
			spaceBetween: 5,
			//lazy load
			lazy: {
				loadPrevNext: true
			}
		});
		var prodCardSlider = new Swiper($(this).find(".prod-card-slider-js"), {
			slidesPerView: 1,
			spaceBetween: 30,
			//lazy load
			lazy: {
				loadPrevNext: true
			},
			//nav
			navigation: {
				nextEl: $(this).find('.prod-card-next--js'),
				prevEl: $(this).find('.prod-card-prev--js')
			},
			//thumb
			thumbs: {
				swiper: prodThumbSl
			}
		});
	}); //tik tak

	function tikTak(parentQselector) {
		//html elements
		var parent = document.querySelector(parentQselector);
		if (!parent) return;
		var days = parent.querySelector('.days');
		var hours = parent.querySelector('.hours');
		var minutes = parent.querySelector('.minutes');
		var seconds = parent.querySelector('.seconds'); //date elements

		var now = new Date(); // d === days.innerHtml + now.getDate... others the same way

		var d = getTime(days, now.getDate());
		var h = getTime(hours, now.getHours());
		var m = getTime(minutes, now.getMinutes());
		var s = getTime(seconds, now.getSeconds());
		var targetDate = new Date(now.getFullYear(), now.getMonth(), d, h, m, s); //force date
		//let targetDate = new Date(2020, 7,21);
		//interval

		tikTakReadOut(parent, targetDate, ThisReadOutID, days, hours, minutes, seconds);
		var ThisReadOutID = window.setInterval(tikTakReadOut.bind(null, parent, targetDate, ThisReadOutID, days, hours, minutes, seconds), 1000);
		console.log(ThisReadOutID, '//');
	}

	tikTak('.timer-box-js'); //additional funcs to tikTak

	function tikTakReadOut(parent, targetDate, ReadOutID, days, hours, minutes, seconds) {
		var now = new Date();
		var timeLeft = (targetDate - now) / 1000;

		if (timeLeft < 0) {
			//window.clearInterval(ReadOutID);
			//to do something after timer ends
			//$(parent).fadeOut();
			return;
		}

		days.innerHTML = addZero(Math.floor(timeLeft / 60 / 60 / 24));
		timeLeft = (timeLeft / 60 / 60 / 24 - Math.floor(timeLeft / 60 / 60 / 24)) * 60 * 60 * 24;
		hours.innerHTML = addZero(Math.floor(timeLeft / 60 / 60));
		timeLeft = (timeLeft / 60 / 60 - Math.floor(timeLeft / 60 / 60)) * 60 * 60;
		minutes.innerHTML = addZero(Math.floor(timeLeft / 60));
		timeLeft = (timeLeft / 60 - Math.floor(timeLeft / 60)) * 60;
		seconds.innerHTML = addZero(Math.floor(timeLeft));
	}

	function getTime(htmlEl, currentTimeItem) {
		var timeItem = Number(htmlEl.innerHTML);

		if (timeItem) {
			timeItem += currentTimeItem;
		} else {
			timeItem = currentTimeItem;
		}

		return timeItem;
	}

	function addZero(num) {
		num = Number(num);

		if (num >= 0 && num <= 9) {
			num = "0" + num;
		}

		return num;
	} //end tik tak
	//breadcrumbs


	var breadSl = new Swiper('.breadcrumb-slider-js', {
		slidesPerView: 'auto',
		// spaceBetween: 30,
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}