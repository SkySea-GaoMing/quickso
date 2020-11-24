<template>
    <div class="loginWarpper">
        <h3 class="info">用户登录</h3>
        <div class="form">
            <div class="row">
                <label>手机号</label>
                <el-input placeholder="手机号" v-model="telphone" clearable></el-input>
            </div>

            <div class="row">
                <label>密码</label>
                <el-input placeholder="密码" v-model="password"  clearable></el-input>
            </div>

        </div>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="success" @click="goRegister">注册</el-button>
    </div>
</template>

<script >
    import qs from 'qs'
    export default {
        name: "login",
        data() {
            return {
                telphone: "",
                password: ""
            };
        },
        created() {
            document.title = "login";
        },
        methods: {
            login() {
                if (this.telphone == null || this.telphone == "") {
                    this.$message.error("手机号不能为空");
                    return;
                }

                if (this.password == null || this.password == "") {
                    this.$message.error("密码不能为空");
                    return;
                }
                this._submitForm();
            },
            _submitForm() {
                let form =qs.stringify({
                        telphone: this.telphone,
                        password: this.password
                    }
                )
                this.$axios.post('/login',form,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(successResponse => {
                    if (successResponse.data.status == "success") {
                        alert("登录成功")
                        this.$router.push({ path: "/listgoods"});
                    } else {
                        alert(successResponse.data.data.errMsg);
                    }
                }).catch(failResponse => {
                    alert("登录请求发送失败");
                })
            },
            goRegister() {
                this.$router.replace({path: '/register'})
            }
        }
    };
</script>

<style scoped>

    .info {
        font-size: 23px;
        font-weight: lighter;
    }
    .form {
        padding-top: 10px;
    }
    .row {
        margin: 20px 0;
    }
    label {
        display: block;
        margin-bottom: 10px;
    }
</style>