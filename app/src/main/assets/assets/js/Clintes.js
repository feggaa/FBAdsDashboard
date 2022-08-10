


function btAddClinte() {
    $("#addClinte-Name").val("")
    $("#addClinte-Phone").val("")
    $("#addClinte-Address").val("")
    $("#addClinte-Contact").val("")
    $("#mAddClinte").modal('show');
}

function SaveNewClinte(){
    Android.SaveNewClinte($("#addClinte-Name").val(),$("#addClinte-Phone").val(),$("#addClinte-Address").val(),$("#addClinte-Contact").val())
    $("#mAddClinte").modal('hide');
}

function AddToClintesList(id,Name,LastPay,LastAmount,Contact,Credit) {
    // var ID = Date.now()
    ListClintes.push({id : id,name : Name,LastPay : LastPay ,LastAmount : LastAmount,Contact : Contact})
    var chtml = `<li class="list-group-item d-flex ListItem" style="margin-bottom: 10px;background: #202020;border-radius: 6px;border-style: none;" data-id="${id}">
                    <div style="width: 10%;margin: auto;"><i id="icoOS-3" class="fas fa-user" style="font-size: 30px;margin-left: -5px;color: #04b8fd;"></i></div>
                    <div style="width: 90%;">
                        <h4 id="PC-3" class="d-flex justify-content-start align-items-center" style="margin-bottom: 0px;color: #ffffff;">${Name}</h4>
                        <div class="d-flex align-items-center">
                            <h6 id="textMac-3" style="font-size: 10px;color: #c7cacd;">Last Payment : ${LastPay}</h6>
                            <h6 id="textIP-3" style="font-size: 10px;color: #c7cacd;margin-left: 15px;">${LastAmount} Da</h6>
                            <h6 id="textIP-1" style="font-size: 10px;margin-left: 15px;color: var(--bs-red);">${Credit} Da</h6>
                        </div>
                    </div><i class="fab fa-facebook-messenger d-flex float-start justify-content-end" style="color: #2dad4a;margin-left: 5px;font-size: 24px;" data-Contact="${Contact}"></i>
                </li>`
$("#ClinteListID").append(chtml)
}

$("#ClinteListID").empty()
Android.LoadClintes()