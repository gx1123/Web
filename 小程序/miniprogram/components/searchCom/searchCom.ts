interface IMyComponents {
  /**
  * 组件的属性列表
  */
  properties: {
    backColor: {
      type: StringConstructor,
      value: string
    },
    placeholder: {
      type: StringConstructor,
      value: string
    },
    leftImg: {
      type: StringConstructor,
      value: string
    },
    rightImg: {
      type: StringConstructor,
      value: string
    },
    typeSearch: {
      type: StringConstructor,
      value: 'view' | 'input'   // view 不可输入  input 可输入取值 
    }
  },
  /**
 * 组件的初始数据
 */
  data: {
    searchValue: string
  },
  /**
  * 组件的方法列表
  */
  methods: {
    clickView (this: WxComponent, event?:any) : void,
    setInputValue(this: WxComponent,event?: any) : void,
    clickRightImg(this: WxComponent, event?: any): void
  }
}
const options: IMyComponents = {
  properties: {
    backColor: {
      type: String,
      value: 'linear-gradient(to right, #FF8351 , #FF4724);'
    },
    placeholder: {
      type: String,
      value: '输入你要搜索的商品/店铺'
    },
     leftImg: {
      type: String,
       value: '../../image/imessage.png'
    },
    rightImg: {
      type: String,
      value: '../../image/kefu.png'
    },
    typeSearch: {
      type: String,
      value: 'view'    // view 不可输入  input 可输入取值 
    }
  },
  data: {
    searchValue: ''
  },
  methods: {
    clickView() {
      this.triggerEvent('clickSearchView', {} , {})
    },
    setInputValue({ detail: { value } }) {
      this.setData!({
        searchValue: value
      })
    },
    clickRightImg() {
      this.triggerEvent('clickRightImg', {}, {})
    }
  }
}

Component(options)