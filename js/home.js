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
        clearDvdForms();
        loadDVDList();
        hideDvdForms();
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
    var DvdTableRows = $('#dvd-table-rows');
  
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/dvds',
      success: function (DVDArray) {
        $.each(DVDArray, function (index, dvd) {
  
          var title = dvd.title;
          var releaseYear = dvd.realeaseYear;
          var director = dvd.director;
          var rating = dvd.rating;
          var id = dvd.id;
  
          var row = '<tr>';
          row += '<td>' + title + '</td>';
          row += '<td>' + releaseYear + '</td>';
          row += '<td>' + director + '</td>';
          row += '<td>' + rating + '</td>';
          row += '<td>';
          row += `<button type="button" class="btn btn-primary btn-sm" onClick="editDvd(${$("#dvd-id")})">Edit</button>`;
          row += '<button type="button" class="btn btn-primary btn-sm">Delete</button>';
          row += `<input id="dvd-id" type="hidden" value="${id}">`
          row += '</td>';
          row += '</tr>';
  
          DvdTableRows.append(row);
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

  $('#create-dvd-button').click(function(event){
    $('#dvd-form-head').html("Create Dvd");
    focusDvdForm();
  });

  $('#cancel-forms').click(focusDvdTable);
});

function editDvd(dvdId){
  $('#dvd-form-head').html("Edit Dvd");
  focusDvdForm();

  $
}

function hideDvdForms() {
  clearDvdForms();
  $("#dvd-forms").hide();
  $("#header").show();
}

function focusDvdForm() {
  $("#dvd-table-div").hide();
  $("#header").hide();
  $("#dvd-forms").show();
}

function focusDvdTable() {
  $("#dvd-table-div").show();
  hideDvdForms();
}

function clearDvdForms() {
  $('#error-messages').empty();
  $('#title').val('');
  $('#release-year').val('');
  $('#director').val('');
  $('#rating').val('');
  $('#notes').val('');
}
