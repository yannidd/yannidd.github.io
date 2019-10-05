$(document).ready(function(){
  $('.ext-html').each(function (index) {
    var src = $(this).attr('src');
    $(this).load(src);
  });
});