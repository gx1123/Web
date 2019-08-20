/** 
 * 枚举
*/
{
    // 数字枚举
    {
        enum Direction {
            Up = 1,
            Down,
            Left,
            Right
        }
        enum Respond {
            No = 1,
            Yes = 2
        }
        // console.log(Direction)
        let respond = function(recipient: string, message: Respond): void {
            console.log(message)
        }
        respond('direction', Respond.No)
    }
    // 字符串枚举
    {
        enum Direction {
            Up = 'Up1',
            Down = 'Down1',
            Left = 'Left1',
            Right = 'Right1'

        }
        console.log(Direction)
    }
    // 异构枚举
    {
        enum BooleanLikeHeterogeneousEnum {
            No = 0,
            Yes = 'Yes'
        }
        console.log(BooleanLikeHeterogeneousEnum)
    }
    // 计算的和常量变量
    {
        enum FileAccess {
            None,
            Read = 1 << 1,
            Write = 1 << 2,
            ReadWrite = Read | Write,
            G = '1234'.length
        }
        console.log(FileAccess)
    }
    // 联合枚举与枚举成员的类型
    {
        enum ShapeKind {
            Circle,
            Square
        }
        interface Circle {
            kind: ShapeKind.Circle,
            radius: number
        }
        interface Square {
            kind: ShapeKind.Square,
            sideLength
        }
        let c: Circle = {
            radius: 10,
            kind: ShapeKind.Circle 
        }
        // enum E {
        //     Foo,
        //     bar
        // }
        // let f = function(x: E) {
        //     if (x !== E.Foo || x !== E.bar){  // This condition will always return 'true' since the types 'E.Foo' and 'E.bar' have no overlap.

        //     }
        // }

    }
    // 运行时的枚举
    {
        enum E {
            X,
            Y,
            Z
        }
        let f = function(obj: {X: number}){
            return obj.X
        }
        f(E)
    }
    // 反向映射
    {
        enum E{
            A
        }
        let a = E.A
        let nameOfA = E[a]
        console.log(nameOfA)
        console.log(a)
    }
    // const 枚举
    {
        const enum Enum {
            A = 1,
            B = A * 2 
        }
        // console.log(Enum) err
        console.log(Enum.A)
    }
}
// 外部枚举
{  
    // declare enum Enum {
    //     A = 1,
    //     B,
    //     C = 2
    // }
}