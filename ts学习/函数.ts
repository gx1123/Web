/**
 * 函数类型
 */
{
    // 为函数定义类型
    {
        function add(x: number, y: number): number {
            return x + y
        }
        let myAdd = function(x: number, y: number): number {
            return x + y
        }
    }
    //书写完整函数类型
    {
       let add: (x: number, y: number) => number = function (x: number, y: number) { return x + y }
    }
    // 类型推断
    {
        let myAdd: (x: number, y: number) => number = function(x,y) { return x + y }
    }
}
/**
 * 可选参数和默认参数
 */
{
    // 必传参数 不可多传
    function buildName (firstName: string, lastName: string): string{
        return firstName + lastName
    }
    
    // 可选参数  不可多传
    function buildName1 (firstName: string, lastName?: string): string {
       if (lastName) {
           return firstName + lastName
       } else {
           return firstName
       }
    }

    // 默认参数 不可多传
    function buildName2 (firstName: string, lastName: string = 'mm') {
        return firstName + lastName
    }
    
    // 剩余参数
    function buildName3 (firstName: string, ...restOfName: string[]): string {
        return firstName + restOfName.join(',')
    }
    let buildName3Fun: (first: string, ...rest: string[]) => string = buildName3
    // console.log(buildName3Fun('Joseph','Samuel','Lucas','Mack'))
}
/**
 * this
 */
{
    // this 和 箭头函数
    {
        interface Card {
            suit: string
            card: number
        }
        interface Deck {
            suits: string[]
            cards: number[]
            createCardPicker(this: Deck) : () => Card
        }
        let deck: Deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            createCardPicker (this: Deck) {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52)
                    let pickedSuit = Math.floor(pickedCard / 13)
                    return { suit: this.suits[pickedSuit], card: pickedCard % 13}
                }
            }
        }   
    }
    // this参数在回调函数里
    // interface UIElement {
    //     addClickListener(onClick:(this:void, e: Event ) => void): void
    // } 
    // class Handler {
    //     public info: string
    //     public onClickBad(this: void, e: Event) {
    //         this.info = e.message   // 不允许使用this
    //     }
    // }
    // let handler = new Handler()
}
/**
 * 重载
 */
{
    let suits = ["hearts", "spades", "clubs", "diamonds"]
    function pickCard(x:{suit: string, card: number}[]): number;
    function pickCard(x: number): {suit: string, card: number};
    function pickCard(x): any{
        if (typeof x === 'object'){
            return 1
        } else if (typeof x === 'number') {
            return {suit: 'KKK', card: 3}
        }
    }
    let myDeck = [{suit: 'yyy', card: 1}]
    let pickedCard1 = myDeck[pickCard(myDeck)]
    console.log(myDeck)
    let pickCard2 = pickCard(1)
    console.log(pickCard2)

}