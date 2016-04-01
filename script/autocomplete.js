function ajout(urlList)
{
  $("#tabs-1").html("");

  $.each(urlList, function(index, value)
  {
    $("#tabs-1").append("<img src='" + value + "'\></img><br/><br/>");

  });

}

function ajoutTable(data)
{
  urlIMG = data[0];
  nameIMG = data[1];
  position = data[2];
  var t = $('#photos').DataTable();
  t.clear();
  for(var i = 0; i < urlIMG.length; i++)
  {
      t.row.add([ "<img src='" + urlIMG[i] + "'/>", nameIMG[i], "test2", "test3", position[i] ]);
  }
  t.draw();

}


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
      urlTab.push("https://farm"+farm+".staticflickr.com/"+serv+"/"+id+"_"+secret+".jpg");
      nameTab.push(name);

      /* Commenter à partir d'ici si tu en as marre des erreurs :o */
      apiKey = '9f6a93b5d37c5b05bd630638f3c952d3';
      $.getJSON('http://api.flickr.com/services/rest/?&amp;method=flickr.photos.geo.getLocation&amp;api_key=' + apiKey + '&amp;photo_id=' + id + '&amp;format=jsonp&amp;jsoncallback=?',
      function(data)
      {
         //if the image has a location, build an html snippet containing the data
         if(data.stat != 'fail')
         {
           pLocation.push('<a href="http://www.flickr.com/map?fLat=' + photoList[i].location.latitude + '&amp;fLon=' + photoList[i].location.longitude + '&amp;zl=1" target="_blank">' + photoList[i].location.locality._content + ', ' + photoList[i].location.region._content + ' (Click for Map)</a>');
         }
       });
       /* Jusqu'ici ;) */

    }
    ajout(urlTab);
    ajoutTable([urlTab,nameTab,pLocation]);
  }
}
$(document).ready(function(){
  $( "#tabs" ).tabs();
  $( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-dd"
  });


  /*$(function() {

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
  });*/

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
  $("#commune").keyup(function (e) {
    if (e.keyCode == 13) {
      research();
    }
  });
  $("#photoNb").keyup(function (e) {
    if (e.keyCode == 13) {
      research();
    }
  });


});
