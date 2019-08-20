/**
 * 交叉类型
 */
{
  let extend = function<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
      (<any>result[id]) = first[id];
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<any>result[id]) = second[id];
      }
    }
    return result;
  };
  class Person {
    public constructor(public name: string) {}
  }
  interface L {
    log(): void;
  }
  class ConsoleL implements L {
    log() {
      console.log("LOG");
    }
  }
  console.log(extend(new Person("GXK"), new ConsoleL()));
}
/**
 * 联合类型
 */
{
  let padLeft = function(value: string, padding: string | number) {};
  padLeft("hello", 1);
  padLeft("hello", "world");
  // padLeft('hello', true) //error
  interface Bird {
    fly();
    layEggs();
  }
  interface Fish {
    swim();
    layEggs();
  }
  let getSmallPet = function(): Fish | Bird {
    return {
      fly() {
        console.log("fly");
      },
      layEggs() {
        console.log("layEggs");
      },
      swim() {
        console.log("swim");
      }
    };
  };
  let pet = getSmallPet();
  // pet.layEggs()  // Ok
  // pet.fly() // error
  // pet.swim()// error
}
/**
 * 类型保护与区分类型
 */
{
  interface Bird {
    fly();
    layEggs();
  }
  interface Fish {
    swim();
    layEggs();
  }
  let getSmallPet = function(): Fish | Bird {
    return {
      fly() {
        console.log("fly");
      },
      layEggs() {
        console.log("layEggs");
      },
      swim() {
        console.log("swim");
      }
    };
  };
  let pet = getSmallPet();

  // if (pet.swim){  // 任何访问都报错
  //     pet.swim()
  // } else if(pet.fly){  // 任何访问都报错
  //     pet.fly()
  // }

  //为了让这段代码工作，我们要使用类型断言
  {
    if ((<Fish>pet).swim) {
      (<Fish>pet).swim();
    } else {
      (<Bird>pet).fly();
    }
  }
  // 用户自定义的类型保护
  {
    let isFish = function(pet: Fish | Bird): pet is Bird {
      // pet is Fish就是类型谓词
      return (<Bird>pet).fly !== undefined;
    };
    if (isFish(pet)) {
      pet.fly();
    } else {
      pet.swim();
    }
  }
  // typeof 类型保护
  {
    let isNumber = function(x: any): x is number {
      return typeof x === "number";
    };
    let isString = function(x: any): x is string {
      return typeof x === "string";
    };
    let padLeft = function(value: string, padding: number | string) {
      if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
      }
      if (isString(padding)) {
        return padding + value;
      }
      throw new Error(`Expected string or number, got '${padding}'.`);
    };
    // 等价
    let padLeft1 = function(value: string, padding: string | number) {
      if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
      }
      if (typeof padding === "string") {
        return padding + value;
      }
      throw new Error(`Expected string or number, got '${padding}'.`);
    };
    // padLeft = padLeft1
  }
  // instanceof 类型保护
  {
    interface Padded {
      getPaddingString(): string;
    }
    class SpaceRepeatingPadded {
      public constructor(private numSpace: number) {}
      getPaddingString() {
        return Array(this.numSpace).join(" ");
      }
    }
    class StringPadded {
      public constructor(private value: string) {}
      getPaddingString() {
        return this.value;
      }
    }
    let getRandomPadded = function() {
      return Math.random() > 0.5
        ? new SpaceRepeatingPadded(1998)
        : new StringPadded("gxk");
    };
    let padded: Padded = getRandomPadded();
    if (padded instanceof SpaceRepeatingPadded) {
      console.log("SpaceRepeatingPadded");
    }
    if (padded instanceof StringPadded) {
      console.log("StringPadded");
    }
  }
}
/**
 * 可以为null类型
 */
{
  // ...所有类型都可以为null
  {
    let num: number = null;
    let str: string = null;
    class Person {
      public constructor(public name: number) {}
    }
    let person: Person = null;
  }
  // 可选参数和可选属性
  {
    // 可选参数
    let f = function(x: number, y?: number) {
      return x + (y || 0);
    };
    f(1);
    f(1, 2);
    f(1, undefined);
    f(1, null); // 严格模式下 报错
    // 可选属性
    class C {
      a: number;
      b?: number;
    }
    let c = new C();
    c.a = 12;
    c.a = undefined; // 严格模式下 error, 'undefined' is not assignable to 'number'
    c.b = 13;
    c.b = undefined; // ok
    c.b = null; //严格模式下  error, 'null' is not assignable to 'number | undefined'
  }
  // 类型保护 和 类型断言
  {
    let f = function(sn: string | null) {
      if (sn === null) {
        return "default";
      }
      return sn;
    };
    // and  短路运算符
    f = function(sn: string | null) {
      return sn || "default";
    };
    //类型断言
    let broken = function(name: string | null): string {
      function postfix(epithet: string) {
        return name.charAt(0) + ". the" + epithet; //严格模式下报错
      }
      name = name || "Bob";
      return postfix("great");
    };
    let fixed = function(name: string | null): string {
      function postfix(epithet: string) {
        return name!.charAt(0) + ".  the " + epithet; // ok
      }
      name = name || "Bob";
      return postfix("great");
    };
  }
}
/**
 * 类型别名
 * 类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
 */
{
  type Name = string;
  type Resolver = () => string;
  type NameOrResolver = Name | Resolver;
  let getName = function(n: NameOrResolver): Name {
    if (typeof n === "string") {
      return n;
    }
    return n();
  };
  getName("gxk");
  getName(() => "str");
  // 泛型
  type Container<T> = {
    value: T;
  };
  type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
  };
  let tree: Tree<number> = {
    value: 1,
    left: <Tree<number>>{},
    right: <Tree<number>>{}
  };
  // 交叉类型
  type LinkedList<T> = T & { next: LinkedList<T> };
  interface Person {
    name: string;
  }
  let people: LinkedList<Person> = {
    name: "gxk",
    next: <LinkedList<Person>>{}
  };

  let s = people.name;
  //   s = people.next.name;
  //   s = people.next.next.name;
  //   s = people.next.next.next.name;
  console.log(s);

  //   type Yikes = Array<Yikes>; // error
}
/**
 * 字符串字面量类型
 */
{
  type Easing = "ease-in" | "ease-out" | "ease-in-out";
  class UIElement {
    animate(easing: Easing) {
      if (easing === "ease-in") {
        console.log("ease-in");
      } else if (easing === "ease-in-out") {
        console.log("ease-in-out");
      } else if (easing === "ease-out") {
        console.log("ease-out");
      } else {
        console.log("else");
      }
    }
  }
  let button = new UIElement();
  button.animate("ease-out");
  // button.animate('else')  //error 类型“"else"”的参数不能赋给类型“Easing”的参数。
}
/**
 * 数字字面量类型
 */
{
  type numEasing = 1 | 2 | 3 | 4 | 5;
  function foo(x: number) {
    if (x !== 1 && x !== 2) {
      //         ~~~~~~~
      // Operator '!==' cannot be applied to types '1' and '2'.
    }
  }
}
/**
 * 可辨别联合
 */
{
  interface Square {
    kind: "square";
    size: number;
  }
  interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
  }
  interface Circle {
    kind: "circle";
    radius: number;
  }
  interface Triangle {
    kind: "triangle";
    width: number;
    height: number;
  }
  type Shape = Square | Rectangle | Circle | Triangle;
  function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
  }
  let area = function(s: Shape): number {
    switch (s.kind) {
      case "square":
        return s.size * s.size;
      case "rectangle":
        return s.width * s.height;
      case "circle":
        return Math.PI * s.radius ** 2;
      case "triangle":
        return (s.width * s.height) / 2;
      default:
        return assertNever(s);
    }
  };
}
/**
 * 多态的 this 类型
 */
{
  class BasicCalculator {
    public constructor(protected value: number = 0) {}
    public currentValue(): number {
      console.log(this.value);
      return this.value;
    }
    public add(operator: number): this {
      this.value *= operator;
      return this;
    }
    public multiply(operator: number): this {
      this.value *= operator;
      return this;
    }
  }
  let basicCalculator = new BasicCalculator(2)
    .multiply(5)
    .add(1)
    .currentValue();
  class ScientificCalculator extends BasicCalculator {
    public constructor(public value: number = 0) {
      super(value);
    }
    public sin(): this {
      this.value = Math.sin(this.value);
      return this;
    }
  }
  let scientificCalculator = new ScientificCalculator(5)
    .multiply(5)
    .add(1)
    .sin()
    .currentValue();
}
/**
 * 索引类型
 */
{
  //下面是如何在TypeScript里使用此函数，通过 索引类型查询和 索引访问操作符：
  let pluck = function<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  };
  interface Person {
    name: string;
    age: number;
  }
  let person: Person = {
    name: "gxk",
    age: 20
  };
  let stringArray: string[] = pluck(person, ["name"]);
  let name: string = pluck(person, ["name"])[0];
  let age: number = pluck(person, ["age"])[0];
  //索引类型和字符串索引签名
  {
    interface Map<T> {
      [key: string]: T;
    }
    // let keys: Map<number> = {
    //   age: 1
    // };
    let keys: keyof Map<number> = 1; // ?????
    let value: Map<number>["foo"] = 1; // ？
  }
}
/**
 * 映射类型
 */
{
  interface Person {
    name: string;
    age: number;
  }
  type Readonly<T> = { readonly [p in keyof T]: T[p] };
  type Partial<T> = { [p in keyof T]?: T[p] };
  let personReadonly: Readonly<Person> = {
    name: "gxk",
    age: 15
  };
  let personPartial: Partial<Person> = {
    name: "gxk"
  };
  type Keys = 'option1' | 'option2'
  type Flags = {
    [k in Keys]: boolean
  }
  //等价于
  type Flags1 = {
    option1: boolean,
    Option2: boolean
  }
  //
  type NullablePerson = {
    [p in keyof Person] : Person[p] | null
  }
  type PartialPerson = {
    [p in keyof Person]? : Person[p]
  }
  type Nullable<T> = {
    [p in keyof T] : T[p] | null
  }
  type Pick<T, K extends keyof T> = {
    [p in K] : T[p]
  }
  type Proxy<T> = {
    get() : T,
    set(value : T) : void
  }
  type ProxIfy<T> = {
    [p in keyof T]: Proxy<T[p]>
  }
  let proxIfy = function<T>(o: T): ProxIfy<T> {
      return
  }
  let unPoxIfy = function<T>(t: ProxIfy<T>) : T {
    let result = {} as T
    for(const k in t) {
      result[k] = t[k].get()
    }
    return result
  }
}
