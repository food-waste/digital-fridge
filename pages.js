var first_name = "";

$(function(){
  if (first_name != "") {
    $('nav h1').html(first_name + '\'s Kitchen');
  } else {
    $('nav h1').html('Your Kitchen');
  }
});

$(function(){
   $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });
});

$(function(){
  $('#login_button').click(function(){
    if($('#login_username').val() == ""){
      $('.nouser').show();
    } if ($('#login_password').val() == "") {
      $('.nopwd').show();
    } else {
      window.location.href = 'kitchen.html';
      return false;
    }
  });
});

$(function(){
  $('#create_button').click(function(){
    if($('#first_name').val() == ""){
      $('.noname').show();
    } if ($('#create_username').val() == "") {
      $('.nouserc').show();
    } if ($('#create_password').val() == "") {
      $('.nopwdc').show();
    } if ($('#create_email').val() == "") {
      $('.noemail').show();
    } else {
      first_name = $('#first_name').val();
      window.location.href = 'kitchen.html';
      return false;
    }
  });
});
