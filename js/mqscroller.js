// **********************************************
// File: mqscroller.js
// Author: Thomas Vaidyakaran
// gitHub: https://github.com/thomasvaidyakaran/mqscroller
// Version: 1.0.0
// **********************************************

(function ($) {
    $.fn.mqScroller = function (options) {

        /* Default settings */
        var defaults = {
            htmlDir: 'auto',            /* Default dir */
            loop: false,                /* Default loop */
            duration: 5000,             /* Default scrolling duration */
            direction: 'left',          /* Default scrolling direction */
            gap: 0,                     /* Default gap between items */
            pauseOnHover: false,        /* Default pause on hover */
            separator: '',              /* Default null */
            cloneCount: 0,              /* Override automatic clone count */
        };

        /* Override default settings with user-defined options */
        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            var mainClass = "mqscroller";
            var groupClass = "mqs-group";
            var itemClass = "mqs-item";
            var marquee = $(this);
            var viewportWidth = $(window).width();


            /* initialize mqScroller function */
            function initializeMarquee() {
                if (!marquee.find('.' + groupClass).length && marquee.hasClass(mainClass)) {

                    /* Items group wrap */
                    marquee.find('.' + itemClass).wrapAll("<div class='" + groupClass + "'></div>");

                    /* Separator */
                    if ((settings.separator !== '')) {
                        if ((settings.loop === false)) {
                            $('<div class="' + itemClass + '">' + settings.separator + '</div>').insertAfter('.' + itemClass + ':not(:last-child)');
                        } else {
                            $('<div class="' + itemClass + '">' + settings.separator + '</div>').insertAfter('.' + itemClass);
                        }
                    }

                    /* Items gap */
                    if ((settings.gap !== 0) && (settings.direction === "left")) {
                        marquee.find('.' + itemClass).css('margin-right', settings.gap + 'px');
                    } else if ((settings.gap !== 0) && (settings.direction === "right")) {
                        marquee.find('.' + itemClass).css('margin-left', settings.gap + 'px');
                    }

                    /* Items group width */
                    $(window).on('load resize', function () {
                        marquee.find('.' + groupClass).css('--mqs-width', marquee.outerWidth() + 'px');
                    });

                    /* Item clone */
                    if (settings.loop) {
                        var group = marquee.find('.' + groupClass);
                        var groupWidth = group.outerWidth();
                        var repeatCount = settings.cloneCount || Math.ceil(viewportWidth / groupWidth);
                        if (repeatCount === Infinity || repeatCount <= 0) {
                            repeatCount = 0;
                        }
                        if (groupWidth < viewportWidth) {
                            var clones = [];
                            if (repeatCount <= 0) {
                                repeatCount = 1
                            }
                            for (var i = 0; i < repeatCount; i++) {
                                clones.push(group.clone().attr('aria-hidden', 'true').addClass('cloned'));
                            }
                            marquee.append(clones);
                        } else {
                            marquee.append(group.clone().attr('aria-hidden', 'true').addClass('cloned'));
                        }
                    }

                    /* Loop or not */
                    if (settings.loop) {
                        marquee.addClass('mqs-loop');
                    }

                    /* htmlDir */
                    if (settings.htmlDir === 'auto') {
                        if ($("html").attr("dir") === 'rtl') {
                            marquee.addClass('mqs-rtl');
                        }
                    } else if (settings.htmlDir === 'rtl') {
                        marquee.addClass('mqs-rtl');
                    }

                    /* Pause on Hover feature */
                    if (settings.pauseOnHover) {
                        marquee.hover(
                            function () { $(this).addClass('mqs-paused'); },
                            function () { $(this).removeClass('mqs-paused'); }
                        );
                    }

                    /* Direction animation */
                    if (settings.direction === "left") {
                        marquee.addClass('mqs-left');
                    } else if (settings.direction === "right") {
                        marquee.addClass('mqs-right');
                    }

                    /* Duration */
                    marquee.css('animation-duration', settings.duration + 'ms');

                    /* Start animation */
                    if (marquee.find('.' + groupClass).length) {
                        marquee.addClass('mqs-loaded');
                        marquee.addClass('mqs-play');
                    }

                }
            }

            /* Initialize trigger */
            initializeMarquee();

            /* destroyMarquee function */
            function destroyMarquee() {
                if (marquee.find('.' + groupClass)) {
                    var clones = [];
                    clones.push(marquee.find('.' + groupClass + ':first-child .' + itemClass).clone());
                    marquee.append(clones);
                    marquee.find('.' + groupClass + ', .cloned').remove();
                    marquee.removeClass('mqs-loaded mqs-play mqs-loop mqs-paused mqs-left mqs-right mqs-rtl');
                }
            }

            /* Listen for initialize trigger */
            marquee.on('initialize.mqscroller', function () {
                initializeMarquee();
            });

            /* Listen for destroy trigger */
            marquee.on('destroy.mqscroller', function () {
                destroyMarquee();
            });

            /* Listen for refresh trigger */
            marquee.on('refresh.mqscroller', function () {
                destroyMarquee();
                initializeMarquee();
            });

        });
    };
}(jQuery));