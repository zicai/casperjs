/*global jQuery prettyPrint*/

/**
 * CasperJS website js code. Steal if you care, enjoy if you dare.
 */
jQuery(function($) {
    "use strict";
    // pretty printing, only when needed
    $('pre').each(function() {
        if ($(this).find('code[class]').length === 1) {
            $(this).addClass('prettyprint');
        }
    });
    prettyPrint();
    // topbar
    $(".collapse").collapse();
    // apitoc
    function checkApiTocLinks() {
        $('.apitoc a[class*="hashactive"]').removeClass('hashactive');
        $('.apitoc a[href="' + window.location.hash + '"]').addClass('hashactive');
    }
    $(window).bind('hashchange', checkApiTocLinks);
    checkApiTocLinks();
    (function($) {
        var containerSelector = 'section';
        var padding = 50;
        var elements = $('.apitoc');
        var initials = [];
        function wpHeight() {
            return window.innerHeight - padding;
        }
        // sizes
        function size() {
            $('.apitoc').each(function() {
                if ($(this).height() > wpHeight()) {
                    $(this).css('height', (wpHeight() - 15) + 'px')
                        .css('overflow-y', 'scroll')
                        .css('overflow-x', 'hidden');
                }
            });
        }
        function position(i, initial) {
            var element = initial.element;
            var container = initial.container;
            var sy = window.scrollY;
            var ep = element.position().top;
            var eh = element.height();
            var cl = container.position().left;
            var ct = container.position().top;
            var cw = container.width();
            var ch = container.height();
            var cp = element.css('position');
            var mp = ct + ch - eh;
            var em = element.position().left;
            var ew = element.width();
            if (window.innerHeight < eh) {
                return;
            }
            if (sy > ep && sy < mp && cp !== "fixed") {
                element.css('position', 'fixed')
                    .css('top', padding)
                    .css('left', em)
                    .css('margin-top', initial.margintop)
                    .width(ew);
            } else if (cp === "fixed") {
                if (sy < ct + padding) {
                    element.css('position', initial.position).css('margin-top', initial.margintop);
                } else if (sy >= mp) {
                    element.css('position', initial.position).css('margin-top', (ch - eh - padding - 30));
                }
                element.css('left', cl + cw - ew - 30);
            }
        }
        elements.each(function(i, element) {
            element = $(element);
            initials.push({
                element:    element,
                container:  element.parents(containerSelector),
                position:   element.css('position'),
                top:        element.position().top,
                left:       element.position().left,
                margintop:  element.css('margin-top')
            });
        });
        size();
        window.onscroll = function() {
            $(initials).each(position);
        };
        window.onresize = function() {
            size();
            $(initials).each(position);
        };
    })(window.jQuery);

    // subnav scroll
    $(document).scroll(function() {
        var subnav = $('.subnav');
        if (!subnav.length) {
            return;
        }
        // If has not activated (has no attribute "data-top"
        if (!subnav.attr('data-top')) {
            // If already fixed, then do nothing
            if (subnav.hasClass('subnav-fixed')) {
                return;
            }
            // Remember top position
            subnav.attr('data-top', subnav.offset().top);
        }
        if (subnav.attr('data-top') - subnav.outerHeight() <= $(this).scrollTop()) {
            subnav.addClass('subnav-fixed');
        } else {
            subnav.removeClass('subnav-fixed');
        }
    });

    // title anchors
    $('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function(i, elem) {
        var $title = $(elem);
        var $anchor = $('<a/>').attr('href', '#' + $title.attr('id'))
                              .addClass('anchor')
                              .text(' ¶')
        $title.append($anchor);
    });
});
