<template>
    <div style='color:red;width:100%;text-align:center;position: absolute;top:50%'>
        {{cont}}
    </div>
</template>

<script>
import { getByOrgAndCompanyId } from '@/api/api';
// import { Router } from 'express';
export default {
	// name: 'getByOrgAndCompanyId',
	// components: {

    // },
    data() {
        return{
            cont:'',
        }
    },
    created() {
        this.dataList();
    },
	methods: {
		dataList() {
			let param = {param:JSON.stringify({
                org:window.location.host,
            })
            }
            getByOrgAndCompanyId(param).then(result =>{
                if(result.code == '000000'){ //成功
                    document.title = result.data.title;
                    this.faviconFn(result.data.logoImage);
                    localStorage.setItem("backgroundImage",result.data.backgroundImage);
                    localStorage.setItem("copyrightDiy",result.data.copyrightDiy);
                    localStorage.setItem("host_id", result.data.id);//域名id
                    localStorage.setItem("indexTitle",result.data.title);
                    if(result.data.id !== null){
                        this.$router.push('/Login');
                    }else{
                        this.cont = '当前域名未添加授权'
                    }
                }else if(result.code == '100000'){ //失败
                    // this.$message({
                    //     showClose: true,
                    //     message:result.message,
                    //     type: 'error'
                    // });
                    this.cont = result.message;
                }  
            }).catch((error)=>{});
        },
        faviconFn(faviconUrl){
            var link = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = faviconUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
	}
}
</script>
