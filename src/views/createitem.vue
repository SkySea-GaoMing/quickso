<template>
    <div class="createGoods">
        <h3 class="info">创建商品</h3>
        <div class="form">
            <div class="row">
                <label>商品名</label>
                <el-input placeholder="商品名" v-model="goods.title" clearable></el-input>
            </div>

            <div class="row">
                <label>商品描述</label>
                <el-input placeholder="商品描述" v-model="goods.description"  clearable></el-input>
            </div>

            <div class="row">
                <label>价格</label>
                <el-input placeholder="价格" v-model="goods.price"  clearable></el-input>
            </div>

            <div class="row">
                <label>图片</label>
                <el-input placeholder="图片" v-model="goods.imgUrl"  clearable></el-input>
            </div>

            <div class="row">
                <label>库存</label>
                <el-input placeholder="库存" v-model="goods.stock"  clearable></el-input>
            </div>
        </div>
        <el-button type="primary" @click="createGoods">提交创建</el-button>
    </div>
</template>

<script >
    import qs from 'qs'
    export default {
        name: 'createitem',
        data() {
            return {
                goods: {}
            };
        },
        created() {
            document.title = "createGoods";
        },
        methods: {
            createGoods() {
                if (this.goods.title == null || this.goods.title == "") {
                    this.$message.error("商品名称不能为空");
                    return;
                }

                if (this.goods.description == null || this.goods.description == "") {
                    this.$message.error("商品描述不能为空");
                    return;
                }

                if (this.goods.price == null || this.goods.price == "") {
                    this.$message.error("商品价格不能为空");
                    return;
                }

                if (this.goods.imgUrl == null || this.goods.imgUrl == "") {
                    this.$message.error("商品图片不能为空");
                    return;
                }

                if (this.goods.stock == null || this.goods.stock == "") {
                    this.$message.error("商品库存不能为空");
                    return;
                }
                this._submitForm();
            },
            _submitForm() {
                let form =qs.stringify({
                        title: this.goods.title,
                        description: this.goods.description,
                        price: this.goods.price,
                        imgUrl: this.goods.imgUrl,
                        stock: this.goods.stock
                    }
                )
                this.$axios.post('/item/create',form,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(successResponse => {
                    console.log(successResponse)
                    if (successResponse.data.status == "success") {
                        alert("创建成功")
                    } else {
                        alert(successResponse.data.data.errMsg);
                    }
                }).catch(failResponse => {
                    alert("创建请求发送失败");
                })
            }
        }
    };
</script >

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