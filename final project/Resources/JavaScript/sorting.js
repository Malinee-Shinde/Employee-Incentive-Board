// sorting

// Hook `click` on the table header, but only call our callback if
// that click passes through a `th`
$(".sortable thead").on("click", "th", function() {
    // Which column is this?
    var index = $(this).index();
    
    // Get the tbody
    var tbody = $(this).closest("table").find("tbody");
    
    // Disconnect the rows and get them as an array
    var rows = tbody.children().detach().get();
    
    // Sort it
    rows.sort(function(left, right) {
      // Get the text of the relevant td from left and right
      var $left = $(left).children().eq(index);
      var $right = $(right).children().eq(index);
      return $left.text().localeCompare($right.text());
    });
    
    // Put them back in the tbody
    tbody.append(rows);
});

// <!--search bar-->

    function search_table(id1, id2){
        // Declare variables 
        var input, filter, table, tr, td, i;
        input = document.getElementById(id1);
        filter = input.value.toUpperCase();
        table = document.getElementById(id2);
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td"); 
          for(j=0 ; j<td.length ; j++)
          {
            let tdata = td[j] ;
            if (tdata) {
              if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break ; 
              } else {
                tr[i].style.display = "none";
              }
            } 
          }
        }
    }