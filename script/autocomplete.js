$(document).ready(function(){

  $(function() {

    var cities = [
      "Blain",
      "Nantes",
      "La Roche sur Yon",
      "La Ferrière",
      "Le Champ-Saint-Père",
      "Luçon"
    ];

    var autocomp = function(request,response){
      $.ajax({
        url : 'http://infoweb-ens/~jacquin-c/codePostal/commune.php',
        type : 'GET',
        dataType : 'json',
        data : 'commune='+$("#commune").val()+"&maxRows=10",
        success : function(res){
          response($.map(res,function(valeur){
            return {
              label:valeur.Ville,
              valeur:valeur.Ville,
              CodePostal:valeur.CodePostal}
          }));
        },
        error : function(res, statut, erreur){
          alert("Fatal error :/")
        },
        complete : function(res, statut){}
      });
    }

    $( "#commune" ).autocomplete({
      source: autocomp,
      minLength: 3,
      select: function( event, ui ) {
        $("div").text(ui.item.label)
      }
    });
  });
});
