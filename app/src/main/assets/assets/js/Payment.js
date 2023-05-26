function btAddPayment() {
    $("#btSelectClinte-Pay").text("Select Clinte")
    $("#PayAmount").val("")
    $("#ClinteMenu-Pay").empty()
    ListClintes.forEach(element => {
        $("#ClinteMenu-Pay").append(`<a onclick="btSelectClintePay(this)" class="dropdown-item" href="#" data-id="${element.id}">${element.name}</a>`)
    });
    $("#mAddPayment").modal('show');
}

function btSelectClintePay(elem) {
    $("#btSelectClinte-Pay").text(elem.innerHTML)
    $("#btSelectClinte-Pay").attr("data-adminid",elem.getAttribute("data-id"))
}

function SaveNewPayament() {
    let Admin   = $("#btSelectClinte-Pay").text()
    let ClinteID = $("#btSelectClinte-Pay").attr("data-adminid")
    if(ClinteID == 0) return Android.Toast("You must specify the owner of the page")
    let Amount   = $("#PayAmount").val()
    if(Amount == "") return Android.Toast("You must enter the amount")
    try {
        Android.SaveNewPayament(ClinteID,Amount,Admin)
    } catch (error) {}
    $("#mAddPayment").modal('hide');
}

function AddToPaymentsList(id,amount,clinteID,admin,date,time) {
    ListPayments.push({id : id,amount : amount,clinteID : clinteID ,admin : admin,date : date,time : time})
    let chtml = `<li class="list-group-item d-flex ListItem" style="margin-bottom: 10px;background: #202020;border-radius: 6px;border-style: none;padding-left: 0px;">
                <div style="width: 10%;margin: auto;"></div>
                <div style="width: 90%;">
                    <h4 id="PC-7" class="d-flex justify-content-start align-items-center" style="margin-bottom: 0px;color: #ffffff;">${amount} Da</h4>
                    <div class="d-flex align-items-center">
                        <h6 id="textMac-7" style="font-size: 10px;color: #c7cacd;">${date} ${time} </h6>
                        <h6 id="textIP-7" style="font-size: 10px;color: #c7cacd;margin-left: 15px;">${admin}</h6>
                    </div>
                </div>
            </li>`
    $("#PaymentListID").append(chtml)
}
$("#PaymentListID").empty()
try {
    Android.LoadPayments()
} catch (error) {}
