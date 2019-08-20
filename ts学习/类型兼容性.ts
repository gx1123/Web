/**
 * 介绍
 */
{
    interface Named {
        name: string;
    }
    
    class Person {
        name: string;
    }
    
    let p: Named;
    // OK, because of structural typing
    p = new Person();
}
/**
 * 开始
 */
{
    interface  Named {
        name: string
    }
    let x: Named;
    let y = {
        name: '哈哈哈',
        age: 13
    }
    x = y
    let greet  = function(user: Named){
        console.log(`Hello ${user.name}`)
    }
    greet(y)
}
/**
 * 比较两个函数
 */
{
    {
        let x = (a: number) => 0;
        let y =  (b: number, s: string) => 0;
        // x = y  // 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”。
        y = x // ok
        let a = () => ({name: 'gxk'});
        let b = () => ({name: 'gxk',age: 18})
        a = b
        // b = a // err
    }
    // 函数参数
    {
        enum EventType {
            Mouse,
            Keyboard
        }
        interface Event {
            timestamp: number
        }
        interface MouseEvent extends Event {
            x: number
            y: number
        }
        interface KeyEvent extends Event {
            keyCode: number
        }
        let listenEvent = function(eventType: EventType, handler: (n: Event) => void): void{
            console.log(eventType)
            handler((<Event>{timestamp:1, x: 1, y: 2}))
        }
        //不健全，但有用和常见
        listenEvent(EventType.Mouse, (e: MouseEvent) =>{
            console.log(e.x)
            console.log(e.y)
        });
        // 存在稳健的不受欢迎的替代方案
        listenEvent(EventType.Mouse,(e: Event) =>{
            console.log((<MouseEvent>e).x)
            console.log((<MouseEvent>e).y)
        })
        listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) =>{
            console.log(e.x + ',' + e.y)
        }))
        //仍然不允许(明显错误)。为完全不兼容的类型强制执行类型安全
        // listenEvent(EventType.Mouse,(e: number) => {
        //     console.log(e)
        // })
    }
    //可选参数与剩余参数
    {
        let invokeLater = function(args: any[], callback: (...args: any[]) => void) {
            callback(args[0], args[1])
        }
        invokeLater([1,2,3,4,'5'],(x,y) => console.log(x + y))
        invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));
    }
}
 /** 
  * 枚举
 */
{
    //枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容
    enum Status {
        Ready,
        Waiting
    }
    enum Color {
        Red,
        Blue,
        Green
    }

    let status = Status.Ready
    // status = Color.Red
}
/**
 * 类
 */
{
    //类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。
    class Animal {
        public feet: number
        public constructor(name: string, numFeet: number) {

        }
    }
    class Size {
        public feet: number
        public constructor(name: string) {

        }
    }
    let a: Animal;
    let s: Size;
    a = s
    s = a

}
/**
 * 泛型
 */
{
    //类型参数只影响使用其做为类型一部分的结果类型
    interface Empty<T>{

    }
    let n: Empty<number>
    let s: Empty<string>
    n = s;
    s = n

    interface NotEmpty<T> {
        data: T
    }
    let n1: NotEmpty<number>
    let s1: NotEmpty<string>
    // n1 = s1   //err
    // s1 = n1  // err
 }