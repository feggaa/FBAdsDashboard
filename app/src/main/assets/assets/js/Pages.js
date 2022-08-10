function btAddPage() {
    $("#btSelectClinte").text("Select Clinte")
    $("#spinnerLogoPage").hide();
    $("#spinnerNamePage").hide();
    $("#addPage-Name").val("")
    $("#addPage-Link").val("")
    $("#ClinteMenu").empty()
    ListClintes.forEach(element => {
        $("#ClinteMenu").append(`<a onclick="btSelectClinte(this)" class="dropdown-item" href="#" data-id="${element.id}">${element.name}</a>`)
    });
    $("#mAddPage").modal('show');
}

function btSelectClinte(elem) {
    
    $("#btSelectClinte").text(elem.innerHTML)
    $("#btSelectClinte").attr("data-adminid",elem.getAttribute("data-id"))
}

function initPage() {
    $("#spinnerLogoPage").show();
    $("#spinnerNamePage").show();
    console.log("Call LoadPageInfo")
    Android.LoadPageInfo($("#addPage-Link").val())
}

function SaveNewPage() {
    let PageAdmin   = $("#btSelectClinte").text()
    let PageAdminID = $("#btSelectClinte").attr("data-adminid")
    if(PageAdminID == 0) return Android.Toast("You must specify the owner of the page")
    let Pagelink    = $("#addPage-Link").val()
    if(Pagelink == "") return Android.Toast("The page link must be entered")
    let PageName    = $("#addPage-Name").val()
    let PageLogo =   $("#Page-Logo").attr("src")

    Android.SaveNewPage(PageName,Pagelink,PageLogo,PageAdmin,PageAdminID)
    $("#mAddPage").modal('hide');
}

function AddToPagesList(id,name,link,logo,like,admin,adminID) {
    ListPages.push({id : id,name : name,link : link ,logo : logo,like : like,admin : admin,adminID : adminID})
    let chtml = `<li class="list-group-item d-flex ListItem" style="margin-bottom: 10px;background: #202020;border-radius: 6px;border-style: none;padding-bottom: 3px;">
                <div style="width: 10%;margin: auto;margin-right: 10px;"><img src="${logo}" style="width: 32px;border-radius: 50%;margin-left: -5px;" /></div>
                <div style="width: 90%;">
                    <h4 id="PC-1" class="d-flex justify-content-start align-items-center" style="margin-bottom: 0px;color: #ffffff;">${name}</h4>
                    <div class="d-flex align-items-center" style="padding-top: 5px;">
                        <h6 id="textMac-1" style="font-size: 10px;color: #c7cacd;"><svg class="icon icon-tabler icon-tabler-thumb-up" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" style="color: rgb(255,255,255);margin-right: 3px;margin-top: -2px;">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                            </svg><span>${like}</span> people like this</h6>
                        <h6 style="font-size: 10px;color: #c7cacd;margin-left: 15px;">${admin}</h6>
                    </div>
                </div>
            </li>`
    $("#PageListID").append(chtml)
}

$("#PageListID").empty()
Android.LoadPages()