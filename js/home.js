$(document).ready(function () {
  populateDvdTable();
  $('#add-dvd').click(addDvdForm);
  $('#edit-dvd').click(editDvdForm);
  $('#add-cancel-forms').click(focusDvdTable);
  $('#edit-cancel-forms').click(focusDvdTable);
});

function populateDvdTable() {
  $('#dvd-table-rows').empty();
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
        row += `<button type="button" class="btn btn-primary btn-sm" onClick="populateDvdEditForm(${id})")>Edit</button>`;
        row += `<button type="button" class="btn btn-primary btn-sm" onClick="deleteDvd(${id})")>Delete</button>`;
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

function deleteDvd(id){
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:8080/dvd/' + id,
    success: function (){
      clearAll();
      focusDvdTable();
      populateDvdTable();
    },
    error: function () {
      $('#errorMessages')
        .append($('<li>')
          .attr({ class: 'list-group-item list-group-item-danger' })
          .text('Error calling web service.'));
    }    
  });
}

function addDvdForm() {

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/dvd',
    data: JSON.stringify({
      title: $('#add-title').val(),
      realeaseYear: $('#add-release-year').val(),
      director: $('#add-director').val(),
      rating: $('#add-rating').val(),
      notes: $('#add-notes').val()
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'dataType': 'json',
    success: function () {
      clearAll();
      focusDvdTable();
      populateDvdTable();
    },
    error: function () {
      $('#error-messages')
        .append($('<li>')
          .attr({ class: 'list-group-item list-group-item-danger' })
          .text('Error calling web service.'));
    }
  })
}

function editDvdForm() {
  

  $.ajax({
    type: 'PUT',
    url: 'http://localhost:8080/dvd/' + $('#edit-dvdId').val(),
    data: JSON.stringify({
      title: $('#edit-title').val(),
      realeaseYear: $('#edit-release-year').val(),
      director: $('#edit-director').val(),
      rating: $('#edit-rating').val(),
      notes: $('#edit-notes').val()
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'dataType': 'json',
    success: function () {
      clearAll();
      focusDvdTable();
      populateDvdTable();
    },
    error: function () {
      $('#error-messages')
        .append($('<li>')
          .attr({ class: 'list-group-item list-group-item-danger' })
          .text('Error calling web service.'));
    }
  })
}

function populateDvdEditForm(id) {

  focusEditDvdForm();
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/dvd/' + id,
    success: function (dvd) {

      var title = dvd.title;
      var releaseYear = dvd.realeaseYear;
      var director = dvd.director;
      var rating = dvd.rating;
      var notes = dvd.notes;

      $('#edit-title').val(title);
      $('#edit-release-year').val(releaseYear);
      $('#edit-director').val(director);
      $('#edit-rating').val(rating);
      $('#edit-notes').val(notes);
      $('#edit-dvdId').val(id);
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
  focusAddDvdForm();
});

function hideDvdForms() {
  clearAll();
  $("#add-dvd-forms").hide();
  $("#edit-dvd-forms").hide();
  $("#header").show();
}

function focusAddDvdForm() {
  $("#dvd-table-div").hide();
  $("#header").hide();
  $("#add-dvd-forms").show();
}

function focusEditDvdForm() {
  $("#dvd-table-div").hide();
  $("#header").hide();
  $("#edit-dvd-forms").show();
}

function focusDvdTable() {
  $("#dvd-table-div").show();
  hideDvdForms();
}

function clearAll() {
  $('#error-messages').empty();
  $('#add-title').val('');
  $('#add-release-year').val('');
  $('#add-director').val('');
  $('#add-rating').val('');
  $('#add-notes').val('');
  $('#edit-title').val('');
  $('#edit-release-year').val('');
  $('#edit-director').val('');
  $('#edit-rating').val('');
  $('#edit-notes').val('');
}
