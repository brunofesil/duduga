jQuery(document).ready(function ($) {

    $("#wpadminbar").css("position", "fixed");

    var back_to_top = $('.scroll-top');

    var fixed = $('.scroll-fixed');
    var footer = $('.footer-main');
    var width = fixed.width();
    var height = fixed.height();

    //console.log(height);

    var startScroll = (fixed.length > 0) ? fixed.offset().top : 0;
    var endScroll = (footer.length > 0) ? $('.footer-main').offset().top - height - 400 : 0;

    $(window).scroll(function () {

        var scroll = $(this).scrollTop();

        (scroll > 500) ? back_to_top.addClass('show') : back_to_top.removeClass('show');

        if (scroll > endScroll) {

            fixed.removeClass('scroll-fixed_on');

            fixed.css({
                'top': 'auto',
                'width': 'auto',
                'height': 'auto'

            });

            //console.log('3');
        } else if (scroll < startScroll) {

            fixed.removeClass('scroll-fixed_on');

            fixed.css({
                'top': 'auto',
                'width': 'auto',
                'height': 'auto'

            });

            //console.log('1');
        } else {

            fixed.addClass('scroll-fixed_on');

            fixed.css({
                'top': function () {
                    if ($('.block-warning.-top').outerHeight() > 0) {
                        return $('.block-warning.-top').outerHeight() + $('#wpadminbar').outerHeight() + 5;
                    } else {
                        return 15;
                    }
                },
                'width': width + 'px',
                'height': height + 'px'

            });

            //console.log('2');
        }
    });

    $('.scroll-top').on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({scrollTop: 0}, 700);
    });

    $('a.wwp-anchor').on('click', function(event) {

        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    $('.btn-share').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('data-url'), 'ShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });

    $('.btnbestread').click(function () {
        $(this).toggleClass("-active");
        $("#sidebar-main").fadeToggle("slow", "swing");

        setTimeout(function () {

            if ($('#content-main').hasClass('wolfwp-sidebar-active')) {
                $("#content-main").toggleClass("col-md-9").toggleClass('col-md-push-3');
                $("#content-main").toggleClass("col-md-10").toggleClass('col-md-push-1');
            }
        }, 1000);

    });

    $('.btn-searchtop > a').click(function () {
        $(".btn-searchtop").toggleClass('active');

        var icon = $('.btn-searchtop i');

        if(icon.hasClass('fa-search')){
            icon.removeClass();
            icon.addClass('fa fa-times');
        }else{
            icon.removeClass();
            icon.addClass('fa fa-search');
        }

        $('.search-top').fadeToggle("fast", "linear");
        $('#searchtop').focus();
        return false;
    });

    $(".wwp-breadcrumb > li + li").prepend('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    $(".lists-aside .aside-item.-link").last().addClass("-last");

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('img.alignleft, img.alignright, img.alignnone, img.aligncenter').attr('height', 'auto');

    // Responsive Embed Video 
    $("#content-main .page-internal .content").find('iframe').each(function () {

        var block_video = $(this).parent().parent('.wp-block-embed-youtube, .wp-block-embed-vimeo');

        if (block_video.length > 0) {
            return;
        }

        var url = $(this).attr('src');

        if (url.length > 0 && (url.indexOf('youtube.com') >= 0 || url.indexOf('vimeo.com') >= 0)) {
            $(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
            $(this).addClass("embed-responsive-item");
        }

    });

    /**
     * Warnings
     */
    if (wwpGetCookie('wwp-warning_closed') !== 1) {
        $(".block-warning").removeClass('hidden');
    }

    $('.block-warning > .btnclose').click(function () {

        $(".block-warning").fadeOut(500, function () {
            $(this).remove();
        });

        $("body").css("margin", "0px");

        wwpSetCookie('warning_closed', 1, 1);

        return false;
    });

    /**
     * Align Elements
     */
    var heightTopWarning = $('.block-warning.-top').outerHeight();
    var heightWPAdminBar = $('#wpadminbar').outerHeight();
    var heightBottomWarning = $('.block-warning.-bottom').outerHeight();
    var heigthFormTop = $('.page-header .conversion-block').outerHeight();

    $('body').css("margin-top", heightTopWarning);
    $('.block-warning.-top').css("margin-top", heightWPAdminBar);
    $('body').css("margin-bottom", heightBottomWarning);
    $('.scroll-top').css("bottom", heightBottomWarning + 10);

    if (null !== heigthFormTop) {
        $('.page-header').css("margin-bottom", heigthFormTop / 2);
        $('.page-header > .secondary').css("margin-bottom", (heigthFormTop / 2) * -1);
    } else {
        $('.page-header').addClass('-large');
    }

    $(window).resize(function (e) {

        heightTopWarning = $('.block-warning.-top').outerHeight();
        heightWPAdminBar = $('#wpadminbar').outerHeight();
        heightBottomWarning = $('.block-warning.-bottom').outerHeight();
        heigthFormTop = $('.page-header .conversion-block').outerHeight();

        $('body').css("margin-top", heightTopWarning);
        $('.block-warning.-top').css("margin-top", heightWPAdminBar);
        $('body').css("margin-bottom", heightBottomWarning);
        $('.scroll-top').css("bottom", heightBottomWarning + 10);

        if (null !== heigthFormTop) {
            $('.page-header').css("margin-bottom", heigthFormTop / 2);
            $('.page-header > .secondary').css("margin-bottom", (heigthFormTop / 2) * -1);
        } else {
            $('.page-header').addClass('-large');
        }
    });

    /**
     * Validate Forms Capture
     */
    $('.form-data').on('submit', function (e) {

        var haveError = false;

        $(this).find('input').each(function () {

            if (($(this).attr('type') === 'email') && ($(this).val() === '' || !wwpValidateEmail($(this).val()))) {
                $(this).addClass('-error');
                haveError = true;
            } else if ($(this).prop('required') && $(this).val() === '') {
                $(this).addClass('-error');
                haveError = true;
            } else if ($(this).attr('type') === 'checkbox' && $(this).prop('required') && !$(this).prop('checked')) {
                $(this).addClass('-error');
                haveError = true;
            } else {
                $(this).removeClass('-error');
            }
        });


        if (haveError === true) {
            //$(this).find('.result').html('<div class="alert alert-danger" style="margin: 0 auto; text-align:center; max-width: 300px; padding: 5px 10px;">Preencha os campos obrigatórios corretamente!</div>');
            e.preventDefault();
        } else if ($(this).hasClass('-capture')) {

            wwpSetCookie('privacy_accept', 1);

            if ($(this).hasClass('-output-capture')) {
                var idModal = String($(this).closest('#output-capture').attr('data-id'));
                localStorage.setItem('wwp_output_capture-' + idModal, 'true');

                $('#output-capture').modal('hide');
            }

            $(this).after('<div class="alert alert-success" style="margin: 0 auto; text-align:center; max-width: 300px; padding: 5px 10px;">Enviado!</div>');
            $(this).hide('slow');
        }
    });

    $('.form-data.-capture input').focusout(function () {
        if (($(this).attr('type') === 'email') && ($(this).val() !== '' && !wwpValidateEmail($(this).val()))) {
            $(this).addClass('-error');
        } else {
            $(this).removeClass('-error');
        }
    });

    if(isMobile()){
        $('form.form-data.-capture').attr('target', '_self');
    }

    /**
     * Output Capture
     */
    $(document).on('mouseleave', function () {

        if (sessionStorage !== 'undefined' && $('#output-capture').length) {

            var modal = $('#output-capture');
            var idModal = String(modal.attr('data-id'));

            if (sessionStorage.getItem('wwp_output_capture-' + idModal) !== 'true' &&
                    localStorage.getItem('wwp_output_capture-' + idModal) !== 'true') {

                $('#output-capture').modal('show');
                sessionStorage.setItem('wwp_output_capture-' + idModal, 'true');
            }
        }
    });

    /**
     * Menu
     */
    $(".dropdown-submenu").click(function (event) {
        event.stopPropagation();
        $(this).find(".dropdown-submenu").removeClass('open');
        $(this).parents(".dropdown-submenu").addClass('open');
        $(this).toggleClass('open');
    });

    /**
     * Functions
     */
    function isMobile() {
        if(window.innerWidth <= 800) {
            return true;
        } else {
            return false;
        }
     }

    function wwpValidateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function wwpSetCookie(name, value, days) {
        name = (name) ? name : '';
        days = (days) ? days : 365;

        value = (value) ? JSON.stringify(value) : JSON.stringify([]);

        var expires = 0;
        if (days !== 0) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "expires=" + date.toUTCString();
        }

        document.cookie = 'wwp-' + encodeURIComponent(name) + "=" + value + ";" + expires + ";path=/";
    }

    function wwpGetCookie(name) {
        name = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return JSON.parse(decodeURIComponent(c.substring(name.length, c.length)));
            }
        }
        return "";
    }
});