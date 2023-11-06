function toCurrency_kurs(number) {
    var n = parseInt(number);
    return n.toLocaleString('en-us');
}


function current_kurs() {
    $.ajax({
        method: "GET",
        url: localhost + "/api/mobile/getKurs",
        data: {},
        dataType: "json",
        success: function (response) {
            if (response.status) {
                var data = response.data;
                if (data != null) {
                    $("#current_kurs").html(toCurrency_kurs(data.kurs_today));
                } else {
                    $("#current_kurs").html(0);
                }

            } else {
                $("#current_kurs").html(0);
            }
        },
        error: function (xhr, status, errorThrown) {
            swal("Please reload page and check your connection...");
        }
    });
}

function show_kurs(){
    $.ajax({
        method: "GET",
        url: localhost + "/api/mobile/setting_kurs",
        data: {
            branch_id:storage.getItem("branch_id"),
        },
        dataType: "json",
        success: function (response) {
            if (response.status) {
                $("#setting_kurs").show();
            } else {
                $("#setting_kurs").hide();
            }
        },
        error: function (xhr, status, errorThrown) {
            swal("Please reload page and check your connection...");
        }
    });
}



$(document).ready(function(){
    current_kurs();
    show_kurs();
});