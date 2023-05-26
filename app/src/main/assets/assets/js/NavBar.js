const list = document.querySelectorAll('.list');
const page = document.querySelectorAll('.Page');

function activeLink(){
    list.forEach((item)=> {
       item.classList.remove('active')
       let elm = document.getElementById(item.id+"-Page")
       //elm.classList.remove('active')
       //elm.classList.add('visually-hidden')
    }
    );
    this.classList.add('active')
    let elm = document.getElementById(this.id+"-Page")
    //elm.classList.add('active')
    //elm.classList.remove('visually-hidden')
}

list.forEach((item) => item.addEventListener('click',activeLink))

LinkHome()
function LinkClintes() {
    let elm = document.getElementById(this.id+"-Page")
    $("#selectedClinte").hide();
    $("#mainClintes").show();
    $("#mainPage").animate({scrollLeft: 0});
}
function LinkPages() {
    let elm = document.getElementById(this.id+"-Page")
    $("#selectedClinte").hide();
    $("#mainClintes").show();
    $("#mainPage").animate({scrollLeft: 360});
}
function LinkHome() {
    let elm = document.getElementById(this.id+"-Page")
    $("#selectedClinte").hide();
    $("#mainClintes").show();
    $("#mainPage").animate({scrollLeft: 360*2});
}
function LinkPayments() {
    let elm = document.getElementById(this.id+"-Page")
    $("#selectedClinte").hide();
    $("#mainClintes").show();
    $("#mainPage").animate({scrollLeft: 360*3});
}
function LinkSettings() {
    let elm = document.getElementById(this.id+"-Page")
    $("#selectedClinte").hide();
    $("#mainClintes").show();
    $("#mainPage").animate({scrollLeft: 360*4});
}