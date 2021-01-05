$(document).ready(function () {
  var APIkeyYoutube = configVars.APIkeyYoutube
  
  var queryURLcocktails = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  
  var searchVideo = []
  var cocktails = []
  var favCocktails = []
  
  if (localStorage.length > 0) {
    renderFavorites();
  }
  
  function queryRandomCocktails() {
      $.ajax({
      url: queryURLcocktails,
      method: "GET"
      }).then(function(response) {
        $("#cocktail-name").text(response.drinks[0].strDrink); 
        $("#ingredients").empty();
        $(".recipe").text(response.drinks[0].strInstructions)
        for (i = 0; i < 10; i++) {
          if (Object.values(response.drinks[0])[21+i] !== null && Object.values(response.drinks[0])[21+i] !== "" && Object.values(response.drinks[0])[36+i] !== null &&Object.values(response.drinks[0])[36+i] !== "") {
            var ingredients = $("<p>").text(Object.values(response.drinks[0])[21+i] + ": " + Object.values(response.drinks[0])[36+i])
            $("#ingredients").append(ingredients)
          } else if (Object.values(response.drinks[0])[21+i] !== null && Object.values(response.drinks[0])[36+i] === null) {
            var ingredients = $("<p>").text(Object.values(response.drinks[0])[21+i]);
            $("#ingredients").append(ingredients)
          }
        }
          var pic = response.drinks[0].strDrinkThumb
          var photo = $(".cocktail-pic")
          photo.attr("style", "background-image: url(" + pic + ")")
      })
  }
  
  function queryCocktailName() {
    var cocktailName =  $("#cocktail-search").val().trim() || cocktails[cocktails.length-1];
    $("#cocktail-search").val("")
    if (cocktailName) {
    var queryURLsearch = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName
      $.ajax({
      url: queryURLsearch,
      method: "GET"
    }).then(function(response) {
      $("#cocktail-name").text(response.drinks[0].strDrink);        
      $(".recipe").text(response.drinks[0].strInstructions)
      $("#ingredients").empty();
      for (i = 0; i < 10; i++) {
          if (Object.values(response.drinks[0])[21+i] !== null && Object.values(response.drinks[0])[21+i] !== "" && Object.values(response.drinks[0])[36+i] !== null &&Object.values(response.drinks[0])[36+i] !== "") {
            var ingredients = $("<p>").text(Object.values(response.drinks[0])[21+i] + ": " + Object.values(response.drinks[0])[36+i])
            $("#ingredients").append(ingredients)
          } else if (Object.values(response.drinks[0])[21+i] !== null && Object.values(response.drinks[0])[36+i] === null) {
            var ingredients = $("<p>").text(Object.values(response.drinks[0])[21+i]);
            $("#ingredients").append(ingredients)
        }
      }
      var pic = response.drinks[0].strDrinkThumb
      var photo = $(".cocktail-pic")
      photo.attr("style", "background-image: url(" + pic + ")")
    })
  }
  }
  
  function renderFavorites () {
    for (i = 0; i < localStorage.length; i++) {
      favCocktails.push(JSON.parse(localStorage.getItem(i)))
    }
    $("#favorites").empty()
    var newSet = new Set(favCocktails);
    var favCocktailsList = Array.from(newSet);
  
    for (i = localStorage.length; i >= 0; i--) {
      if (favCocktailsList[i] !== null) {
      localStorage.setItem(i, JSON.stringify(favCocktailsList[i]));
       // var favDiv = $("<div>").addClass("fav-div")
       // var cancel = $("<div>").addClass("cancel-div")
        
        var fav = $("<p>").html(favCocktailsList[i]).addClass("favoriteCocktails").attr("data-name", favCocktailsList[i])
        //var minus = $("<button />").html("cancel").attr("id", i).attr("data-name", favCocktailsList[i]).addClass("minus").addClass("mdl-chip__action").addClass("material-icons")
        //$("<div>").attr("data-name", favCocktailsList[i]).append(fav).append(minus).appendTo("#favorites")
        //$("#favorites").append(fav).append(minus)
        /*
      var fav = $("<p>").text(favCocktailsList[i]).addClass("favoriteCocktails").attr("data-name", favCocktailsList[i])
      var minus = $("<button />").html("cancel").attr("id", i).attr("data-name", favCocktailsList[i]).addClass("minus").addClass("mdl-chip__action").addClass("material-icons")*/
      //var whole = fav.append(minus)
      //$("#favorites").append(whole)
      }
      //fav.append(minus)
      $("#favorites").append(fav)
    }
    
  
    /*var favoriteCocktails = JSON.parse(localStorage.getItem("favCocktails"))
  
      console.log(favoriteCocktails)
        for (i = 0; i < favoriteCocktails.length; i++) {
           var fav = $("<p>").text(favoriteCocktails[i]).addClass("favoriteCocktails").attr("data-name", favoriteCocktails[i])
           console.log(fav)
           $("#favorites").append(fav)
        }*/
  }
  
  function queryYoutube() { 
    var queryURLyoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=cocktail+music" + searchVideo[searchVideo.length-1] + "&key=" + APIkeyYoutube
    $.ajax({
    url: queryURLyoutube,
    method: "GET"
  }).then(function(response) {
      var videoSource = "https://www.youtube.com/embed/" + response.items[0].id.videoId + "?autoplay=1"
      $("#player").attr("src", videoSource)
  })
  }
  
  $("#search").on("click", function(event) {
    event.preventDefault();
    queryCocktailName();
    /*for (i = 0; i < favoriteCocktails.length; i++) {
      var fav = $("<p>").text(favoriteCocktails[i]).addClass("favoriteCocktails").attr("data-name", favoriteCocktails[i])
      console.log(fav)
      $("#favorites").append(fav)}*/
  })
  $("#random-cocktails").on("click", function(event) {
    event.preventDefault();
    queryRandomCocktails();
  })
  
  $(document).on("click", ".music-button", function(event) {
    event.preventDefault();
    var searchYoutube = $(this).attr("data-name");
    searchVideo.push(searchYoutube);
    queryYoutube();
  })
  
  $("#plus-sign").on("click", function (event) {
    event.preventDefault();
    var newCocktail = $("#cocktail-name").html()
    if (newCocktail) {
    favCocktails.push(newCocktail)
  
    /*newCocktail = $("#cocktail-name").html();
       if (favCocktails.length >= 5){  
          favCocktails.shift();
          favCocktails.push(newCocktail);
  
      }else{
      favCocktails.push(newCocktail);*/
    renderFavorites();
  
    }
    })
  
  // this function reset the fav list
    $("#reset").on("click", function(event){
      event.preventDefault();
      $("#favorites").empty();
    localStorage.clear()
    })
  
    /*$(document).on("click", ".minus", function(event) {
      event.preventDefault();
      event.stopPropagation()
     // var element = event.target;
  //    if (element.matches("button") === true) {
  
      console.log($(this).attr("id"))
      favCocktails.splice(($(this).attr("data-name")), 1)
      console.log(favCocktails)
      localStorage.removeItem($(this).attr("id"))
      $(this).remove()
      renderFavorites()
    //  }
    })*/
    
    //console.log(newCocktail)
    //localStorage.setItem("favCocktails"+i, JSON.stringify(favCocktails))
    //console.log(favCocktails)
  
  // this function makes you display the cocktail receipe when you click the favorite cocktail list
  $(document).on("click", ".favoriteCocktails", function(event) {
    event.preventDefault();
    event.stopPropagation()
   // var element = event.target;
   // if (element.matches("button") !== true) {
  
    var cocktailName = $(this).attr("data-name")
    cocktails.push(cocktailName)
    queryCocktailName()
   // }
  })
  })