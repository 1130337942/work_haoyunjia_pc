<template>
    <ul>
        <li>
            <ul class="help clearfix">
                <li class="left">帮助</li>
                <li class="left">隐私</li>
                <li class="left">条款</li>
            </ul>
        </li>
        <li style="font-size:12px;">copyright <img src="../../assets/img/c_icon.png" alt="图片错误" style="width: 12px;height:12px;"> 2019繁昌一招盈人力资源服务有限公司</li>
    </ul>
</template>

<script>
    export default {
        name: "myFooter"
    }
</script>
<style src="./../../Style/init.css"></style>
<style scoped>
    /*底部*/
    .help li{
        width: 28px;
        height:22px;
        margin: 20px 20px 8px 20px;
        font-size:14px;
        list-style: none;
        text-align: center;
        line-height: 22px;
    }
    .help{
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
</style>
