<template>
    <div class="register">
        <h3 clas="info">用户注册</h3>
        <div class="form">
            <div class="row">
                <label>手机号</label>
                <el-input placeholder="手机号" v-model="user.telphone" clearable></el-input>
            </div>

            <div class="row">
                <label>验证码</label>
                <el-input placeholder="验证码" v-model="user.otpCode"  clearable></el-input>
            </div>

            <div class="row">
                <label>用户名</label>
                <el-input placeholder="用户名" v-model="user.name"  clearable></el-input>
            </div>

            <div class="row">
                <label>性别</label>
                <el-input placeholder="性别" v-model="user.gender"  clearable></el-input>
            </div>

            <div class="row">
                <label>年龄</label>
                <el-input placeholder="年龄" v-model="user.age"  clearable></el-input>
            </div>

            <div class="row">
                <label>密码</label>
                <el-input type="password" placeholder="密码" v-model="user.password"  clearable></el-input>
            </div>

        </div>
        <el-button type="primary" @click="register">提交注册</el-button>
    </div>
</template>

<script >
    import qs from 'qs'
    export default {
        name: 'register',
        data() {
            return {
                user: {}
            };
        },
        created() {
            document.title = "register";
        },
        methods: {
            register() {
                if (this.user.telphone == null || this.user.telphone == "") {
                    this.$message.error("手机号不能为空");
                    return;
                }

                if (this.user.otpCode == null || this.user.otpCode == "") {
                    this.$message.error("验证码不能为空");
                    return;
                }

                if (this.user.name == null || this.user.name == "") {
                    this.$message.error("用户名不能为空");
                    return;
                }

                if (this.user.gender == null || this.user.gender == "") {
                    this.$message.error("性别不能为空");
                    return;
                }

                if (this.user.age == null || this.user.age == "") {
                    this.$message.error("年龄不能为空");
                    return;
                }

                if (this.user.password == null || this.user.password == "") {
                    this.$message.error("密码不能为空");
                    return;
                }
                this._submitForm();
            },
            _submitForm() {
                let form =qs.stringify({
                        telphone: this.user.telphone,
                        otpCode: this.user.otpCode,
                        name: this.user.name,
                        gender: this.user.gender,
                        age: this.user.age,
                        password: this.user.password
                    }
                )
                this.$axios.post('/register',form,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(successResponse => {
                    if (successResponse.data.status == "success") {
                        this.$router.replace({path: '/login'})
                    } else {
                        console.log(successResponse)
                        alert(successResponse.data.data.errMsg);
                    }
                }).catch(failResponse => {
                    alert("注册请求发送失败");
                })
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