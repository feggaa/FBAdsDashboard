let TotalBoostDinar  = 0
let TotalBoostDollar = 0
let chartMap = []


function btAddBoost() {
    $("#btSelectPage").text("Select Page")
    $("#BoostClinte").val("")
    $("#Budget").val("")
    $("#DateEnd").val("")
    $("#PageMenu").empty()
    ListPages.forEach(element => {
        $("#PageMenu").append(`<a class="dropdown-item" onclick="btSelectPage(this)" href="#" data-pageid="${element.id}" data-clinteid="${element.adminID}" data-page="${element.name}"><img src="${element.logo}" style="width: 40px;height: 40px;border-radius: 50%;" />${element.name}</a>`)
    });
    $("#mAddBoost").modal('show');
}

function BudgetOnInput() {
    let Budget = $("#Budget").val()
    $("#BudgetDoller").val(parseInt(Budget/250)+"$")
}
function btSelectPage(elem) {
    let clinteID = elem.getAttribute("data-clinteid")
    $("#btSelectPage").text(elem.getAttribute("data-page"))
    $("#btSelectPage").attr("data-pageid",elem.getAttribute("data-pageid"))
    $("#btSelectPage").attr("data-clinteid",clinteID)
    ListClintes.forEach(element => {
        if(element.id == clinteID){
            $("#BoostClinte").val(element.name)
        }
    })
}
function SaveNewBoost(){
    let Page   = $("#btSelectPage").text()
    let PageID = $("#btSelectPage").attr("data-pageid")
    let ClinteID = $("#btSelectPage").attr("data-clinteid")
    if(PageID == 0) return Android.Toast("You must specify the owner of the page")
    let BudgetDoller = $("#BudgetDoller").val()
    let Budget = $("#Budget").val()
    let DateEnd   = $("#DateEnd").val()
    Android.SaveNewBoost(ClinteID,PageID,Budget,DateEnd,parseInt(BudgetDoller),Page)
    $("#mAddBoost").modal('hide');
}

function AddToBoostList(id,page,doller,dinar,date,time,state){
    

    TotalBoostDollar  += Number(doller)
    TotalBoostDinar   += Number(dinar)
    chartMap.push(Number(dinar))
    $("#TotalDinar").text(TotalBoostDinar+"Da")
    $("#TotalDollar").text(TotalBoostDollar+"$")
    
    $(function(){
        let chart = document.querySelector('canvas').chart;
        chart.data.datasets[0].data = chartMap
        chart.data.labels = chartMap
        chart.update();
    })

   // ListPayments.push({id : id,amount : amount,clinteID : clinteID ,admin : admin,date : date,time : time})
    let chtml = `<li class="list-group-item" style="background: #292929;margin-bottom: 5px;display: flex;border-radius: 5px;"><i class="fa fa-bullhorn d-flex justify-content-center align-items-center" style="color: rgb(5,130,255);font-size: 24px;"></i>
                    <div style="width: 100%;padding-left: 10px;">
                        <div><span style="color: rgb(255,255,255);margin-right: 5px;">Boost</span><span style="color: rgb(255,255,255);width: 100%;">${page}</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" style="color: rgb(90,234,23);font-size: 12px;float: right;margin-top: 5px;">
                                <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                                <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"></path>
                            </svg></div>
                        <div style="display: initial;"><span style="color: rgb(255,255,255);font-size: 12px;float: left;">${date} ${time}</span><span style="color: rgb(56,242,63);font-size: 12px;float: right;">${doller}$</span></div>
                    </div>
                </li>`
    $("#BoostList").append(chtml)
}

$("#BoostList").empty()
Android.LoadActivities()