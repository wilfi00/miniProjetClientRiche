// Fonction qui permet d'ajouter une liste de liens images à la vue photo
function ajout(urlList)
{
  $("#tabs-1").html("");

  $.each(urlList, function(index, value)
  {
    $("#tabs-1").append("<img src='" + value + "'\></img><br/><br/>");

  });

}

// Fonction qui permet d'ajouter une liste de liens, de nom et de position images à la vue table
function ajoutTable(data)
{
  urlIMG = data[0]; // Liste des liens
  nameIMG = data[1]; // Liste des noms
  position = data[2]; // Listes des positions
  var t = $('#photos').DataTable(); // Création de la table
  t.clear();
  // Parcours la liste des liens, des noms et des positions pour les rajouter dans le tableau - fonction row.add
  for(var i = 0; i < urlIMG.length; i++)
  {
      t.row.add([ "<img src='" + urlIMG[i] + "'/>", nameIMG[i], "test2", "test3", position[i] ]);
  }
  t.draw();

}

// Fonction effectue la requête ajax permettant de récupérer les données de géolocalisation
// Fait appel à la fonction addLocalisation en lui passant le résultat de la requête
function geolocalisation(id)
{
  apiKey = '9f6a93b5d37c5b05bd630638f3c952d3';
  $.ajax({
    url : 'https://api.flickr.com/services/rest/',
    type : 'GET',
    dataType: 'xml',
    data : { method : 'flickr.photos.geo.getLocation',api_key : '9f6a93b5d37c5b05bd630638f3c952d3', photo_id : id, format : 'json', jsoncallback : '?'},
    success: function(data){
      addLocalisation(data);
    },
    complete : function(data, status){

    }
  });
}

// Ajoute à la liste globale pLocation (qui contient la localisation des images) la localisation d'une image
function addLocalisation(data){
  alert("test");
  if(data.stat != 'fail') {
    pLocation.push('<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>');
  }
  else{
    pLocation.push("0");
  }
}

// Formatte les données Json envoyé par la requête (fonction research())
// Fais appel aux fonctions geolocalisation, ajout et ajoutTable
function jsonFlickrApi(data) {
  var nbPhotoAPI = data.photos.photo.length;
  if (nbPhotoAPI == 0) {
    alert("Nothing was found :/");
  }
  else {
    photoList = data.photos.photo
    urlTab = [];
    nameTab = [];
    pLocation = [];
    imgNumber = $("#photoNb").val();
    // Implémente la fonctionnalité des photos maximums
    if(imgNumber > nbPhotoAPI){
      imgNumber = nbPhotoAPI;
    }

    for (var i = 0; i < imgNumber; i++)
    {
      farm = photoList[i].farm;
      serv = photoList[i].server;
      id = photoList[i].id;
      secret = photoList[i].secret;
      name = photoList[i].title;
      // Fabrique l'URL de l'image
      urlTab.push("https://farm"+farm+".staticflickr.com/"+serv+"/"+id+"_"+secret+".jpg");
      nameTab.push(name);

      geolocalisation(id);
      pLocation[i] = 0; // Pour éviter les warnings DataTable



    }
    ajout(urlTab); // Envoie les liens pour la vue photo
    ajoutTable([urlTab,nameTab,pLocation]); // Envoie les liens, noms et localisations à la vue table
  }
}
$(document).ready(function(){
  $( "#tabs" ).tabs(); // Fabrique les onglets
  $( "#datepicker" ).datepicker({ // Fabrique le calendrier
    dateFormat: "yy-mm-dd"
  });

  // Fonction qui permet de gérer l'auto-complétion
  $(function() {
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
          alert("Fatal error :/");
        },
        complete : function(res, statut){}
      });
    }

    $( "#commune" ).autocomplete({
      source: autocomp,
      minLength: 3,
    });
  });

  // Fonction qui fait la requête AJAX vers l'API flickr pour récuperer les photos (methode photos.search)
  function research(){
    var comm = $("#commune").val();
    var date = $("datepicker").val();

    $.ajax({
      url : 'https://api.flickr.com/services/rest/',
      type : 'GET',
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      data : { method : 'flickr.photos.search',api_key : '9f6a93b5d37c5b05bd630638f3c952d3', tags : comm, format : 'json', jsoncallback : '?', min_upload_date : date },
      success : function(res){},
      error : function(res, statut, erreur)
      {
        alert("Fatal error :/");
      },
      complete : function(res, statut){}
    });
  }

  $("#search").click(function(){research();});
  // Gére l'appui sur la touche entrée si on est sur le champ de saisie de la commune
  $("#commune").keyup(function (e) {
    if (e.keyCode == 13) {
      research();
    }
  });
  // Gére l'appui sur la touche entrée si on est sur le champ de saisie de la date
  $("#photoNb").keyup(function (e) {
    if (e.keyCode == 13) {
      research();
    }
  });


});
