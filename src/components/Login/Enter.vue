<template>
        <el-carousel :style="{'height': autoHeight + 'px'}" :autoplay="false" arrow="always">
            <el-carousel-item class="carousel">
                <div class="carousel_image_type bkg_wall">
                            <div class="wicket">
                                <h1><img src="../../assets/img/wicket_logo.png" alt=""></h1>
                                <h2>公司入驻</h2>
                                <h3> hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊 </h3>
                                <p>
                                    <el-button type="warning" style="background: rgb(231, 154, 24); width:400px;height:54px;font-size:18px;margin:0 auto;">入驻</el-button>
                                </p>
                            </div>
                </div>
                <img src="../../assets/img/enter_company.jpg" class="bkg">
            </el-carousel-item>
            <el-carousel-item  class="carousel">
                <div class="carousel_image_type bkg_wall">
                    <div class="wicket wickets">
                            <h1><img src="../../assets/img/wicket_logo.png" alt=""></h1>
                            <h2>我是员工</h2>
                            <h3> hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊 </h3>
                            <p>
                                <el-button type="warning" style="background: rgb(231, 154, 24); width:400px;height:54px;font-size:18px;margin:0 auto;">入驻</el-button>
                            </p>
                        </div>
                </div>
                <img src="../../assets/img/enter_staff.jpg" class="bkg">
            </el-carousel-item>
            <el-carousel-item>
                <div class="carousel_image_type bkg_wall">
                    <div class="wicket">
                            <h1><img src="../../assets/img/wicket_logo.png" alt=""></h1>
                            <h2>中国合伙人</h2>
                            <h3> hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊 </h3>
                            <p>
                                <el-button type="warning" style="background: rgb(231, 154, 24); width:400px;height:54px;font-size:18px;margin:0 auto;">入驻</el-button>
                            </p>
                    </div>
                </div>
                <img src="../../assets/img/enter_partner.jpg" class="bkg">
            </el-carousel-item>
            <el-carousel-item>
                <div class="carousel_image_type bkg_wall">
                    <div class="wicket">
                            <h1><img src="../../assets/img/wicket_logo.png" alt=""></h1>
                            <h2>创建店铺</h2>
                            <h3> hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊 </h3>
                            <p>
                                <el-button type="warning" style="background: rgb(231, 154, 24); width:400px;height:54px;font-size:18px;margin:0 auto;">入驻</el-button>
                            </p>
                    </div>
                </div>
                <img src="../../assets/img/enter_store.jpg" class="bkg">
            </el-carousel-item>
            <el-carousel-item>
                <div class="carousel_image_type bkg_wall">
                    <div class="wicket">
                            <h1><img src="../../assets/img/wicket_logo.png" alt=""></h1>
                            <h2>自由职业者</h2>
                            <h3> hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊  hi 您好啊 </h3>
                            <p>
                                <el-button type="warning" style="background: rgb(231, 154, 24); width:400px;height:54px;font-size:18px;margin:0 auto;">入驻</el-button>
                            </p>
                    </div>
                </div>
                <img src="../../assets/img/enter_liberty.jpg" class="bkg">
            </el-carousel-item>
        </el-carousel>
</template>

<script>
    export default {
        name: 'Enter',
        data () {
            return {
                /*sliders:[
                    {
                        img:'../../assets/img/enter_company.jpg'
                    },
                    {
                        img:'../../assets/img/enter_liberty.jpg'
                    },
                    {
                        img:'../../assets/img/enter_partner.jpg'
                    },
                    {
                        img:'../../assets/img/enter_staff.jpg'
                    },
                    {
                        img:'../../assets/img/enter_store.jpg'
                    }
                ],
                currentIndex:1,
                distance:-600,
                transitionEnd: true,*/
                autoHeight: window.innerHeight
            }
        },
    }
</script>

<style type="text/css" src="../../Style/init.css"></style>
<style lang="scss">
    /*上一页下一页*/
    .el-carousel__arrow{
        color:red;
    }
    .el-carousel__arrow{
        background-color:transparent !important;
        width: 86px !important;
        height:84px !important;
    }
    .el-carousel__arrow:hover{
        background-color:transparent;
    }
    .el-carousel__arrow--left{
        background: url("../../assets/img/btn_left.png") no-repeat center;
        background-size: cover;
        overflow: hidden;
        left:107px!important;
    }
    .el-carousel__arrow--right{
        background: url("../../assets/img/btn_right.png") no-repeat center;
        background-size: cover;
        overflow: hidden;
        right:107px!important;
    }
    .el-carousel__arrow i{
        display: none;
    }
    /*底部*/
    .el-carousel__indicator--horizontal {
        padding: 0!important;
        margin: 0 10px 187px 10px !important;
    }
    .el-carousel__button{
        width:40px !important;
        height:10px !important;
        background: rgba(255, 255, 255, 0.5);
    }
</style>
<style>
    .el-carousel--horizontal .el-carousel__container {
        height: 100%;
    }
    .carousel_image_type{
        width: 100%;
        height: 100%;
    }
    .wicket{
        width:723px;
        height:510px;
        margin: 257px auto;
        background-color:rgba(0, 0, 0, 0.6);
        border-radius: 2px;
    }
    .wickets{
        height:444px;
    }
    .bkg_wall{
        position: absolute;
    }
    .bkg{
        width: 100%;
        height:100%;
    }
    .wicket h1,.wicket h2,.wicket p{
        text-align:center;
    }
    .wicket h3{
        width:468px;
        /*height:88px;*/
        margin:0 auto;
    }
    .wicket h1{
        padding: 60px 0 30px 0;
    }
    .wicket h3{
        padding: 20px 0 60px 0;
        font-size:14px;
    }
    .wicket h2{
        font-size:36px;
    }
    .wicket h1 img{
        width:80px;
        height:88px;
    }
</style>
