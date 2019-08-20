/**
 *  布尔
*/
{
let isDone: boolean = false
}
/**
 * 数字
 */
{
let decLiteral: number = 6  
let hexLiteral: number = 0xf00d  //十六进制
let binaryLiteral: number = 0b1010  // 二进制
let octalLiteral: number = 0o744
}
/**
 * 字符串
 */
{
let userName: string = 'bob'
let age: number = 21
let sentence: string = `Hello, my name is ${userName}. I'll be ${age + 1} years old next month`
}
/**
 * 数组
 */
{
let listA: number[] = [1,2,3]
let listB: Array<number> = [1,2,3]
}
/**
 * 元组 Tuple
 */
{
let x: [string, number] = ['hello', 10]  // ok  [10, 'hello'] error
}
// console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

// x[3] = 'world'  // OK
// console.log(x[5].toString()) // OK, 'string' 和 'number' 都有 toString
// x[6] = true // Error, 布尔不是(string | number)类型

/**
 * 枚举
 * enum类型
 */
{
enum Color {red = 1,green,yellow = 4}
let c:Color = Color.green
let colorName: string = Color[4]
}
// console.log(c)  // 2
// console.log(colorName)  // yellow

/**
 * any 类型
 * 移除类型检查
 */
{
let notSure: any = 4
let listAny: any[] = [1,true,'3']
notSure = 'string'
notSure = true
listAny[1] = 100
}
/**
 * void类型
 * 表示没有任何类型
 */
{
function warnUser(): void {
    console.log('This is my warning message')
}
let unusable: void = null || undefined
}
/**
 * null 和 undefined 类型
 */
{
    let u:undefined = undefined
    let n:null = null
}
/**
 * never类型
 * 存在无法达到的终点
 */
{
    // 返回never的函数必须存在无法达到的终点
    function error(message:string): never {
        throw error(message)
    }
    // 推断的返回值类型为never
    function fail() {
        error("Something failed")
    }
    // 返回never的函数必须存在无法到达的终点
    function infiniteLoop(): never {
        while(true) {
            console.log('无限循环无法到达的终点')
        }
    }
}
/**
 * object 类型
 */
{
   function create(o: object | null): void {

   }
//    create({prop:0})  // OK
//    create(null)  // OK
//    create(true)  // error
}
/** 
 * 类型断言
*/
{
    {  // 1 尖括号
        let someValue: any = 'this is a string'
        let strLength: number = (<string>someValue).length
    }
    {  // 2 as
        let someValue: any = 'this is a string'
        let strLength: number = (someValue as string).length
    }

}