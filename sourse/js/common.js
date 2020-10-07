const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

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
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			eforeLoad: function () {
				document.querySelector("html").classList.add("ficed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("ficed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(".scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear(); 
		}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	//JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = 'main-7.png';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	//luckyone js

	//mnu js
	$('.burger-js').click(function (){
		$(this).toggleClass('active');
		$('.mob-mnu-cont-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	});


	function mobMnuBlur(){
		if (!(event.currentTarget.closest('.sub-menu') === this.parentElement.querySelector('.sub-menu'))) {
			$(this.parentElement).toggleClass('active');
		}
		document.body.removeEventListener('click', mobMnuBlurHandler);
	}

	let mobMnuBlurHandler;
	$('.menu-item-has-children > a').click(function (){
		event.preventDefault();
		$('.menu-item-has-children').removeClass('active');
		$(this.parentElement).toggleClass('active');

		event.stopPropagation();

		document.body.removeEventListener('click', mobMnuBlurHandler);
		mobMnuBlurHandler = mobMnuBlur.bind(this)
		document.body.addEventListener('click', mobMnuBlurHandler);
	});
	//

	let headerSlider = new Swiper('.header-slider-js', {
		slidesPerView: 1,
		loop: true,
		autoplay: 5000,

		//lazy-load
		lazy: {
			loadPrevNext: true,
		},
		//pagination
		pagination: {
			el: $(this).find('.header-pugin-js'),
			clickable: true,
		},
		//nav
		navigation: {
			nextEl: '.header-next-js',
			prevEl: '.header-prev-js',
		},
	});

	//feedback slider
	let feedbackSlider = new Swiper('.feedback-slider-js', {
		slidesPerView: 'auto',
		//loop: true,
		//autoplay: 5000,

		//lazy-load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 120,
		},
		spaceBetween: 30,
		//pagination
		pagination: {
			el: $(this).find('.feedback-pugin-js'),
			clickable: true,
		},

	});

	//news slider
	let newsSlider = new Swiper('.news-slider-js', {
		slidesPerView: 'auto',
		//loop: true,
		//autoplay: 5000,

		//lazy-load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 120,
		},
		spaceBetween: 30,
		//pagination
		pagination: {
			el: $(this).find('.news-pugin-js'),
			clickable: true,
		},
	});
	//end luckyone js
	$('input.has-ph-js').blur(checkEmptyVal);

	function checkEmptyVal() {
		if (this.value !== ''){
			$(this).addClass('not-empty');
		}
		else {
			$(this).removeClass('not-empty');
		}
	}
	//
	let partnersSlider = new Swiper('.partners-slider-js', {
		slidesPerView: 'auto',
		//loop: true,
		//autoplay: 5000,

		//lazy-load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 12,
		},
		spaceBetween: 30,
		//pagination
		pagination: {
			el: $(this).find('.partners-pugin-js'),
			clickable: true,
		},
		//nav
		navigation: {
			nextEl: '.partners-prev-js',
			prevEl: '.partners-next-js',
		},
	});
	//.go-top-js
	$('.go-top-js').click(function (){
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});

	//wow js

	//catalog wow
	let dur = .6;
	let delay = 200;
	$('.sCatalog__col--js').each(function () {
		$(this).addClass("wow fadeIn");
		$(this).attr("data-wow-duration", dur + 's');
		$(this).attr("data-wow-delay",	delay + 'ms');
		delay+= 200;
	});

	dur = .5;
	delay = 100;
	$('.arrow').each(function (){
		$(this).addClass("wow slideInLeft");
		$(this).attr("data-wow-duration", dur + 's');
		$(this).attr("data-wow-delay",	delay + 'ms');
	});
	//

	let wow = new WOW({
		mobile: false
	});
	wow.init();
	//end wow

	//scroll link
	fixedStip();
	function fixedStip(){
		let fixedStrip = document.querySelector('.scroll-top');
		if(!fixedStrip) return

		window.addEventListener("scroll", toggleFixedStrip.bind(undefined, fixedStrip), {passive:  true});
		toggleFixedStrip(fixedStrip);

		$(fixedStrip).click(function (){
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}
	function toggleFixedStrip(fixedStrip){
		if (window.scrollY > calcVh(50)){
			$(fixedStrip).addClass('active');
		}
		else{
			$(fixedStrip).removeClass('active');
		}
	}
	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}
	//callback
	function closeCallBackOnMissClick(){
		if (event.target.closest('.callback-win--js')) return
		$('.call-btn--js, .callback-win--js').removeClass('active');
		document.body.removeEventListener('click',closeCallBackOnMissClick);
	}

	$('.call-btn--js').click(function (){
		document.body.removeEventListener('click',closeCallBackOnMissClick);
		$('.call-btn--js, .callback-win--js').toggleClass('active');
		event.stopPropagation();
		document.body.addEventListener('click',closeCallBackOnMissClick);
	});
	
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
