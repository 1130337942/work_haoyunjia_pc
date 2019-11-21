<template>
  <div>
      <ul>
        <li>
           <img src="./../../assets/img/upgrade.png" alt="">   
        </li>   
        <li>系统升级中！</li>
        <li>请稍后再试！</li>
        <li>给您带来的不便，我们深感歉意！</li>
      </ul>
  </div>
</template>

<script>

export default {
  name: "Login",
  components: {

  },
  data() {

  },
  methods: {

  },
  created(){
      
  }
};
</script>
<style type="text/css" src="../../Style/init.css"></style>
<style lang="scss" scoped>
ul{
    text-align: center;
    padding-top:10%;
}
ul li:nth-child(1){
    //width:500px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
}
ul li:nth-child(1) img {
    width: auto;
    height: auto;
    max-width: 30%;
    max-height: 30%;
}
ul li:nth-child(2){
    font-size:36px;
    font-family:PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin: 30px 0 10px 0;
}
ul li:nth-child(3), ul li:nth-child(4){
    font-size:18px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
}
</style>
