/** 
 * 接口初探
*/
{   
    let myObj = { size: 10, label: "Size 10 Object" };
    interface LabelValue {
        label: string
    }
    function printLabel(labelObj:{label:string}) {
        console.log(labelObj.label)
    }
    function printLabel1(labelObj:LabelValue){
        console.log(labelObj.label)
    }
    printLabel1(myObj)
}
/** 
 * 可选属性
*/
{
    interface SquareConfig {
        color?: string
        width?: number
    }
    function createSquare(config: SquareConfig) : { color: string; area: number } {
        let newSquare = {
            color: 'white',
            area: 100
        }
        if (config.color){
            newSquare.color = config.color
        }
        if (config.width){
            newSquare.area = config.width * config.width
        }
        return newSquare
    }
    let mySquare = createSquare({color: "black"});
    console.log(mySquare)
}
/**
 * 只读属性
 */
{
    interface Point {
        readonly name: string
        readonly age: number
    }
    let user: Point = { name: 'gxk', age: 18 }
    // user.name = 1  // error

    let arr: number[] = [1,2,3,4,5,6,7,8]
    let newArr: ReadonlyArray<number> = arr
    // newArr[0] = 1  // err
    // newArr.push(1) // err
    // newArr.length = 100  // err
    // arr = newArr // err
    // arr = newArr as number[]  // OK  类型断言
}
/**
 * 额外的属性检查
 */
{   
    interface BoxConfig {
        color?: string
        width?: number
        [propName: string]: any 
    }
    function createBox (config: BoxConfig) : {color: string, area: number} {
        return {color: 'red',area: 1}
    }
   let myBox = createBox({color: 'red', width: 100,height: 100})
}
/**
 * 函数类型
 */
{
    interface SearchFun {
        (source: string, subString: string): boolean
    }  
    let mySearch: SearchFun = function (source: string, subString: string) {
        return false
    }
    // 不需要与接口里定义的名字相匹配 但是返回值类型必须与 SearchFunc接口中的定义匹配
    let mySearch1: SearchFun = function(sou: string, sub: string) {
        return true
    }

}
/**
 * 可索引的类型
 */
{
    interface StringArray {
        [index: number]: string
    }
    let myArray: StringArray = ['a','b']
    let myStr:string = myArray[0]

    /*class Animal {
        name: string;
    }
    class Dog extends Animal {
        breed: string;
    }
    
    // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
    interface NotOkay {
        [x: number]: Animal;
        [x: string]: Dog;
    } */

    /* interface NumberDictionary {
        [index: string]: number
        length: number    // 可以，length是number类型
        name?: number       // 错误，`name`的类型与索引类型返回值的类型不匹配
    } */

    interface ReadonlyArray {   // 只读
        readonly [index: number]: string
    }
    // let myArray1: ReadonlyArray = ['a','b']
    // myArray1[0] = '1'  // error
}
/**
 * 类类型
 */
{
    // interface ClockInterface {
    //     currentTime: Date
    // }
    // class Clock implements ClockInterface {
    //     currentTime: Date
    //     constructor (h: number,m: number){}
    // } 

    // interface ClockInterface1 {
    //     currentTime: Date
    //     setTime(d:Date)
    // }
    // class Clock1 implements ClockInterface1 {
    //     currentTime: Date
    //     setTime(d:Date) {
    //         this.currentTime = d
    //     }
    //     constructor (h: number,m: number){}
    // } 
    // 静态类与实例类
    /*interface ClockConstructor {  
        new (hour: number, minute: number)
    }
    class Clock2 implements ClockConstructor {  //类“Clock2”错误实现接口“ClockConstructor”。类型“Clock2”提供的内容与签名“new (hour: number, minute: number): any”不匹配。
        currentTime: Date;
        constructor(h:number,m:number){

        }
    }*/
    // interface ClockConstructor {
    //     new (hour: number, minute: number): ClockInterface;
    // }
    // interface ClockInterface {
    //     tick();
    // }
    
    // function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    //     return new ctor(hour, minute);
    // }
    
    // class DigitalClock implements ClockInterface {
    //     constructor(h: number, m: number) { }
    //     tick() {
    //         console.log("beep beep");
    //     }
    // }
    // class AnalogClock implements ClockInterface {
    //     constructor(h: number, m: number) { }
    //     tick() {
    //         console.log("tick tick");
    //     }
    // }
    
    // let digital = createClock(DigitalClock, 12, 17);
    // let analog = createClock(AnalogClock, 7, 32);
    interface ClockConstructor {
        new (hour: number, minute: number) : ClockInterface
    }
    interface ClockInterface {
        tick()
    }

    function createClock(ctor: ClockConstructor , hour: number, minute: number): ClockInterface {
        return new ctor(hour,minute)
    }
    class DigitalClock implements ClockInterface {
        constructor(hour: number, minute: number){

        }
        tick(){
            console.log('DigitalClock')
        }
    }
    let digital = createClock(DigitalClock,500,500)
    digital.tick()
}
/**
 * 继承接口
*/
{
    interface Shape {
        color: string
    }
    interface PenStroke  extends Shape {
        penWidth: number
    }
    interface Square extends Shape , PenStroke {
        sideLength :number
    }
    let square = <Square>{}
    square.color = 'red'
    square.penWidth = 100
    square.sideLength = 10
 }
 /**
  * 混合类型
  */
 {
    interface Counter {
        (start: number) : string
        interval: number
        reset(): void
    }
    function getCounter(): Counter{
        let counter = <Counter>function (start: number){return "1" }
        counter.interval = 10
        counter.reset = function () {}
        return counter
    } 
    let c = getCounter()
    c(1)
    c.reset()
    c.interval = 5

 }
 /**
  * 接口继承类
  */
 {
     class Control {
        private state : any
     }
     interface SelectableControl extends Control {
        select (): void
     }
     class Button extends Control implements SelectableControl {
        select () {}
     }
     class TextBox extends Control {
        select () {}
     }
    //  class Image implements SelectableControl {   // 只能够是Control的子类们才能实现SelectableControl接口
    //      select() {}  
    //  }
    class Location {
        
    }
 }