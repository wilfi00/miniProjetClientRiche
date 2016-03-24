$(document).ready(function(){

  function ajout(urlList)
  {

    /*alert(urlList.length)
    var test = urlList.slice(98);
    alert(test.length)
    alert(test)*/
    $.each(urlList, function(index, value)
    {
      $("#tabs-1").append("<img src='" + value + "'\></img><br/><br/>");

    });

  }

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

  $("#search").click(function(){
    var comm = $("#commune").val();

    $.ajax({
      url : 'https://api.flickr.com/services/rest/',
      type : 'GET',
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      data : { method : 'flickr.photos.search',api_key : '9f6a93b5d37c5b05bd630638f3c952d3', tags : comm, format : 'json', jsoncallback : '?' },
      success : function(res){
        if (res.length == 0) {
          alert("Nothing was found :/");
        }
        else {
          photoList = res.photos.photo
          urlTab = [];
          for (var i = 0; i < photoList.length; i++) {
            farm = photoList[i].farm;
            serv = photoList[i].server;
            id = photoList[i].id;
            secret = photoList[i].secret;
            urlTab.push("https://farm"+farm+".staticflickr.com/"+serv+"/"+id+"_"+secret+".jpg");
          }
          ajout(urlTab);
        }
      },
      error : function(res, statut, erreur){
        console.log(res +" " + statut + " " + erreur)
        alert("Fatal error :/");
      },
      complete : function(res, statut){}
    });
  });

});
