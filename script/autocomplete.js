function ajout(urlList)
{
  $("#tabs-1").html("");
  /*alert(urlList.length)
  var test = urlList.slice(98);
  alert(test.length)
  alert(test)*/
  $.each(urlList, function(index, value)
  {
    $("#tabs-1").append("<img src='" + value + "'\></img><br/><br/>");

  });

}

function ajoutTable(data)
{
  urlIMG = data[0];
  nameIMG = data[1];
  var t = $('#photos').DataTable();
  t.clear();
  for(var i = 0; i < urlIMG.length; i++)
  {
      t.row.add([ "<img src='" + urlIMG[i] + "'/>", nameIMG[i], "test2", "test3"]);
  }
  t.draw();

}

function jsonFlickrApi(data) {
  var nbPhotoAPI = data.length;
  if (nbPhotoAPI == 0) {
    alert("Nothing was found :/");
  }
  else {
    photoList = data.photos.photo
    urlTab = [];
    nameTab = [];
    imgNumber = $("#photoNb").val();
    alert(nbPhotoAPI);
    if(imgNumber > nbPhotoAPI){
      imgNumber = nbPhotoAPI;
    }
    // 0/20, faut faire par rapport au nombre de photos retournés
    for (var i = 0; i < imgNumber; i++) {
      farm = photoList[i].farm;
      serv = photoList[i].server;
      id = photoList[i].id;
      secret = photoList[i].secret;
      name = photoList[i].title;
      urlTab.push("https://farm"+farm+".staticflickr.com/"+serv+"/"+id+"_"+secret+".jpg");
      nameTab.push(name);
    }
    ajout(urlTab);
    ajoutTable([urlTab,nameTab]);
  }
}
$(document).ready(function(){
  $( "#tabs" ).tabs();
  $( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-dd"
  });


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
