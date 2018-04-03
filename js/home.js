$(document).ready(function () {
  populateDvdTable();
  $('#create-dvd').click(saveDvdForm);
  $('#cancel-forms').click(focusDvdTable);
});

function populateDvdTable() {
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
        var id = dvd.dvdId;

        var row = '<tr>';
        row += '<td>' + title + '</td>';
        row += '<td>' + releaseYear + '</td>';
        row += '<td>' + director + '</td>';
        row += '<td>' + rating + '</td>';
        row += '<td>';
        row += `<button type="button" class="btn btn-primary btn-sm" onClick="editDvd(${id})")>Edit</button>`;
        row += '<button type="button" class="btn btn-primary btn-sm">Delete</button>';
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

function saveDvdForm() {

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/dvds',
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
      clearAll();
      populateDvdTable();
      hideDvdForms();
    },
    error: function () {
      $('#error-messages')
        .append($('<li>')
          .attr({ class: 'list-group-item list-group-item-danger' })
          .text('Error calling web service.'));
    }
  })
}

function editDvd(id) {
  $('#dvd-form-head').html("Edit Dvd");
  focusDvdForm();
  populateDvdEditForm(id);
}

function populateDvdEditForm(id) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/dvd/' + id,
    success: function (dvd) {

      var title = dvd.title;
      var releaseYear = dvd.realeaseYear;
      var director = dvd.director;
      var rating = dvd.rating;
      var id = dvd.id;
      var notes = dvd.notes;

      $('#title').val(title);
      $('#release-year').val(releaseYear);
      $('#director').val(director);
      $('#rating').val(rating);
      $('#notes').val(notes);
    },
    error: function () {
      $('#errorMessages')
        .append($('<li>')
          .attr({ class: 'list-group-item list-group-item-danger' })
          .text('Error calling web service.'));
    }
  });
}

$('#create-dvd-button').click(function () {
  $('#dvd-form-head').html("Create Dvd");
  focusDvdForm();
});



function hideDvdForms() {
  clearAll();
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

function clearAll() {
  $('#error-messages').empty();
  $('#title').val('');
  $('#release-year').val('');
  $('#director').val('');
  $('#rating').val('');
  $('#notes').val('');
}
