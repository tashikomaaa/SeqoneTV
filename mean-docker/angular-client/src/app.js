var app = angular.module('App', []);

app.controller('MenuController', function () {

    //For twitter API
    !function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0],
            p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");
});

app.controller('twitterButton', function () {
    window.onload = function () {
        var transitionTime = 0.3;

        $(document).on('click', function (e) {
            var button = document.querySelector('.action-button.is-open');
            if (button) closeActions(button);
        });

        $('.action-button').on('click', function (e) {
            e.stopPropagation();
            var target = e.currentTarget;
            if ($(target).hasClass('is-open')) return;

            openActions(target);
        });

        function closeActions(button) {
            var list = button.querySelector('.action-list');
            var dimensions = {
                width: list.clientWidth,
                height: list.clientHeight
            };

            button.classList.remove('is-open');

            requestAnimationFrame(morphList);

            function moveButton() {
                var buttonPosition = 0;

                list.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';
                button.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';

                list.style.marginRight = '';
                button.style.marginRight = '';
            }

            function morphList() {
                var buttonPosition = dimensions.width / 2 - 30;

                button.style.transition = 'all ' + transitionTime + 's ease';
                list.style.transition = 'all ' + transitionTime + 's ease';

                button.style.marginRight = buttonPosition + 'px';
                list.style.marginRight = -buttonPosition + 'px';

                button.style.width = '';
                button.style.height = '';
                button.style.borderRadius = '';
                button.style.backgroundColor = '';

                list.style.opacity = '';

                $(list).one('transitionend', moveButton);
            }
        }

        function openActions(button) {
            var list = button.querySelector('.action-list');
            var dimensions = {
                width: list.clientWidth,
                height: list.clientHeight
            };

            button.classList.add('is-open');

            requestAnimationFrame(moveButton);

            function moveButton() {
                var buttonPosition = dimensions.width / 2 - 30;

                list.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';
                button.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';

                list.style.marginRight = -buttonPosition + 'px';
                button.style.marginRight = buttonPosition + 'px';

                $(button).one('transitionend', morphButton);
            }

            function morphButton() {
                button.style.transition = 'all ' + transitionTime + 's ease';
                list.style.transition = 'all ' + transitionTime + 's ease';

                button.style.marginRight = '0px';
                list.style.marginRight = '0px';

                button.style.width = dimensions.width + 'px';
                button.style.height = dimensions.height + 'px';
                button.style.borderRadius = '0';
                button.style.backgroundColor = 'rgba(255, 152, 0, 0)';

                list.style.opacity = '1';
            }
        }
    }

})

app.controller('typeText', function () {
    var input;
    var cursor;
    var hiddenInput;
    var content = [];
    var lastContent = "", targetContent = "";
    var inputLock = false;
    var autoWriteTimer;

    var isMobile, isIE;

    var transitionTime = 0.3;
    window.onload = function () {

        $(document).on('click', function (e) {
            var button = document.querySelector('.action-button.is-open');
            if (button) closeActions(button);
        });

        $('.action-button').on('click', function (e) {
            e.stopPropagation();
            var target = e.currentTarget;
            if ($(target).hasClass('is-open')) return;

            openActions(target);
        });

        function closeActions(button) {
            var list = button.querySelector('.action-list');
            var dimensions = {
                width: list.clientWidth,
                height: list.clientHeight
            };

            button.classList.remove('is-open');

            requestAnimationFrame(morphList);

            function moveButton() {
                var buttonPosition = 0;

                list.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';
                button.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';

                list.style.marginRight = '';
                button.style.marginRight = '';
            }

            function morphList() {
                var buttonPosition = dimensions.width / 2 - 30;

                button.style.transition = 'all ' + transitionTime + 's ease';
                list.style.transition = 'all ' + transitionTime + 's ease';

                button.style.marginRight = buttonPosition + 'px';
                list.style.marginRight = -buttonPosition + 'px';

                button.style.width = '';
                button.style.height = '';
                button.style.borderRadius = '';
                button.style.backgroundColor = '';

                list.style.opacity = '';

                $(list).one('transitionend', moveButton);
            }
        }

        function openActions(button) {
            var list = button.querySelector('.action-list');
            var dimensions = {
                width: list.clientWidth,
                height: list.clientHeight
            };

            button.classList.add('is-open');

            requestAnimationFrame(moveButton);

            function moveButton() {
                var buttonPosition = dimensions.width / 2 - 30;

                list.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';
                button.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';

                list.style.marginRight = -buttonPosition + 'px';
                button.style.marginRight = buttonPosition + 'px';

                $(button).one('transitionend', morphButton);
            }

            function morphButton() {
                button.style.transition = 'all ' + transitionTime + 's ease';
                list.style.transition = 'all ' + transitionTime + 's ease';

                button.style.marginRight = '0px';
                list.style.marginRight = '0px';

                button.style.width = dimensions.width + 'px';
                button.style.height = dimensions.height + 'px';
                button.style.borderRadius = '0';
                button.style.backgroundColor = 'rgba(255, 152, 0, 0)';

                list.style.opacity = '1';
            }
        }

        isMobile = navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/);

        isIE = (navigator.appName == 'Microsoft Internet Explorer');

        input = document.getElementById('input');

        hiddenInput = document.getElementById('hiddenInput');
        hiddenInput.focus();

        cursor = document.createElement('cursor');
        cursor.setAttribute('class', 'blink');
        cursor.innerHTML = "|";

        if (!isMobile && !isIE) input.appendChild(cursor);

        function refresh() {

            inputLock = true;

            if (targetContent.length - lastContent.length == 0) return;

            var v = targetContent.substring(0, lastContent.length + 1);

            content = [];

            var blinkPadding = false;

            for (var i = 0; i < v.length; i++) {
                var l = v.charAt(i);

                var d = document.createElement('div');
                d.setAttribute('class', 'letterContainer');

                var d2 = document.createElement('div');

                var animClass = (i % 2 == 0) ? 'letterAnimTop' : 'letterAnimBottom';

                var letterClass = (lastContent.charAt(i) == l) ? 'letterStatic' : animClass;

                if (letterClass != 'letterStatic') blinkPadding = true;

                d2.setAttribute('class', letterClass);

                d.appendChild(d2);

                d2.innerHTML = l;
                content.push(d);
            }

            input.innerHTML = '';

            for (var i = 0; i < content.length; i++) {
                input.appendChild(content[i]);
            }

            cursor.style.paddingLeft = (blinkPadding) ? '22px' : '0';

            if (!isMobile && !isIE) input.appendChild(cursor);

            if (targetContent.length - lastContent.length > 1) setTimeout(refresh, 150);
            else inputLock = false;

            lastContent = v;
        }

        if (document.addEventListener) {

            document.addEventListener('touchstart', function (e) {
                clearInterval(autoWriteTimer);
                targetContent = lastContent;
            }, false);

            document.addEventListener('click', function (e) {
                clearInterval(autoWriteTimer);
                targetContent = lastContent;
                hiddenInput.focus();
            }, false);

            if (!isIE) {
                // Input event is buggy on IE, so don't bother
                // (https://msdn.microsoft.com/en-us/library/gg592978(v=vs.85).aspx#feedback)
                // We will use a timer instead (below)
                hiddenInput.addEventListener('input', function (e) {
                    e.preventDefault();
                    targetContent = hiddenInput.value;
                    if (!inputLock) refresh();

                }, false);
            } else {
                setInterval(function () {
                    targetContent = hiddenInput.value;

                    if (targetContent != lastContent && !inputLock) refresh();
                }, 100);
            }

        }

        hiddenInput.value = "";

        autoWriteTimer = setTimeout(function () {
            if (lastContent != "") return;
            targetContent = "bonjour bienvenue sur SeqoneTV";
            refresh();
        }, 2000);
    }

})


app.controller('navScroll', function () {
    $(document).ready(function () {
        $('#nav-icon1').click(function () {
            $(this).toggleClass('open');
            $('#menu').toggleClass('open');
        });
    });

    $('a[href^="#"]').click(function () {
        var the_id = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(the_id).offset().top
        }, 'slow');
        return false;
    });

    $(document).ready(function () {
        $(window).bind('scroll', function () {
            var navHeight = $(window).height() - 70;
            if ($(window).scrollTop() > navHeight) {
                $('nav').addClass('fixed');
            }
            else {
                $('nav').removeClass('fixed');
            }
        });
    });
});



