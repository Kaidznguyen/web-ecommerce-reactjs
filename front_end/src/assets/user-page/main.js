/* global $ */
$(document).ready(function () {
    // hàm hiển thị đăng nhập
    $('.login').click(function () {
        $('.modal-login').css('display', 'flex');
        return false;
    });
    // hàm chuyển đổi form đăng nhập sang đăng ký
    $('#switch-dk').click(function () {
        $('.modal-login').css('display', 'none');
        $('.modal-register').css('display', 'flex');
    });
    // đóng hàm đăng nhập
    $('.back-btn').click(function () {
        $('.modal-login').css('display', 'none');
    });
    // hảm hiển thị đăng ký
    $('.register').click(function () {
        $('.modal-register').css('display', 'flex');
        return false;
    });
    // hàm chuyển đổi form đăng ký sang đăng đăng nhập
    $('#switch-dn').click(function () {
        $('.modal-register').css('display', 'none');
        $('.modal-login').css('display', 'flex');
    });
    // đóng hàm đăng ký
    $('.back-btn').click(function () {
        $('.modal-register').css('display', 'none');
    });
    // hàm hiển thị thông báo
    $('.help').click(function () {
        alert('Chức năng đang trong quá trình thực hiện, hãy thử lại sau!!!');
        return false;
    });
    // hàm ấn tim đổi màu
    $('.feedback-img-icon_item').click(function () {
        if ($(this).hasClass('feedback-img-icon-like')) {
            $(this).removeClass('feedback-img-icon-like')
            return false;
        }
        else {
            $(this).addClass('feedback-img-icon-like')
            return false;
        }
    });
    // hàm về đầu trang
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('.backtop').fadeIn();
        }
        else {
            $('.backtop').fadeOut();
        }
    });
    $('.backtop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });
    $('.btn-login').click(function () {
        $('.modal-login').css('display', 'none');
        $('.login,.register').addClass('hidden__user')
        $('.hd__navbar-user').addClass('active__user')
    });
    // hàm ẩn tab_content
    $('.tabs-content-item').hide();
    // hàm hiển thị tab_content đầu tiên
    $('.tabs-content-item:first-child').fadeIn();
    // hàm chuyển class active 
    $('.tabs-item').click(function () {
        // active nav tabs
        $('.tabs-item').removeClass('active');
        $(this).addClass('active');
        // show tabs content item
        let id_tab_content = $(this).children('a').attr('href');
        $('.tabs-content-item').hide();
        $(id_tab_content).fadeIn();
        return false;
    });

});