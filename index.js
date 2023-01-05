$(document).ready(function(){
    console.log('document loaded');
  
  $('#project1Link').click(function(){         $("#mainContainer").load("project1/project1inline.html");
    //$('div.navbar-collapse.collapse').removeClass('show')
    $('div.navbar-collapse').collapse('hide');
  }); 
});