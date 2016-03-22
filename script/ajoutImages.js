$(document).ready(function()
{
  function ajout()
  {
    urlIMG = ["https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0e%2FAtlanta_Zoo_Panda.jpg&f=1","https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0e%2FAtlanta_Zoo_Panda.jpg&f=1"];
    $.each(urlIMG, function(index, value)
    {
      $("#vuePhoto").append("<li> <img src='" + value + "'alt='image' height='42' width='42'> </li> </br></br></br>");
    });
  }

  function ajoutTable()
  {
    urlIMG = ["https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0e%2FAtlanta_Zoo_Panda.jpg&f=1","https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0e%2FAtlanta_Zoo_Panda.jpg&f=1"];
    $.each(urlIMG, function(index, value)
    {
      $("#photos").append("<tr> <td> <img src='" + value + "'alt='image' height='42' width='42'> </td> </tr> </br></br></br>");
    });
    $('#photos').DataTable();
  }

  $("#recherche").on("click", function()
  {
    ajout();
    ajoutTable();
  });
});
