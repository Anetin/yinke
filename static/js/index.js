$(function () {
    var size=$(window).width()/18;
    console.log(size);
    $('html').css('font-size',size);
    var scroll_wrapper = new IScroll('#scroll_wrapper');

    function attachEvent(src, cb) {
        $(src).unbind();
        $(src).bind("touchstart", function (event) {
            $(this).data("touchon",true);
            $(this).addClass("pressed");
        });
        $(src).bind("touchend", function (event) {
            $(this).removeClass("pressed");
            if ($(this).data("touchon")) {
                cd.bind(this)();
            }
            $(this).data("touchon",false);
        });
        $(src).bind("touchmove", function (event) {
            $(this).data("touchon",false);
            $(this).removeClass("pressed");
            if ($(this).data("touchon")) {
                cd.bind(this)();
            }
        });
    }

    var scroll_list=$("#scroll_list");
    scroll_list.on("click", ".like-icon",function(e){
        var likenum='';
        if($(this).hasClass('glyphicon-heart')){
            likenum=+$(this).prev().text();
            $(this).removeClass('glyphicon-heart').addClass('glyphicon-heart-empty');
            $(this).prev().html(likenum-1);
        }else if($(this).hasClass('glyphicon-heart-empty')){
            likenum=+$(this).prev().text();
            $(this).prev().html(likenum+1);
            $(this).removeClass('glyphicon-heart-empty').addClass('glyphicon-heart');
        }
        
        
    });
});