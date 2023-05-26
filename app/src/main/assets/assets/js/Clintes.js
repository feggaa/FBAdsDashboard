


function btAddClinte() {
    $("#addClinte-Name").val("")
    $("#addClinte-Phone").val("")
    $("#addClinte-Address").val("")
    $("#addClinte-Contact").val("")
    $("#mAddClinte").modal('show');
}

function SaveNewClinte(){
    let name    = $("#addClinte-Name").val()
    if(name == 0) return Android.Toast("You must specify the name of the clinte")
    let phone   = $("#addClinte-Phone").val()
    let addr    = $("#addClinte-Address").val()
    let contact = $("#addClinte-Contact").val()
    Android.SaveNewClinte(name,phone,addr,contact)
    $("#mAddClinte").modal('hide');
}

function searchClinte(elem) {
    $("#ClinteListID").empty()
    Android.LoadClintes(elem.value)
}

function AddToClintesList(id,Name,LastPay,LastAmount,Contact,Credit) {
    // var ID = Date.now()
    ListClintes.push({id : id,name : Name,LastPay : LastPay ,LastAmount : LastAmount,Contact : Contact,Credit : Credit})
    var chtml = `<li onclick="GoToSelectedClinte(this)" data-id="${id}" class="list-group-item d-flex ListItem" style="margin-bottom: 10px;background: #202020;border-radius: 6px;border-style: none;" data-id="${id}">
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



function GoToSelectedClinte(elem) {
    $("#mainClintes").hide();
    $("#selectedClinte").show();
    FixElemtntsSize()
    $("#ClintePagesListImage").empty()
    $("#BoostListPageClinte").empty()
    let clinteID = elem.getAttribute("data-id")
    Android.LoadClinteInfo(clinteID)
    //Android.LoadClinteBootByPage()

    ListClintes.forEach(element => {
        if(element.id == clinteID){
            $("#ClinteName").val(element.name)
            $("#ClinteCredit").val(element.Credit)
            $("#ClinteTotal").val("0 Da")
        }
    })
    ListPages.forEach(element => {
        if(element.adminID == clinteID){
            AddToPageToListClinte(element.id,element.name,element.logo)
        }
    })
    
}

function AddToPageToListClinte(PageID,PageName,srcImag) {
    chtml = `<img class="rounded-circle border" data-id="${PageID}" data-name="${PageName}" src="${srcImag}" style="width: 90%;margin-bottom: 5px;color: var(--bs-purple);" />`
    $("#ClintePagesListImage").append(chtml)
}

function AddToBoostToListClinte(PageID,Start,end,amount) {
    chtml = `<li class="list-group-item" style="background: #292929;margin-bottom: 5px;display: flex;border-radius: 5px;"><i class="fa fa-bullhorn d-flex justify-content-center align-items-center" style="color: rgb(5,130,255);font-size: 24px;"></i>
                <div style="width: 100%;padding-left: 10px;">
                    <div><span style="color: rgb(255,255,255);margin-right: 5px;">Start From </span><span style="color: rgb(255,255,255);width: 100%;">${Start}</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" style="color: rgb(90,234,23);font-size: 12px;float: right;margin-top: 5px;">
                            <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                            <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"></path>
                        </svg></div>
                    <div style="display: initial;"><span style="color: rgb(255,255,255);font-size: 12px;float: left;">${end}</span><span style="color: rgb(56,242,63);font-size: 12px;float: right;">${amount}$</span></div>
                </div>
            </li>`
    $("#BoostListPageClinte").append(chtml)
}

function ReturnToClinteList() {
    $("#selectedClinte").hide();
    $("#mainClintes").show();
}


/* onPage Ready */
$(function(){  
$("#ClinteListID").empty()
try {
    Android.LoadClintes("")
} catch (error) {}

})


function FixElemtntsSize() {
    let PageHeight = document.body.offsetHeight
    let ClintePagesList = document.getElementById('ClintePagesList')
    let BoostListPage = document.getElementById('BoostListPage')
    let navigatonbar = document.getElementById('navigatonbar')
    let AllPageIcon = document.getElementById('AllPages')
    const bottem = navigatonbar.offsetHeight + 20

    const PosTop = ClintePagesList.getBoundingClientRect().top + window.scrollY
    let avaSpace = PageHeight-bottem-PosTop

    let count = parseInt(avaSpace / (AllPageIcon.offsetWidth))-1
    let newSize = (count*AllPageIcon.offsetWidth)+(count * 5)-5

    ClintePagesList.style.height = newSize+"px";
    ClintePagesList.style.maxHeight = newSize+"px";
    BoostListPage.style.height = (avaSpace-14)+"px";
    BoostListPage.style.maxHeight = (avaSpace-14)+"px";

    AllPageIcon.style.height = AllPageIcon.offsetWidth+"px"
   // document.getElementById('AllPages').style.width  = imagePage.offsetWidth+"px"
}



