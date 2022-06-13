const router = require('koa-router')()
const axios = require('axios');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

//轮播图
router.get('/carousel',async(ctx,next)=>{
  var response = await axios.get('http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f');
  ctx.body = response.data;
});

//点击导航栏进入到不同的商品分类
router.post('/goodsType',async(ctx,next)=>{
  // console.log(ctx.request.body) 
  ctx.body="ok";
});



module.exports = router
