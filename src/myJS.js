var myGo = function (arr,name) {
    for (let i = 0; i < arr.length; i++){
        if (arr[i].name == name) {
         //   console.log('name:'+name);
            // document.getElementsByClassName('el-tag')[i].style.cssText  = "color:#F8C059;border-bottom:2px #F8C059 solid"
        }else {
            // document.getElementsByClassName('el-tag')[i].style.cssText  = "color:#000000;border-bottom:none"
        }
    }

}

export default {
    myGo
}