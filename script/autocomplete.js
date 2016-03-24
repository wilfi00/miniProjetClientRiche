$(document).ready(function(){

  function ajout(urlList)
  {
    $.each(urlList, function(index, value)
    {
      $("#vuePhoto").append("<li> <img src='" + value + "'alt='image' height='320' width='420'> </li> </br></br></br>");
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
      dataType : 'jsonp',
      data : { method : 'flickr.photos.search',api_key : '9f6a93b5d37c5b05bd630638f3c952d3', tags : comm, format : 'json', jsoncallback : '?' },
      success : function(res){
        if (res.length == 0) {
          alert("Nothing was found :/");
        }
        else {
          photoList = res
          console.log(photoList)
          urlTab = [];
          // for (var i = 0; i < photoList.length; i++) {
          //   farm = photoList.attribute[4];
          //   serv = photoList.attribute[4];
          //   id = photoList.attribute[4];
          //   secret = photoList.attribute[4];
          //   urlTab.push("https://farm"+farm+".staticflickr.com/"+serv+"/"+id+"_"+secret+".jpg");
          // }
          // ajout(urlTab);
        }
      },
      error : function(res, statut, erreur){
        console.log(res)
        alert("Fatal error :/");
      },
      complete : function(res, statut){}
    });
  });

});
