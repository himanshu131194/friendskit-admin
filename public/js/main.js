/*! main.js | Friendkit | © Css Ninja. 2018-2019 */

/* ==========================================================================
Main js file
========================================================================== */

$(document).ready(function(){

    "use strict";

    //Change demo images
    function changeDemoImages(){
        $('*[data-demo-src]').each(function () {
            var newSrc = $(this).attr('data-demo-src');
            $(this).attr('src', newSrc);
        });

        $('*[data-demo-background]').each(function () {
            var newBg = $(this).attr('data-demo-background');
            $(this).attr('data-background', newBg);
        });
    }

    $('*[data-demo-href]').each(function () {
        var newHref = $(this).attr('data-demo-href');
        $(this).attr('href', newHref);
    });

    changeDemoImages();

    //Code highlight init
    $('.highlight-block code').each(function (i, block) {
        hljs.highlightBlock(block);
    });

    //Pageloader
    $().initPageloader();

    //Init navbar
    $().initNavbar();

    //Navbar dropdown
    $().initNavDropdowns();

    //Common Dropdown
    $().initDropdowns();

    //Sidebars
    $().initSidebar();

    //Tabs
    $().initTabs();

    //Modals
    // $().initModals();

    //Subnavbar search
    $().initSubSearch();

    //Attribute background images
    $().initBgImages();

    //Feather icons initialization
    feather.replace();

    //Emojis
    $().initEmojis();

    //Load More
    $().initLoadMore();

    //Init tooltips
    $().initTooltips();

    //Init Like Button
    $().initLikeButton();

    //Init Simple Popover
    $().initSimplePopover();

    //Share modal demo
    $().initShareModal();

    //Init Plus Menu
    $().initPlusMenu();

    //Init Tipuedrop
    $('#tipue_drop_input').tipuedrop();

});



//Toast Service
var toasts = {}

toasts.service = {
    info: function (title, icon, message, position, t) {
        iziToast.show({
            class: 'toast',
            icon: icon,
            title: title,
            message: message,
            titleColor: '#fff',
            messageColor: '#fff',
            iconColor: "#fff",
            backgroundColor: '#0062ff',
            progressBarColor: '#bc7aff',
            position: position,
            transitionIn: 'fadeInDown',
            close: false,
            timeout: t,
            zindex: 99999,
        });
    },
    success: function (title, icon, message, position, t) {
        iziToast.show({
            class: 'toast',
            icon: icon,
            title: title,
            message: message,
            titleColor: '#fff',
            messageColor: '#fff',
            iconColor: "#fff",
            backgroundColor: '#0062ff',
            progressBarColor: '#fafafa',
            position: position,
            transitionIn: 'fadeInDown',
            close: false,
            timeout: t,
            zindex: 99999,
        });
    },
    error: function (title, icon, message, position, t) {
        iziToast.show({
            class: 'toast',
            icon: icon,
            title: title,
            message: message,
            titleColor: '#fff',
            messageColor: '#fff',
            iconColor: "#fff",
            backgroundColor: '#ff533d',
            progressBarColor: '#fff',
            position: position,
            transitionIn: 'fadeInDown',
            close: false,
            timeout: t,
            zindex: 99999,
        });
    }
}