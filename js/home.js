$(document).ready(function () {
  loadDVDList();

  $('#create-dvd').click(function (event) {

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/dvd',
      data: JSON.stringify({
        title: $('#title').val(),
        realeaseYear: $('#releaseYear').val(),
        director: $('#director').val(),
        rating: $('#rating').val(),
        notes: $('#notes').val()
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'dataType': 'json',
      success: function () {
        $('#errorMessages').empty();
        $('#title').val('');
        $('#releaseYear').val('');
        $('#director').val('');
        $('#rating').val('');
        $('#notes').val('');
        $('#DVDTableRows').empty();
        loadDVDList();
        hideDVDCreate();
      },
      error: function () {
        $('#errorMessages')
        .append($('<li>')
          .attr({ class: 'list-group-item list-group-item-danger' })
          .text('Error calling web service.'));
      }
    })
  });

  function loadDVDList() {
    var DVDTableRows = $('#DVDTableRows');
  
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/dvds',
      success: function (DVDArray) {
        $.each(DVDArray, function (index, dvd) {
  
          var title = dvd.title;
          var releaseYear = dvd.realeaseYear;
          var director = dvd.director;
          var rating = dvd.rating;
  
          var row = '<tr>';
          row += '<td>' + title + '</td>';
          row += '<td>' + releaseYear + '</td>';
          row += '<td>' + director + '</td>';
          row += '<td>' + rating + '</td>';
          row += '<td><a>Edit</a> | <a>Delete</a></td>';
          row += '</tr>';
  
          DVDTableRows.append(row);
        });
      },
      error: function () {
        $('#errorMessages')
          .append($('<li>')
            .attr({ class: 'list-group-item list-group-item-danger' })
            .text('Error calling web service.'));
      }
    });
  }
  
  function hideDVDCreate() {
    $("#createDVDForms").hide();
    showDVDTable();
    $("#header").show();
  }
  
  function hideDVDTable() {
    $("#DVDTableDiv").hide();
    $("#header").hide();
    $("#createDVDForms").show();
  }
  
  function showDVDTable() {
    $("#DVDTableDiv").show();
  }
  
});

