/* global $ */
$(document).ready(function(){
    // Slider show
    $('.slider-show').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:5000,
        dots: true,
        fade: true,
        cssEase: 'linear',
        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-angle-left'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa-solid fa-angle-right'></i></button>",
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                arrows:false,
            }
            },
            {
            breakpoint: 720,
            settings: {
                arrows:false,
                infinite: false,
            }
            }
        ]
    });
    // Slider show sản phẩm
    $('.slider-product').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        cssEase: 'linear',
        speed: 1000,
        prevArrow:"<button type='button' class='slick-prev pull-left product-arrow'><i class='fa-solid fa-angle-left'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right product-arrow'><i class='fa-solid fa-angle-right'></i></button>",
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows:false,
            }
            },
            {
            breakpoint: 720,
            settings: {
                arrows:false,
                slidesToShow: 2,
                slidesToScroll: 2,
            }
            }
        ]
    });
    // hàm hiển thị đăng nhập
    $('.login').click(function(){
        $('.modal-login').css('display','flex');
        return false;
    });
    // hàm chuyển đổi form đăng nhập sang đăng ký
    $('#switch-dk').click(function(){
        $('.modal-login').css('display','none');
        $('.modal-register').css('display','flex');
    });
    // đóng hàm đăng nhập
    $('.back-btn').click(function(){
        $('.modal-login').css('display','none');
    });
    // hảm hiển thị đăng ký
    $('.register').click(function(){
        $('.modal-register').css('display','flex');
        return false;
    });
    // hàm chuyển đổi form đăng ký sang đăng đăng nhập
        $('#switch-dn').click(function(){
            $('.modal-register').css('display','none');
            $('.modal-login').css('display','flex');
    });
    // đóng hàm đăng ký
    $('.back-btn').click(function(){
        $('.modal-register').css('display','none');
    });
    // hàm hiển thị thông báo
    $('.help').click(function(){
        alert('Chức năng đang trong quá trình thực hiện, hãy thử lại sau!!!');
        return false;
    });
    // hàm ấn tim đổi màu
    $('.feedback-img-icon_item').click(function(){
        if($(this).hasClass('feedback-img-icon-like')){
            $(this).removeClass('feedback-img-icon-like')
            return false;
        }
        else{
            $(this).addClass('feedback-img-icon-like')
            return false;
        }
    });
    // hàm về đầu trang
    $(window).scroll(function(){
        if($(this).scrollTop()){
            $('.backtop').fadeIn();
        }
        else{
            $('.backtop').fadeOut();
        }
    });
    $('.backtop').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });
    $('.btn-login').click(function(){
        $('.modal-login').css('display','none');
        $('.login,.register').addClass('hidden__user')
        $('.hd__navbar-user').addClass('active__user')
    });
});