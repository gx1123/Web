/**
 * 类
 */
{
    class Greeter {
        greeting: string
        constructor (message: string) {
            this.greeting = message
        }
        greet () {
            return `Hello, ${this.greeting}`
        }
    }
    let greeter = new Greeter('world')
}
/**
 * 继承
 */
{
    class Animal {
        name: string
        constructor(theName: string) { 
            this.name = theName
        }
        move(distanceInMeters: number = 0 ) {
            console.log(`${this.name} moved ${distanceInMeters}m.`)
        }
    }
    class Snake extends Animal {
        constructor( name: string ){
            super(name)
        }
        move (distanceInMeters = 5) {
            console.log('Slithering...')
            super.move(distanceInMeters)
        }
    }
    class Horse extends Animal{
        constructor (name: string){
            super(name)
        }
        move (distanceInMeters = 45){
            console.log("Galloping...");
            super.move(distanceInMeters)
        }
    }
    let sam = new Snake('Sammy the Python')
    let tom: Animal = new Horse('Tommy the Palomino')
    // sam.move(111)
    // tom.move(152)
}
/**
 * 公共 私有与受保护的修饰符 默认为 public
 */
{
    //理解 private
    {
        class Animal {
            private name: string
            public constructor(theName: string){
                this.name = theName
            }
            public move (distanceInMeters = 5){
                console.log(`${this.name} moved ${distanceInMeters}m.`)
            }
        }
        class Horse extends Animal{
            constructor (){
                super('Rhino')
            }
            move (distanceInMeters = 45){
                // console.log(super.name); // 私有属性不能在Animal外访问
                super.move(distanceInMeters)
            }
        }
        class Employee {
            private name: string
            constructor (theName: string){
                this.name = theName
            }
        }
        // let animal = new Animal('GXK')
        // let horse = new Horse()
        // let employee = new Employee('GSS')
        // animal = horse  // OK
        // animal = employee // error
        // console.log(animal.name)   //私有属性不能在Animal外访问
    }
    // 理解 protected
    {
        class Person {
            protected name : string
            protected constructor (theName: string) {
                this.name = theName
            }
        }
        class Employee extends Person {
            private department : string
            constructor (name: string, department : string) {
                super(name)
                this.department = department
            }
            public getElevatorPitch () {
                console.log(`Hello, my name is ${this.name} and I work in ${this.department}.`)
            }
        }
        let employee = new Employee('郭锡坤','研发')
        // let person = new Person('谁都不好使')   // error 类“Person”的构造函数是受保护的，仅可在类声明中访问。
        employee.getElevatorPitch()
        // employee.name  // 属性“name”受保护，只能在类“Person”及其子类中访问。
    }

}
/**
 * readonly 修饰符
 */
{
    class Octopus {
        readonly name: string           // ↓ 创建 和 初始化 numberOfLegs
        constructor (theName: string,  readonly numberOfLegs: number = 8) {
            this.name = theName
        }
    }
    let octopus = new Octopus('Man with')
    console.log(octopus.name)
    console.log(octopus.numberOfLegs)
    // octopus.name = '哈哈哈' // name属性为只读 不可修改
}
/**
 * 存取器
 */
{
    let passCode = 'secret passCode'
    class Employee {
        private _fullName : string
        get fullName () : string {
            return this._fullName
        }
        set fullName (newValue: string) {
            if (passCode && passCode === 'secret passCode') {
                this._fullName = newValue
            } else {
                console.log('Error: Unauthorized update of employee')
            }

        }
    }
    // let employee = new Employee()
}
/**
 * 静态属性
 */
{
    class Grid {
        static origin = {x: 0, y: 0}
        calculateDistanceFromOrigin (point:{x: number, y: number}) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
        constructor(public scale: number) {

        }
    }
    let grid1 = new Grid(1.0)
    let grid2 = new Grid(5.0)
    console.log(grid1.calculateDistanceFromOrigin({x:10, y:10}))
    console.log(grid2.calculateDistanceFromOrigin({x:10, y:10}))
}
/**
 * 抽象类
 */
{
    abstract class Department {
       constructor (public name : string) {}
       printName (): void {
           console.log(`Department name: ${this.name} `)
       }
       abstract printMeeting(): void
    }
    class AccountingDepartment extends Department {
        constructor () {
            super('Accounting and Auditing')
        }
        printMeeting(): void {
            console.log('The Accounting Department meets each Monday at 10am.')
        }
        generateReports (): void {
            console.log('Generating accounting reports...');
        }
    }
    let department: Department
    // department = new Department()  // 无法创建抽象类的实例。
    department = new AccountingDepartment()
    department.printMeeting()
    department.printName()
    // department.generateReports()  //类型“Department”上不存在属性“generateReports”。
}
/**
 * 高级技巧
 */
{
    class Greeter {
        static standardGreeting = 'Hello， there'
        greeting: string
        greet(){
            if (this.greeting) {
                return `Hello, ${this.greeting}`
            } else {
                return Greeter.standardGreeting
            }
        }

    }
    let greeter: Greeter
    greeter = new Greeter()
    let greeterMaker: typeof Greeter = Greeter
    greeterMaker.standardGreeting = 'Hello, gxk'
    console.log(greeterMaker)
    let greeter1:Greeter = new greeterMaker()
    console.log(greeter1.greet())
    // 把类当接口
    class Point {
        x: number
        y: number
    }
    class Point3d extends Point {
        z: number
    }
    let point3d: Point3d = {x: 1, y: 1, z: 1}
}