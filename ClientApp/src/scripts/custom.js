var THEMEMASCOT = THEMEMASCOT || {};

(function ($) {
    "use strict";

    THEMEMASCOT.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (THEMEMASCOT.isMobile.Android() || THEMEMASCOT.isMobile.BlackBerry() || THEMEMASCOT.isMobile.iOS() || THEMEMASCOT.isMobile.Opera() || THEMEMASCOT.isMobile.Windows());
        }
    };

    THEMEMASCOT.isRTL = {
        check: function () {
            if ($("html").attr("dir") === "rtl") {
                return true;
            } else {
                return false;
            }
        }
    };

    THEMEMASCOT.initialize = {

        init: function () {
            THEMEMASCOT.initialize.TM_datePicker();
            THEMEMASCOT.initialize.TM_ddslick();
            THEMEMASCOT.initialize.TM_sliderRange();
            THEMEMASCOT.initialize.TM_onLoadModal();
            //THEMEMASCOT.initialize.TM_loadBSParentModal();
            THEMEMASCOT.initialize.TM_platformDetect();
            THEMEMASCOT.initialize.TM_customDataAttributes();
            THEMEMASCOT.initialize.TM_parallaxBgInit();
            THEMEMASCOT.initialize.TM_resizeFullscreen();
            THEMEMASCOT.initialize.TM_nivolightbox();
            THEMEMASCOT.initialize.TM_equalHeightDivs();
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- Date Picker  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_datePicker: function () {
            $(".date-picker").datepicker({format: "dd/mm/yyyy"}); //for more formats visit: https://bootstrap-datepicker.readthedocs.io/en/latest/options.html#format
            //$( ".time-picker" ).timepicker();
            $(".datetime-picker").datetimepicker({format: "DD/MM/YYYY hh:mm:ss a"}); //for more formats visit: http://eonasdan.github.io/bootstrap-datetimepicker/Options/#format/ and http://momentjs.com/docs/#/displaying/format/
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------------- ddslick  ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_ddslick: function () {
            $("select.ddslick").each(function () {
                var name = $(this).attr("name");
                var id = $(this).attr("id");
                $(`#${id}`).ddslick({
                    imagePosition: "left",
                    onSelected: function (selectedData) {
                        $(`#${id} .dd-selected-value`).prop("name", name);
                    }
                });
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ slider Range  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_sliderRange: function () {
            $(".slider-range").each(function () {
                var id = $(this).attr("id");
                const targetId = $(this).data("target");
                $(`#${targetId}`).slider({
                    range: "max",
                    min: 1990,
                    max: 2018,
                    value: 2010,
                    slide: function (event, ui) {
                        $(`#${id}`).val(ui.value);
                    }
                });
                $(`#${id}`).val($(`#${targetId}`).slider("value"));
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- Load Modal  -------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_onLoadModal: function () {
            const $modal = $(".modal-on-load");
            if ($modal.length > 0) {
                $modal.each(function () {
                    var element = $(this),
                        elementTarget = element.attr("data-target"),
                        elementTargetValue = elementTarget.split("#")[1],
                        elementDelay = element.attr("data-delay");
                    const elementTimeout = element.attr("data-timeout");
                    var elementAnimateIn = element.attr("data-animate-in"),
                        elementAnimateOut = element.attr("data-animate-out");

                    if (!element.hasClass("enable-cookie")) {
                        $.removeCookie(elementTargetValue);
                    }

                    if (element.hasClass("enable-cookie")) {
                        const elementCookie = $.cookie(elementTargetValue);

                        if (typeof elementCookie !== "undefined" && elementCookie == "0") {
                            return true;
                        }
                    }

                    if (!elementDelay) {
                        elementDelay = 1500;
                    } else {
                        elementDelay = Number(elementDelay) + 1500;
                    }

                    const t = setTimeout(function () {
                        $.magnificPopup.open({
                            items: {src: elementTarget},
                            type: "inline",
                            mainClass: "mfp-no-margins mfp-fade",
                            closeBtnInside: false,
                            fixedContentPos: true,
                            removalDelay: 500,
                            callbacks: {
                                open: function () {
                                    if (elementAnimateIn !== "") {
                                        $(elementTarget).addClass(elementAnimateIn + " animated");
                                    }
                                },
                                beforeClose: function () {
                                    if (elementAnimateOut !== "") {
                                        $(elementTarget).removeClass(elementAnimateIn).addClass(elementAnimateOut);
                                    }
                                },
                                afterClose: function () {
                                    if (elementAnimateIn !== "" || elementAnimateOut !== "") {
                                        $(elementTarget).removeClass(elementAnimateIn + " " + elementAnimateOut + " animated");
                                    }
                                    if (element.hasClass("enable-cookie")) {
                                        $.cookie(elementTargetValue, "0");
                                    }
                                }
                            }
                        }, 0);
                    }, Number(elementDelay));

                    if (elementTimeout !== "") {
                        const to = setTimeout(function () {
                            $.magnificPopup.close();
                        }, Number(elementDelay) + Number(elementTimeout));
                    }
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Bootstrap Parent Modal  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_loadBSParentModal: function () {
            const ajaxLoadContent = true;
            if (ajaxLoadContent) {
                $.ajax({
                    url: "includes/bootstrap-parent-modal.html",
                    success: function (data) {
                        $("body").append(data);
                    },
                    dataType: "html"
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ preloader  ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_preLoaderClickDisable: function () {
            var $preloader = $("#preloader");
            $preloader.children("#disable-preloader").on("click", function (e) {
                $preloader.fadeOut();
                return false;
            });
        },

        TM_preLoaderOnLoad: function () {
            const $preloader = $("#preloader");
            $preloader.delay(200).fadeOut("slow");
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- Platform detect  --------------------- */
        /* ---------------------------------------------------------------------- */
        TM_platformDetect: function () {
            if (THEMEMASCOT.isMobile.any()) {
                $html.addClass("mobile");
            } else {
                $html.addClass("no-mobile");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Hash Forwarding  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_hashForwarding: function () {
            if (window.location.hash) {
                const hashOffset = $(window.location.hash).offset().top;
                $("html, body").animate({
                    scrollTop: hashOffset
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------- Background image, color ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_customDataAttributes: function () {
            $("[data-bg-color]").each(function () {
                $(this).css("cssText", `background: ${$(this).data("bg-color")} !important;`);
            });
            $("[data-bg-img]").each(function () {
                $(this).css("background-image", `url(${$(this).data("bg-img")})`);
            });
            $("[data-text-color]").each(function () {
                $(this).css("color", $(this).data("text-color"));
            });
            $("[data-font-size]").each(function () {
                $(this).css("font-size", $(this).data("font-size"));
            });
            $("[data-height]").each(function () {
                $(this).css("height", $(this).data("height"));
            });
            $("[data-border]").each(function () {
                $(this).css("border", $(this).data("border"));
            });
            $("[data-margin-top]").each(function () {
                $(this).css("margin-top", $(this).data("margin-top"));
            });
            $("[data-margin-right]").each(function () {
                $(this).css("margin-right", $(this).data("margin-right"));
            });
            $("[data-margin-bottom]").each(function () {
                $(this).css("margin-bottom", $(this).data("margin-bottom"));
            });
            $("[data-margin-left]").each(function () {
                $(this).css("margin-left", $(this).data("margin-left"));
            });
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------- Background Parallax ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_parallaxBgInit: function () {
            if (!THEMEMASCOT.isMobile.any() && $(window).width() >= 800) {
                $(".parallax").each(function () {
                    const dataParallaxRatio = ($(this).data("parallax-ratio") === undefined) ? "0.5" : $(this).data("parallax-ratio");
                    $(this).parallax("50%", 0.5);
                });
            } else {
                $(".parallax").addClass("mobile-parallax");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------- Home Resize Fullscreen ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_resizeFullscreen: function () {
            const windowHeight = $window.height();
            $(".fullscreen, .revslider-fullscreen").height(windowHeight);
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ Nivo Lightbox ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_nivolightbox: function () {
            $("a[data-lightbox-gallery]").nivoLightbox({
                effect: "fadeScale"
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- Wow initialize  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_wow: function () {
            const wow = new WOW({
                mobile: false // trigger animations on mobile devices (default is true)
            });
            wow.init();
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------------------- equalHeights ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_equalHeightDivs: function () {
            /* equal heigh */
            const $equalHeight = $(".equal-height");
            $equalHeight.children("div").css("min-height", "auto");
            $equalHeight.equalHeights();

            /* equal heigh inner div */
            const $equalHeightInner = $(".equal-height-inner");
            $equalHeightInner.children("div").css("min-height", "auto");
            $equalHeightInner.children("div").children("div").css("min-height", "auto");
            $equalHeightInner.equalHeights();
            $equalHeightInner.children("div").each(function () {
                $(this).children("div").css("min-height", $(this).css("min-height"));
            });

            /* pricing-table equal heigh*/
            const $equalHeightPricingTable = $(".equal-height-pricing-table");
            $equalHeightPricingTable.children("div").css("min-height", "auto");
            $equalHeightPricingTable.children("div").children("div").css("min-height", "auto");
            $equalHeightPricingTable.equalHeights();
            $equalHeightPricingTable.children("div").each(function () {
                $(this).children("div").css("min-height", $(this).css("min-height"));
            });
        }

    };

    THEMEMASCOT.header = {

        init: function () {

            const t = setTimeout(function () {
                THEMEMASCOT.header.TM_sidePanelReveal();
                THEMEMASCOT.header.TM_scroolToTopOnClick();
                THEMEMASCOT.header.TM_scrollToFixed();
                THEMEMASCOT.header.TM_topnavAnimate();
                THEMEMASCOT.header.TM_scrolltoTarget();
                THEMEMASCOT.header.TM_menuzord();
                THEMEMASCOT.header.TM_navLocalScroll();
                THEMEMASCOT.header.TM_menuCollapseOnClick();
                THEMEMASCOT.header.TM_homeParallaxFadeEffect();
                THEMEMASCOT.header.TM_topsearch_toggle();
            }, 0);

        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------- Side Push Panel ---------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_sidePanelReveal: function () {
            $(".has-side-panel").on("click", ".side-panel-trigger", function (e) {
                $body.toggleClass("side-panel-open");
                if ($body.hasClass("device-touch")) {
                    $body.toggleClass("ohidden");
                }
                return false;
            });

            $(".has-side-panel").on("click", ".body-overlay", function (e) {
                $body.toggleClass("side-panel-open");
                return false;
            });

            //sitebar tree
            $(".has-side-panel").on("click", ".side-panel-nav .nav .tree-toggler", function (e) {
                $(this).parent().children("ul.tree").toggle(300);
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- scrollToTop  ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_scroolToTop: function () {
            if ($window.scrollTop() > 600) {
                $(".scrollToTop").fadeIn();
            } else {
                $(".scrollToTop").fadeOut();
            }
        },

        TM_scroolToTopOnClick: function () {
            $(document.body).on("click", ".scrollToTop", function (e) {
                $("html, body").animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        },

        /* ---------------------------------------------------------------------------- */
        /* --------------------------- One Page Nav close on click -------------------- */
        /* ---------------------------------------------------------------------------- */
        TM_menuCollapseOnClick: function () {
            $(document).on("click", ".onepage-nav a", function (e) {
                $(".showhide").trigger("click");
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ----------- Active Menu Item on Reaching Different Sections ---------- */
        /* ---------------------------------------------------------------------- */
        TM_activateMenuItemOnReach: function () {
            var $onepageNav = $(".onepage-nav");
            var curPos = $window.scrollTop() + 2;
            var navHeight = $onepageNav.outerHeight();
            $sections.each(function () {
                const top = $(this).offset().top - navHeight - 80;
                const bottom = top + $(this).outerHeight();

                if (curPos >= top && curPos <= bottom) {
                    $onepageNav.find("a").parent().removeClass("current").removeClass("active");
                    $sections.removeClass("current").removeClass("active");

                    //$(this).addClass('current').addClass('active');
                    $onepageNav.find(`a[href="#${$(this).attr("id")}"]`).parent().addClass("current").addClass("active");
                }
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------- on click scrool to target with smoothness -------- */
        /* ---------------------------------------------------------------------- */
        TM_scrolltoTarget: function () {
            //jQuery for page scrolling feature - requires jQuery Easing plugin
            $(".smooth-scroll-to-target, .fullscreen-onepage-nav a").on("click", function (e) {
                e.preventDefault();

                const $anchor = $(this);

                const $hearderTop = $(".header .header-nav");
                var hearderTopOffset = 0;
                if ($hearderTop[0]) {
                    hearderTopOffset = $(".header .header-nav").outerHeight(true);
                } else {
                    hearderTopOffset = 0;
                }

                const top = $($anchor.attr("href")).offset().top - hearderTopOffset;
                $("html, body").stop().animate({
                    scrollTop: top
                }, 1500, "easeInOutExpo");

            });
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------- Scroll navigation ------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_navLocalScroll: function () {
            const dataOffset = -60;
            $("#menuzord .menuzord-menu, #menuzord-right .menuzord-menu").localScroll({
                target: "body",
                duration: 800,
                offset: dataOffset,
                easing: "easeInOutExpo"
            });

            $("#menuzord-side-panel .menuzord-menu, #menuzord-verticalnav .menuzord-menu").localScroll({
                target: "body",
                duration: 800,
                offset: 0,
                easing: "easeInOutExpo"
            });
        },

        /* ---------------------------------------------------------------------------- */
        /* --------------------------- collapsed menu close on click ------------------ */
        /* ---------------------------------------------------------------------------- */
        TM_scrollToFixed: function () {
            $(".navbar-scrolltofixed").scrollToFixed();
            $(".scrolltofixed").scrollToFixed({
                marginTop: $(".header .header-nav").outerHeight(true) + 10,
                limit: function () {
                    const limit = $(".footer").offset().top - $(this).outerHeight(true) - 10;
                    return limit;
                }
            });
        },

        /* ----------------------------------------------------------------------------- */
        /* --------------------------- Menuzord - Responsive Megamenu ------------------ */
        /* ----------------------------------------------------------------------------- */
        TM_menuzord: function () {
            $("#menuzord").menuzord({
                align: "left",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
            });
            $("#menuzord-right").menuzord({
                align: "right",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
            });
            $("#menuzord-side-panel").menuzord({
                align: "right",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "<i class='fa fa-angle-right'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
            });

            $("#menuzord-verticalnav").menuzord({
                align: "right",
                effect: "slide",
                animation: "none",
                indicatorFirstLevel: "<i class='fa fa-angle-right'></i>",
                indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
            });
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Waypoint Top Nav Sticky ------------------ */
        /* ---------------------------------------------------------------------- */
        TM_topnavAnimate: function () {
            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated").removeClass("animated-active");
            } else {
                $(".navbar-sticky-animated").addClass("animated-active");
            }

            if ($window.scrollTop() > (50)) {
                $(".navbar-sticky-animated .header-nav-wrapper .container").removeClass("pt-10").removeClass("pb-10");
            } else {
                $(".navbar-sticky-animated .header-nav-wrapper .container").addClass("pt-10").addClass("pb-10");
            }
        },

        /* ---------------------------------------------------------------------- */
        /* ---------------- home section on scroll parallax & fade -------------- */
        /* ---------------------------------------------------------------------- */
        TM_homeParallaxFadeEffect: function () {
            if ($window.width() >= 1200) {
                const scrolled = $window.scrollTop();
                $(".content-fade-effect .home-content .home-text").css("padding-top", (scrolled * 0.0610) + "%").css("opacity", 1 - (scrolled * 0.00120));
            }
        },

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Top search toggle  ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_topsearch_toggle: function () {
            $(document.body).on("click", "#top-search-toggle", function (e) {
                e.preventDefault();
                $(".search-form-wrapper.toggle").toggleClass("active");
                return false;
            });
        }

    };

    THEMEMASCOT.widget = {

        init: function () {

            const t = setTimeout(function () {
                THEMEMASCOT.widget.TM_masonryIsotop();
                THEMEMASCOT.widget.TM_progressBar();
                THEMEMASCOT.widget.TM_funfact();
                THEMEMASCOT.widget.TM_accordion_toggles();
                //THEMEMASCOT.widget.TM_tooltip();
            }, 0);

        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- Masonry Isotope ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_masonryIsotop: function () {
            var isotopeMode;
            if ($portfolioGallery.hasClass("masonry")) {
                isotopeMode = "masonry";
            } else {
                isotopeMode = "fitRows";
            }

            //isotope firsttime loading
            $portfolioGallery.imagesLoaded(function () {
                $portfolioGallery.isotope({
                    itemSelector: ".gallery-item",
                    layoutMode: isotopeMode,
                    filter: "*"
                });
            });

            //isotope filter
            $(document.body).on("click", portfolioFilter, function (e) {
                $(portfolioFilter).removeClass("active");
                $(this).addClass("active");
                const fselector = $(this).data("filter");

                $portfolioGallery.isotope({
                    itemSelector: ".gallery-item",
                    layoutMode: isotopeMode,
                    filter: fselector
                });
                return false;
            });
        },

        TM_portfolioFlexSliderGalleryPopUpInit: function () {
            const $flexSliders = $portfolioGallery.find(".slides");
            $flexSliders.each(function () {
                //const items = $(this).find("li > a");
                const items = [];
                for (let i = 0; i < _items.length; i++) {
                    items.push({src: $(_items[i]).attr("href"), title: $(_items[i]).attr("title")});
                }
                $(this).parent().parent().parent().find(".icons-holder").magnificPopup({
                    items: items,
                    type: "image",
                    gallery: {
                        enabled: true
                    }
                });
            });
        },

        TM_isotopeGridRearrange: function () {
            var isotopeMode;
            if ($portfolioGallery.hasClass("masonry")) {
                isotopeMode = "masonry";
            } else {
                isotopeMode = "fitRows";
            }
            $portfolioGallery.isotope({
                itemSelector: ".gallery-item",
                layoutMode: isotopeMode
            });
        },

        TM_isotopeGridShuffle: function () {
            $portfolioGallery.isotope("shuffle");
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------- progress bar / horizontal skill bar -------------- */
        /* ---------------------------------------------------------------------- */
        TM_progressBar: function () {
            const $progressBar = $(".progress-bar");
            $progressBar.appear();
            $(document.body).on("appear", ".progress-bar", function () {
                const currentItem = $(this);
                if (!currentItem.hasClass("appeared")) {
                    const percent = currentItem.data("percent");
                    const barcolor = currentItem.data("barcolor");
                    currentItem.append(`<span class="percent">${percent}%</span>`).css("background-color", barcolor).css("width", percent + "%").addClass("appeared");
                }

            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------ Funfact Number Counter ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_funfact: function () {
            var $animateNumber = $(".animate-number");
            $animateNumber.appear();
            $(document.body).on("appear", ".animate-number", function () {
                $animateNumber.each(function () {
                    const currentItem = $(this);
                    if (!currentItem.hasClass("appeared")) {
                        currentItem.animateNumbers(currentItem.attr("data-value"), parseInt(currentItem.attr("data-animation-duration"), 10)).addClass("appeared");
                    }
                });
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------- accordion & toggles ------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_accordion_toggles: function () {
            const $panelGroupCollapse = $(".panel-group .collapse");
            $panelGroupCollapse.on("show.bs.collapse", function (e) {
                $(this).closest(".panel-group").find(`[href='#${$(this).attr("id")}']`).addClass("active");
            });
            $panelGroupCollapse.on("hide.bs.collapse", function (e) {
                $(this).closest(".panel-group").find(`[href='#${$(this).attr("id")}']`).removeClass("active");
            });
        },

        /* ---------------------------------------------------------------------- */
        /* ------------------------------- tooltip  ----------------------------- */
        /* ---------------------------------------------------------------------- */
        TM_tooltip: function () {
            $('[data-toggle="tooltip"]').tooltip();
        },
    };

    THEMEMASCOT.slider = {

        init: function () {

            const t = setTimeout(function () {
                THEMEMASCOT.slider.TM_typedAnimation();
                THEMEMASCOT.slider.TM_owlCarousel(); // Partners & Packages
                THEMEMASCOT.slider.TM_bxslider(); // Testimonials
            }, 0);

        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------- Typed Text Carousel  ---------------------- */
        /* ---------------------------------------------------------------------- */
        TM_typedAnimation: function () {
            if ($(".typed-text-carousel").length) {
                $(".typed-text-carousel").each(function () {
                    const string1 = $(this).find("span:first-child").text();
                    const string2 = $(this).find("span:nth-child(2)").text();
                    const string3 = $(this).find("span:nth-child(3)").text();
                    var str = "";
                    const $this = $(this);
                    if (!string2.trim() || !string3.trim()) {
                        str = [string1];
                    }
                    if (!string3.trim() && string2.length) {
                        str = [string1, string2];
                    }
                    if (string1.length && string2.length && string3.length) {
                        str = [string1, string2, string3];
                    }
                    const speed = $(this).data("speed");
                    const backDelay = $(this).data("back_delay");
                    const loop = $(this).data("loop");
                    $(this).typed({
                        strings: str,
                        typeSpeed: speed,
                        backSpeed: 0,
                        backDelay: backDelay,
                        cursorChar: "|",
                        loop: loop,
                        contentType: "text",
                        loopCount: false
                    });
                });
            }
        },

        /* ---------------------------------------------------------------------- */
        /* -------------------------------- Owl Carousel  ----------------------- */
        /* ---------------------------------------------------------------------- */
        TM_owlCarousel: function () {
            $(".owl-carousel-1col, .text-carousel, .image-carousel, .fullwidth-carousel").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: dataDuration,
                    loop: true,
                    items: 1,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="pe-7s-angle-left"></i>',
                        '<i class="pe-7s-angle-right"></i>'
                    ]
                });
            });

            $(".vehicle-carousel-2col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: false,
                    autoplayTimeout: dataDuration,
                    loop: false,
                    items: 2,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 1,
                            center: false
                        },
                        750: {
                            items: 2,
                            center: false
                        },
                        960: {
                            items: 2
                        },
                        1170: {
                            items: 2
                        },
                        1300: {
                            items: 2
                        }
                    }
                });
            });

            $(".owl-carousel-2col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: dataDuration,
                    loop: true,
                    items: 2,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 1,
                            center: false
                        },
                        750: {
                            items: 2,
                            center: false
                        },
                        960: {
                            items: 2
                        },
                        1170: {
                            items: 2
                        },
                        1300: {
                            items: 2
                        }
                    }
                });
            });

            $(".owl-carousel-3col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: dataDuration,
                    loop: true,
                    items: 3,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 1,
                            center: false
                        },
                        750: {
                            items: 2,
                            center: false
                        },
                        960: {
                            items: 2
                        },
                        1170: {
                            items: 3
                        },
                        1300: {
                            items: 3
                        }
                    }
                });
            });

            $(".owl-carousel-4col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: dataDuration,
                    loop: true,
                    items: 4,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 1,
                            center: false
                        },
                        750: {
                            items: 2,
                            center: false
                        },
                        960: {
                            items: 3
                        },
                        1170: {
                            items: 4
                        },
                        1300: {
                            items: 4
                        }
                    }
                });
            });

            $(".owl-carousel-5col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: dataDuration,
                    loop: true,
                    items: 5,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 2,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 4
                        },
                        1170: {
                            items: 5
                        },
                        1300: {
                            items: 5
                        }
                    }
                });
            });

            $(".owl-carousel-6col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: dataDuration,
                    loop: true,
                    items: 6,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 2,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 4
                        },
                        1170: {
                            items: 6
                        },
                        1300: {
                            items: 6
                        }
                    }
                });
            });

            $(".owl-carousel-7col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                const dataDuration = ($(this).data("duration") === undefined) ? 4000 : $(this).data("duration");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: dataDuration,
                    loop: true,
                    items: 7,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 2,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 4
                        },
                        1170: {
                            items: 7
                        },
                        1300: {
                            items: 7
                        }
                    }
                });
            });

            $(".owl-carousel-8col").each(function () {
                const dataDots = ($(this).data("dots") === undefined) ? false : $(this).data("dots");
                const dataNav = ($(this).data("nav") === undefined) ? false : $(this).data("nav");
                $(this).owlCarousel({
                    rtl: THEMEMASCOT.isRTL.check(),
                    autoplay: true,
                    autoplayTimeout: 4000,
                    loop: true,
                    items: 8,
                    margin: 15,
                    dots: dataDots,
                    nav: dataNav,
                    navText: [
                        '<i class="fa fa-angle-left"></i>',
                        '<i class="fa fa-angle-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                            center: false
                        },
                        600: {
                            items: 2,
                            center: false
                        },
                        750: {
                            items: 3,
                            center: false
                        },
                        960: {
                            items: 5
                        },
                        1170: {
                            items: 8
                        },
                        1300: {
                            items: 8
                        }
                    }
                });
            });

        },

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- BxSlider  ------------------------------ */
        /* ---------------------------------------------------------------------- */
        TM_bxslider: function () {
            $(".bxslider").each(function () {
                const dataMinslides = ($(this).data("minslides") === undefined) ? "2" : $(this).data("minslides");
                $(this).bxSlider({
                    mode: "vertical",
                    minSlides: dataMinslides,
                    slideMargin: 25,
                    pager: false,
                    prevText: '<i class="fa fa-angle-left"></i>',
                    nextText: '<i class="fa fa-angle-right"></i>'
                });
            });

            $(".bxslider-one-col").each(function () {
                const dataMinslides = ($(this).data("minslides") === undefined) ? "1" : $(this).data("minslides");
                $(this).bxSlider({
                    mode: "vertical",
                    minSlides: dataMinslides,
                    slideMargin: 25,
                    pager: false,
                    prevText: '<i class="fa fa-angle-left"></i>',
                    nextText: '<i class="fa fa-angle-right"></i>'
                });
            });
        },
    };

    THEMEMASCOT.documentOnResize = {

        init: function () {

            const t = setTimeout(function () {
                THEMEMASCOT.initialize.TM_equalHeightDivs();
                THEMEMASCOT.initialize.TM_resizeFullscreen();
            }, 0);

        }

    };

    THEMEMASCOT.documentOnLoad = {

        init: function () {

            const t = setTimeout(function () {
                THEMEMASCOT.initialize.TM_wow();
                THEMEMASCOT.initialize.TM_preLoaderOnLoad();
                THEMEMASCOT.initialize.TM_hashForwarding();
                THEMEMASCOT.initialize.TM_parallaxBgInit();
            }, 0);

            $window.trigger("scroll");
            $window.trigger("resize");

        }

    };

    //document ready
    THEMEMASCOT.documentOnReady = {

        init: function () {
            THEMEMASCOT.initialize.init();
            THEMEMASCOT.header.init();
            THEMEMASCOT.slider.init();
            THEMEMASCOT.widget.init();
            THEMEMASCOT.documentOnReady.windowscroll();
        },

        windowscroll: function () {

            $window.on("scroll", function () {

                THEMEMASCOT.header.TM_scroolToTop();
                THEMEMASCOT.header.TM_activateMenuItemOnReach();
                THEMEMASCOT.header.TM_topnavAnimate();

            });
        }

    };

    /* ---------------------------------------------------------------------- */
    /* -------------------------- Declare Variables ------------------------- */
    /* ---------------------------------------------------------------------- */
    var $window = $(window),
        $html = $("html"),
        $body = $("body");
    const $wrapper = $("#wrapper");
    const $header = $("#header");
    const $footer = $("#footer");
    var $sections = $("section"),
        $portfolioGallery = $(".gallery-isotope"),
        portfolioFilter = ".portfolio-filter a";
    const $portfolioFilterFirstChild = $(".portfolio-filter a:eq(0)");
    const $portfolioFlexSlider = $(".portfolio-slider");

    /* ---------------------------------------------------------------------- */
    /* ---------------------------- Call Functions -------------------------- */
    /* ---------------------------------------------------------------------- */
    THEMEMASCOT.initialize.TM_preLoaderClickDisable();
    $(document).ready(THEMEMASCOT.documentOnReady.init);
    $window.on("load", THEMEMASCOT.documentOnLoad.init);
    $window.on("resize", THEMEMASCOT.documentOnResize.init);

})(jQuery);

$(document).ready(function () {

    $(document).on("show.bs.modal", "#bootstrapModal", function (e) {
        /*var button = $(e.relatedTarget)
        console.log(button);
        var dataURL = $(e.relatedTarget).attr('data-href');
        console.log(dataURL);
        var modal = $(this);*/
        $(this).find(".modal-content").load($(e.relatedTarget).attr("data-href"), function () {
            console.log("modal loaded");
        });
    });

    $(document).on("show.bs.modal", "#bootstrapModal", function (event) {
        $("#bootstrapModal").removeData();
    });

    $("body").on("hidden.bs.modal", ".modal", function () {
        $(this).removeData("bs.modal");
        $(`#${$(this).attr("id")} .modal-content`).empty();
        $(`#${$(this).attr("id")} .modal-content`).append("Loading...");
    });

});

$(document).ready(function () {
    $(".interval-range").each(function () {
        var id = $(this).attr("id");
        const targetId = $(this).data("target");
        $(`#${targetId}`).slider({
            range: true,
            min: 0,
            max: 200000,
            step: 10000,
            values: [10000, 70000],
            slide: function (event, ui) {
                $(`#${id}`).val(ui.values[0] + "km (24 months) - " + ui.values[1] + "km (60 months)");
            }
        });

        $(`#${id}`).val($(`#${targetId}`).slider("values", 0) +
            "km (24 months) - " + $(`#${targetId}`).slider("values", 1) + "km (60 months)");
    });
});