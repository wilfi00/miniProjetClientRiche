$(document).ready(function()
{
  function ajout()
  {
    urlIMG = ["https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0e%2FAtlanta_Zoo_Panda.jpg&f=1","https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0e%2FAtlanta_Zoo_Panda.jpg&f=1"];
    $.each(urlIMG, function(index, value)
    {
      $("#vuePhoto").append("<li> <img src='" + value + "'alt='image' height='320' width='420'> </li> </br></br></br>");
    });

  }

  $("#recherche").on("click", function()
  {
    ajout();
  });
});
