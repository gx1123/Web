/**
 * 无状态组件
 */
interface FooProp {
    name: string
    x: number
    y: number
}
declare function AnotherComponents(prop: {name: string});
function ComponentFoo(prop: FooProp) {
    return <AnotherComponents name={prop.name}></AnotherComponents>
}
const button = (prop:{value : string}, context: {color: string}) => <button></button>

/**
 * 类组件
 */
declare namespace  JSX {
    interface ElementClass {
        render: any
    }
}

class MyComponent {
    render () {}
}

function MyFactorFunction () {
    return {
        render() {}
    }
}
<MyComponent/>;  // 正确
<MyFactorFunction/>; // 正确

class NotAValidComponent {}

function NotAValidFactoryFunction() {
    return {}
}
/* <NotAValidComponent/>; */  // 错误
<NotAValidFactoryFunction/>;

let a = <div>
    {['foo', 'bar'].map(i => <span>{i}</span>)}
</div>