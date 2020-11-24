<template>
    <div class="goodsDetail">
        <h3>商品详情</h3>
        <div class="form">
            <div class="row" style="color: red">
                <p v-if="goods.promoStatus == 1">秒杀活动将于{{goods.startDate}}开始售卖 倒计时: {{delta}}秒</p>
                <p v-if="goods.promoStatus == 2">秒杀正在进行中</p>
            </div>
            <div class="row">
                <p>{{goods.title}}</p>
            </div>

            <div class="row">
                <label>商品描述</label>
                <label>{{goods.description}}</label>
                <p></p>
            </div>

            <div class="row" >
                <label>价格</label>
                <p>{{goods.price}}</p>
            </div>

            <div class="row">
                <label style="color: red">秒杀价格</label>
                <p style="color: red">{{goods.promoPrice}}</p>
            </div>

            <div class="row">
                <div class="goods-img">
                    <img :src="goods.imgUrl">
                </div>
            </div>

            <div class="row">
                <label>库存</label>
                <p>{{goods.stock}}</p>
            </div>

            <div class="row">
                <label>销量</label>
                <p>{{goods.sales}}</p>
            </div>
        </div>
        <el-button type="primary" @click="buy" :disabled="goods.promoStatus == 1">下 单</el-button>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: 'getitem',
        data() {
            return {
                id: null,
                goods: {},
                delta: null
            };
        },
        created() {
            document.title = "goodsDetail";
            this.id = this.$route.query.id;
            if(this.id)
                this._getGoodsDetail();
        },
        methods: {
            _getGoodsDetail() {
                this.$axios.get('/item/get?id='+this.id).then(successResponse => {
                    console.log(successResponse)
                    console.log(successResponse.data)
                    if(successResponse.data.status == "success") {
                        this.goods=successResponse.data.data.good
                        setInterval(this.countDown, 1000);
                    } else {
                        alert(successResponse.data.data.errMsg);
                    }
                }).catch(failResponse => {
                    alert("获取商品请求发送失败");
                })
            },
            buy() {
                let form = qs.stringify({
                    itemId: this.id,
                    amount: 1,
                    promoId: this.goods.promoId
                })
                this.$axios.post('/item/createorder',form,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(successResponse => {
                    console.log(successResponse)
                    if (successResponse.data.status == "success") {
                        alert("下单成功")
                        this._getGoodsDetail();
                    } else {
                        alert(successResponse.data.data.errMsg);
                        if(successResponse.data.data.errCode==20003)
                        {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    }
                }).catch(failResponse => {
                    alert("下单请求发送失败");
                })
            },
            countDown() {
                let startTime = this.goods.startDate.replace(new RegExp("-", "gm"), "/");
                startTime = new Date(startTime).getTime();
                let nowTime = Date.parse(new Date());
                this.delta = (startTime - nowTime) / 1000;

                if(this.delta <= 0){
                    this.goods.promoStatus = 2;
                }
            }

        }
    };
</script>

<style scoped>
    h3 {
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

    p {
        line-height: 30px;
    }


    img {
        width: auto;
        height: 140px;
    }

</style>