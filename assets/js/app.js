$(document).ready(function() {
  $.when(getInfo(marvelUniverse)).done(function() {
    localStorage.setItem("marvelUniverse", JSON.stringify(marvelUniverse));
    // var info = localStorage.getItem("marvelUniverse"); 
    setTimeout(function() {
      postInfo(marvelUniverse);
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

var linkGenerator = (function(toApply) {
  $(toApply).click(function() {
    var toCompare = $(this).children("img").attr("alt");
    var obj = recommendations[toCompare];
    var key = "Most Popular Comic";
    var toSearch = obj[key];
    var newStr = toSearch.replace(/ /g, "+");
    var url = "https://www.bookdepository.com/search?searchTerm=" + newStr + "&search=Find+book";
    $("#where-to-buy").attr("href", url);
    $("#modal").modal("show");
  });
});