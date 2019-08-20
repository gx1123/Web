// 合并接口
{
    interface Box {
        height: number
        width: number
    }
    interface Box {
        scale: number
    }
    let box: Box ={
        height: 100,
        width:100,
        scale: 100
    }
    interface Document {
        createElement(tagName: any) : Element
    }
    interface Document {
        createElement(tagName: 'div'): HTMLDivElement
        createElement(tagName: 'span'): HTMLSpanElement
    }
    interface Document {
        createElement(tagName: string): HTMLElement
        createElement(tagName: 'canvas'): HTMLCanvasElement
    }
}