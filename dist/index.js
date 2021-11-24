"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author GyYu
 * @Description //TODO 一个全局发布订阅
 * @Date 16:22 2021/2/3
 **/
var byEvent = /** @class */ (function () {
    function byEvent() {
        this.Events = {};
    }
    /**
     * 发布/ 触发
     * @param eventName
     * @param args
     */
    byEvent.prototype.emit = function (eventName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callbackList = this.Events[eventName] || [];
        callbackList.forEach(function (fn) { return fn.apply(_this, args); });
        return this;
        // 如果用js写，遍历的时候要做一下判断是否是函数，ts 用类型约束，在调用或者编译阶段会检测是否合法
        // callbackList.map(fn=>{
        //     if(typeof fn==="function") fn.apply(this,args)
        // })
    };
    /**
     * 订阅/监听
     * @param eventName
     * @param callback
     */
    byEvent.prototype.on = function (eventName, callback) {
        // if(!eventName||typeof eventName !=="string") return  ；// 因为用了ts 写，所以这句不用写了，如果是js写，建议加这判断
        var callbackList = this.Events[eventName] || [];
        callback && callbackList.push(callback);
        this.Events[eventName] = callbackList;
        return this;
    };
    /**
     * 只订阅一次/监听一次：
     * 思路：
     * 1. 重新包装一个回调函数(有名的)，进行注册订阅/监听,
     * 2. 包装函数里面直接调用 once方法的第二个参数回调函数，然后调用off方法 卸载该包装函数
     * @param eventName
     * @param callback
     */
    byEvent.prototype.once = function (eventName, callback) {
        var _this = this;
        // if(!eventName||typeof eventName !=="string") return ；
        var decor = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            callback && callback.apply(_this, args);
            _this.off(eventName, decor);
        };
        this.on(eventName, decor);
        return this;
    };
    /**
     * 卸载/取消 某一个回调监听(不是取消eventName的所有回调监听),主要配合once一起,实例单独调用,无意义
     * @param eventName
     * @param callback
     */
    byEvent.prototype.off = function (eventName, callback) {
        var callbackList = this.Events[eventName] || [];
        var resCallbacks = callbackList.filter(function (fn) { return fn !== callback; });
        this.Events[eventName] = resCallbacks;
        return this;
    };
    /**
     * 卸载/取消 指定eventName 的所有订阅/监听
     * @param eventName
     * @param callback
     */
    byEvent.prototype.remove = function (eventName, callback) {
        this.Events[eventName] = [];
        callback && callback();
        return this;
    };
    return byEvent;
}());
exports.default = byEvent;
