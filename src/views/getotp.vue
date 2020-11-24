<template>
    <div class="getOtp">
        <h3 class="info">获取otp信息</h3>
        <div class="form">
            <label>手机号</label>
            <el-input placeholder="手机号" v-model="telphone" clearable></el-input>
        </div>
        <el-button type="primary" v-on:click="getPhone">获取otp短信</el-button>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: 'getotp',
        data() {
            return {
                telphone: ''
            };
        },
        created() {
            document.title = "getotp";
        },
        methods: {
            getPhone() {
                var _this = this
                if (this.telphone != null && this.telphone != "") {
                    let form =qs.stringify({
                        telphone: this.telphone
                        }
                    )
                    this.$axios.post('/getotp',form,{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    }).then(successResponse => {
                        console.log(successResponse)
                        console.log(successResponse.data.status)
                        if (successResponse.data.status == "success") {
                            this.$router.replace({path: '/register'})
                        } else {
                            alert("otp发送失败，原因为" + successResponse.data.errMsg);
                        }
                    }).catch(failResponse => {
                        alert("otp发送失败，原因为");
                        })
                } else {
                    this.$message.error("手机号不能为空");
                }
            }
        }
    }
</script>

<style scoped>
    .info {
        font-size: 23px;
        font-weight: lighter;
    }

    .form {
        margin: 24px 0 20px;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }
</style>