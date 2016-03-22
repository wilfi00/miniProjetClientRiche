$(document).ready(function()
{
  // Tabs
  $(function()
  {
    $( "#tabs" ).tabs();
  });

  // Modal dialog
  $(function()
  {
    $("#dialog").dialog({
      buttons: [
      {
        text: "OK",
        click: function() {
          $( this ).dialog( "close" );
        }
      }]
  });
});
});
