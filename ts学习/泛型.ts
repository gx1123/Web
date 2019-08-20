/** 
 * 泛型 Hello world
*/
{
    function identity<T> (arg: T): T{
        return arg
    }
    let output = identity<string>('1')
    // let output = identity('1')  自动判断类型
}
/**
 * 使用泛型变量
 */
{
    function loggingIdentity<T>(arg: T): T {
        // console.log(arg.length)   // error  if arg = number 类型“T”上不存在属性“length”。
        return arg
    }
    function loggingIdentity1<T>(arg: T[]): T[] {
        console.log(arg.length)  // OK
        return arg
    }
    function loggingIdentity2<T>(arg: Array<T>) : Array<T>{
        console.log(arg.length)
        return arg
    }
   let output =  loggingIdentity1([1])
   interface fileList {
       uid: number | string
       file?: object
       url: string
   }
   let list: fileList[] = [{uid: 123,url: 'http'},{uid: '1234yu',url: 'http',file:{}}]
}
/**
 * 泛型类型
 */
{
    interface GenericIdentityFn {
        <G>(arg: G) : G
    }
    interface GenericIdentityFn1<G> {
        (arg: G) : G
    }
    
    function identity1 <T>(arg: T): T {
        return arg
    }
    function identity2(arg): void{
       
    }
    let myIdentity: <U>(arg: U) => U = identity1
    let myIdentity1: { <A>(arg: A): A } = identity1
    let myIdentity2: GenericIdentityFn = identity1
    let myIdentity3: GenericIdentityFn1<number> = identity1
    myIdentity3(1)
}   
/**
 * 泛型类
 */
{
    class  GenericNumber<T>{
        zeroValue: T
        add: (x: T, y: T) => T
    }
    let genericNumber = new GenericNumber<number>()
    genericNumber.add = function (x, y) { return x + y }
    genericNumber.zeroValue = 0
}
/** 
 * 泛型约束
 */
{
    interface Lengthwise {
        length: number
    }
    function loggingIdentity3<T extends Lengthwise>(arg: T) : T{
        console.log(arg.length)
        return arg
    }
    loggingIdentity3({value: 1,length: 10})
    //在泛型约束中使用类型参数
    {
        function getProperty<T,K extends keyof T>(obj: T, key: K): T[K] {
            return obj[key];
        }
        let x = { a: 11, b: 2, c: 3, d: 4 };
        getProperty(x, "a"); // okay
        // getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
    
    }
    //在泛型里使用类类型
    {
        function createClass<T>(c: {new(): T}): T {
            return new c()
        }
        class Beekeeper {
            hasMask: boolean
        }
        class ZooKeeper {
            nameTag: string
        }
        class Animal {
            numLegs: number
        }
        class Bee  extends Animal{
            keeper: Beekeeper
        }
        class Lion extends Animal{
            keeper: ZooKeeper
        }
        function createInstance<A extends Animal>(c: new() => A) : A {
            return new c()
        }
    }
}