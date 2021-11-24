export default class byEvent {
    Events: {
        [key: string]: Array<Function>;
    };
    constructor();
    /**
     * 发布/ 触发
     * @param eventName
     * @param args
     */
    emit(eventName: string, ...args: any[]): this;
    /**
     * 订阅/监听
     * @param eventName
     * @param callback
     */
    on(eventName: string, callback?: Function): this;
    /**
     * 只订阅一次/监听一次：
     * 思路：
     * 1. 重新包装一个回调函数(有名的)，进行注册订阅/监听,
     * 2. 包装函数里面直接调用 once方法的第二个参数回调函数，然后调用off方法 卸载该包装函数
     * @param eventName
     * @param callback
     */
    once(eventName: string, callback?: Function): this;
    /**
     * 卸载/取消 某一个回调监听(不是取消eventName的所有回调监听),主要配合once一起,实例单独调用,无意义
     * @param eventName
     * @param callback
     */
    off(eventName: string, callback: Function): this;
    /**
     * 卸载/取消 指定eventName 的所有订阅/监听
     * @param eventName
     * @param callback
     */
    remove(eventName: string, callback?: Function): this;
}
