# publish-subscribe-pattern

>  author：ygy
>
> 发布订阅模式：应用场景为前端页面记录用户操作步骤
>
> 参考：https://www.cnblogs.com/beyonds/p/13590773.html
>
> A typeScript project

## Setup

``` bash
npm i publish-subscribe-pattern
```

### use

```typescript
// 使用示例
import byEvent from 'publish-subscribe-pattern'
let event = new byEvent()
setInterval(() => {
    event.emit("name", 123) // 注册name的监听
    event.emit("name", 10, 20) 
    event.emit("post", { name: 1212 }, "post") //注册post的监听

}, 1000);
setTimeout(() => {
    event.remove("name", function () {// 移除name的监听
        console.log("remove")
    })
}, 3000)
event.once("name", function (...res: any[]) { //注册监听只进入一次的回调
    console.log("once-name1", res) //res 是注册时的参数
})
event.on("name", function (...res: any[]) { //注册监听的回调
    console.log("on-name2", res)
})
event.on("post", function (...res: any[]) {//注册监听的回调
    console.log("on-post", res)

```

