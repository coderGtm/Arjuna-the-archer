window.onload = () => {
removeBanner();
function landscapeOn() {
    location.reload();
}
if(screen.height > screen.width){
   document.getElementById("rotateImg").style.width = screen.availWidth+"px";
   document.getElementById("rotateImgDiv").style.display = "block";
   window.addEventListener('orientationchange', landscapeOn);
}
else {
    document.getElementById("startTempelate").style.display = "block";
}
};