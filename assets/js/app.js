$(document).ready(function() {
  $.when(getInfo(marvelUniverse)).done(function() {
    localStorage.setItem("marvelUniverse", JSON.stringify(marvelUniverse));
    // var info = localStorage.getItem("marvelUniverse"); 
    setTimeout(function() {
      postInfo(marvelUniverse);
      linkGenerator($(".content"), marvelUniverse);
    }, 1000)
  });
});

var getInfo = (function(mainArr) {
  arr = [];
  for (var i = 0; i < mainArr.length; i++) {
    arr.push(mainArr[i].title);
  }
  for (var n = 0; n < arr.length; n++) {
    var queryString = "https://www.omdbapi.com/?apikey=3a181f1c&t=" + arr[n] + "&plot=short&r=json";
    $.ajax({
      url: queryString,
      method: "GET"
    }).done(function(response) {
      if (response.Response === "False") {
        console.log("Sorry, no movies were found :(");
      } else {
        if (response.Ratings.length >= 3) {
          for (var c = 0; c < mainArr.length; c++) {
            var eachObj = mainArr[c];
            if (eachObj.title == response.Title) {
              eachObj.ratings = response.Ratings[1].Value;
            }
          }
        }
      }
    });
  };
});

var orderPerRating = (function(obj) {
  for (var key in obj) {
    if (parseInt(obj[key]) > 80) {
      bestMovies[key] = obj[key];
    }
  }
  console.log(bestMovies);
});

var postInfo = (function(arr) {
  for (var i = 0; i < arr.length; i++) {
    var postThis = `<div class="content">`+`<h2>`+ arr[i].title + `</h2><img src="` + arr[i].newPoster + `" alt="` + arr[i].title + `"></div>`;
      $(postThis).appendTo("#movies").css("display", "none");
  }
  setTimeout(function() {
    showInfo();
  }, 2000);
});

var showInfo = (function() {
  $(".content").slideDown("fast");
});

var linkGenerator = (function(toApply, arr) {
  var title = $("#modal-title");
  var posterContainer = $("#poster");
  var trailerContainer = $("#trailer");
  var infoContainer = $("#info");
  var firstAppearanceContainer = $("#first-appearance");
  var mostPopularContainer = $("#most-popular");
  var whereToBeginContainer = $("#where-to-begin");
  $(toApply).click(function() {
    $(title).children().remove();
    $(posterContainer).children().remove();
    $(trailerContainer).children().remove();
    $(infoContainer).children().remove();
    $(firstAppearanceContainer).children().remove();
    $(mostPopularContainer).children().remove();
    $(whereToBeginContainer).children().remove();
    var toCompare = $(this).children("img").attr("alt");
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      if (obj.title == toCompare) {
        var popularComicStr = obj.mostPopularComic.replace(/ /g, "+");
        var url = "https://www.bookdepository.com/search?searchTerm=" + obj.mostPopularComic.replace(/#/g, "") + "&search=Find+book";
        $(firstAppearanceContainer).append(`<a href="https://www.bookdepository.com/search?searchTerm=` + obj.firstAppearance.replace(/#/g, "") + `&search=Find+book" target="_blank"><span class="description-comic">` + obj.title + `'s First Appearance</span><img src="` + obj.imageAppearance + `" class="img-comic"></a>`);
        $(mostPopularContainer).append(`<a href="https://www.bookdepository.com/search?searchTerm=` + obj.mostPopularComic.replace(/#/g, "") + `&search=Find+book" target="_blank"><span class="description-comic">Most Popular Comic</span><img src="` + obj.imagePopularComic + `" class="img-comic"></a>`);
        $(whereToBeginContainer).append(`<a href="https://www.bookdepository.com/search?searchTerm=` + obj.whereToBegin.replace(/#/g, "") + `&search=Find+book" target="_blank"><span class="description-comic">Where do I start reading?</span><img src="` + obj.imageToBegin + `" class="img-comic"></a>`);
        $("#modal").modal("show");
      }
    }
  });
});