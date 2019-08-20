/**
 * 数组解构
 */
   
{
    let input: [number,number] = [1,2];
    function f([first, second]: [number,number] ) {
        console.log(first);
        console.log(second);
    }
    // f(input);
}

/**
 * 对象解构
 */
{
    let obj = {
        name: "gxk",
        age: 20,
        sex: 'man'
    }
    let {name, age}: {name:string, age:number} = obj
    function keepWholeObject(wholeObject:{ name: string, age?: number}) {
        let { name, age = 18 } = wholeObject
    }
    // keepWholeObject(obj)
}
/**
 * 函数声明
 */
{
    type c = {name:string, age?:number }
    function userInfo({ name, age }: c): void {
        console.log(name + age)
    }
    function userInfo1({name = '', age = 18} = {}):void{
        console.log('name:' + name)
        console.log('age:' + age)
    }
    function userInfo2({name, age = 18} = {name: ""}): void {
        console.log('name:' + name)
        console.log('age:' + age)
    }
    // userInfo2() // ok
    // userInfo2({name: 'hxk'}) // ok
    // userInfo2({})  // error
}
