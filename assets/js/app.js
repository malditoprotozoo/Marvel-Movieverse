$(document).ready(function() {
  $.when(getInfo(marvelUniverse)).done(function() {
    setTimeout(function() {
      postInfo(marvelUniverse);
    }, 1000)
  });
  deleteVideo("#modal");
  showComingSoon(marvelUniverse);
  selectBestMovies(marvelUniverse);
  selectWorstMovies(marvelUniverse);
  selectMovieByGenre(marvelUniverse);
  multiverseSelector(marvelUniverse);
});

/* Obtiene información de la API */
var getInfo = (function(mainArr) {
  var titlesArr = [];
  var yearsArr = [];
  for (var i = 0; i < mainArr.length; i++) {
    titlesArr.push(mainArr[i].title);
    yearsArr.push(mainArr[i].year);
  }
  for (var n = 0; n < titlesArr.length; n++) {
    var queryString = "https://www.omdbapi.com/?apikey=3a181f1c&t=" + titlesArr[n].replace(/ /g, "+") + "&y=" + yearsArr[n];
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
        if (response.Plot !== undefined) {
          for (var x = 0; x < mainArr.length; x++) {
            var eachObj = mainArr[x];
            if (eachObj.title == response.Title) {
              eachObj.plot = response.Plot;
              eachObj.poster = response.Poster;
            }
          }
        } else {
          for (var x = 0; x < mainArr.length; x++) {
            var eachObj = mainArr[x];
            if (eachObj.title == response.Title) {
              eachObj.plot = "Coming Soon.";
              eachObj.poster = response.Poster;
            }
          }
        }
        if (response.Poster === "N/A") {
          for (var x = 0; x < mainArr.length; x++) {
            var eachObj = mainArr[x];
            if (eachObj.title === response.Title) {
              eachObj.poster = eachObj.newPoster;
            }
          }
        }
        if (response.Genre !== undefined) {
          for (var a = 0; a < mainArr.length; a++) {
            var eachObj = mainArr[a];
            if (eachObj.title === response.Title) {
              eachObj.genre = response.Genre;
            }
          }
        }
      }
    });
  };
});

/* Selecciona las películas con un rating por sobre el 80% */
var selectBestMovies = (function(arr) {
  $("#best-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (parseInt(arr[i].ratings) >= 80) {
        newArr.push(arr[i]);
      }
    }
    postInfo(newArr);
  });
});

var selectWorstMovies = (function(arr) {
  $("#worst-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (parseInt(arr[i].ratings) <= 40) {
        newArr.push(arr[i]);
      }
    }
    postInfo(newArr);
    });
  });

var selectMovieByGenre = (function(arr) {
  $("#action-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].genre.includes("Action")) {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });

  $("#adventure-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].genre.includes("Adventure")) {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });

  $("#comedy-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].genre.includes("Comedy")) {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });

  $("#drama-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].genre.includes("Drama")) {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });

  $("#fantasy-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].genre.includes("Fantasy")) {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });

  $("#romance-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].genre.includes("Romance")) {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });

  $("#scifi-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].genre.includes("Sci-Fi")) {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });
});

var multiverseSelector = (function(arr) {
  $("#mcu-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].universe === "Marvel Cinematic Universe") {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });
  $("#fox-movies").click(function() {
    var newArr = [];
    $("#movies").children().remove();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].universe === "X-Men Universe") {
        newArr.push(arr[i]);
      }
    }
    if (newArr.length === 0) {
      $("#movies").append(`<h2 class="error-msg">Sorry, there are no movies that match your search :(</h2>`);
    } else {
      postInfo(newArr);
    }
  });
});

/* Toma la información de la data y la postea en la página */
var postInfo = (function(arr) {
  for (var i = 0; i < arr.length; i++) {
    var postThis = `<div class="content">`+`<h2>`+ arr[i].title + `</h2><img src="` + arr[i].poster + `" alt="` + arr[i].title + `"></div>`;
      $(postThis).appendTo("#movies").css("display", "none");
  }
  setTimeout(function() {
    contentGenerator($(".content"), marvelUniverse);
    showInfo();
  }, 2000);
});
/* Cambia el display de la información posteada de display none a block */
var showInfo = (function() {
  $(".content").slideDown("slow");
});

/* Genera el contenido de cada modal */
var contentGenerator = (function(toApply, arr) {
  var modalTitle = $("#modal-title");
  var posterContainer = $("#poster");
  var trailerContainer = $("#trailer");
  var infoContainer = $("#info");
  var firstAppearanceContainer = $("#first-appearance");
  var mostPopularContainer = $("#most-popular");
  var whereToBeginContainer = $("#where-to-begin");
  $(toApply).click(function() {
    $(modalTitle).html("");
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
        $(modalTitle).append(obj.title);
        if (obj.newPoster == undefined) {
          $(posterContainer).append(`<img src="` + obj.poster + `" class="modal-poster">`);
        } else {
          $(posterContainer).append(`<img src="` + obj.newPoster + `" class="modal-poster">`);
        }
        $(trailerContainer).append(`<iframe src="` + obj.trailer + `" frameborder="0" allowfullscreen></iframe>`);
        if (obj.plot == undefined) {
          obj.plot = "Coming Soon";
          $(infoContainer).append(`<p class="p-plot">` + obj.plot + `</p>`);
        } else {
          $(infoContainer).append(`<p class="p-plot">` + obj.plot + `</p>`);
        }
        var url = "https://www.bookdepository.com/search?searchTerm=" + obj.mostPopularComic.replace(/#/g, "") + "&search=Find+book";
        $(firstAppearanceContainer).append(`<a href="https://www.bookdepository.com/search?searchTerm=` + obj.firstAppearance.replace(/#/g, "") + `&search=Find+book" target="_blank"><span class="description-comic">First Appearance</span><img src="` + obj.imageAppearance + `" class="img-comic"></a>`);
        $(mostPopularContainer).append(`<a href="https://www.bookdepository.com/search?searchTerm=` + obj.mostPopularComic.replace(/#/g, "") + `&search=Find+book" target="_blank"><span class="description-comic">Most Popular Comic Book</span><img src="` + obj.imagePopularComic + `" class="img-comic"></a>`);
        $(whereToBeginContainer).append(`<a href="https://www.bookdepository.com/search?searchTerm=` + obj.whereToBegin.replace(/#/g, "") + `&search=Find+book" target="_blank"><span class="description-comic">Where to Start Reading</span><img src="` + obj.imageToBegin + `" class="img-comic"></a>`);
        $("#modal").modal("show");
      }
    }
  });
});

var deleteVideo = (function(modal) {
  $(modal).on("hidden.bs.modal", function() {
    $("#trailer").children().remove();
  })
});

var showComingSoon = (function(arr) {
  $('.carousel').carousel();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].status === "Coming soon") {
      var carouselImg = `<div class="d-block img-fluid" style="background: url(` + arr[i].newPoster + `) no-repeat center center; background-size: cover"></div>`;
      var carouselItem = `<div class="carousel-item">`+carouselImg+`<div class="carousel-caption"><h3>` + arr[i].title + `</h3></div></div>`;
      $(".carousel-inner").append(carouselItem);
    }
  }
});

var adjustSidebar = (function() {
  var paddingBottom = $("#movies-container").height() - 137 + "px";
  $(".panel-group").css("padding-bottom", paddingBottom);
})