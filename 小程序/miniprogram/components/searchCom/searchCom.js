"use strict";
const options = {
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
            value: 'view'
        }
    },
    data: {
        searchValue: ''
    },
    methods: {
        clickView() {
            this.triggerEvent('clickSearchView', {}, {});
        },
        setInputValue({ detail: { value } }) {
            this.setData({
                searchValue: value
            });
        },
        clickRightImg() {
            this.triggerEvent('clickRightImg', {}, {});
        }
    }
};
Component(options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQ29tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoQ29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUF5Q0EsTUFBTSxPQUFPLEdBQWtCO0lBQzdCLFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLCtDQUErQztTQUN2RDtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGNBQWM7U0FDdEI7UUFDQSxPQUFPLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtZQUNYLEtBQUssRUFBRSwwQkFBMEI7U0FDbkM7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxzQkFBc0I7U0FDOUI7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxNQUFNO1NBQ2Q7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxFQUFFO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsU0FBUztZQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxFQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLENBQUM7UUFDRCxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsT0FBUSxDQUFDO2dCQUNaLFdBQVcsRUFBRSxLQUFLO2FBQ25CLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxhQUFhO1lBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzVDLENBQUM7S0FDRjtDQUNGLENBQUE7QUFFRCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSU15Q29tcG9uZW50cyB7XHJcbiAgLyoqXHJcbiAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcclxuICAqL1xyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGJhY2tDb2xvcjoge1xyXG4gICAgICB0eXBlOiBTdHJpbmdDb25zdHJ1Y3RvcixcclxuICAgICAgdmFsdWU6IHN0cmluZ1xyXG4gICAgfSxcclxuICAgIHBsYWNlaG9sZGVyOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZ0NvbnN0cnVjdG9yLFxyXG4gICAgICB2YWx1ZTogc3RyaW5nXHJcbiAgICB9LFxyXG4gICAgbGVmdEltZzoge1xyXG4gICAgICB0eXBlOiBTdHJpbmdDb25zdHJ1Y3RvcixcclxuICAgICAgdmFsdWU6IHN0cmluZ1xyXG4gICAgfSxcclxuICAgIHJpZ2h0SW1nOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZ0NvbnN0cnVjdG9yLFxyXG4gICAgICB2YWx1ZTogc3RyaW5nXHJcbiAgICB9LFxyXG4gICAgdHlwZVNlYXJjaDoge1xyXG4gICAgICB0eXBlOiBTdHJpbmdDb25zdHJ1Y3RvcixcclxuICAgICAgdmFsdWU6ICd2aWV3JyB8ICdpbnB1dCcgICAvLyB2aWV3IOS4jeWPr+i+k+WFpSAgaW5wdXQg5Y+v6L6T5YWl5Y+W5YC8IFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAqIOe7hOS7tueahOWIneWni+aVsOaNrlxyXG4gKi9cclxuICBkYXRhOiB7XHJcbiAgICBzZWFyY2hWYWx1ZTogc3RyaW5nXHJcbiAgfSxcclxuICAvKipcclxuICAqIOe7hOS7tueahOaWueazleWIl+ihqFxyXG4gICovXHJcbiAgbWV0aG9kczoge1xyXG4gICAgY2xpY2tWaWV3ICh0aGlzOiBXeENvbXBvbmVudCwgZXZlbnQ/OmFueSkgOiB2b2lkLFxyXG4gICAgc2V0SW5wdXRWYWx1ZSh0aGlzOiBXeENvbXBvbmVudCxldmVudD86IGFueSkgOiB2b2lkLFxyXG4gICAgY2xpY2tSaWdodEltZyh0aGlzOiBXeENvbXBvbmVudCwgZXZlbnQ/OiBhbnkpOiB2b2lkXHJcbiAgfVxyXG59XHJcbmNvbnN0IG9wdGlvbnM6IElNeUNvbXBvbmVudHMgPSB7XHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgYmFja0NvbG9yOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNGRjgzNTEgLCAjRkY0NzI0KTsnXHJcbiAgICB9LFxyXG4gICAgcGxhY2Vob2xkZXI6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWx1ZTogJ+i+k+WFpeS9oOimgeaQnOe0oueahOWVhuWTgS/lupfpk7onXHJcbiAgICB9LFxyXG4gICAgIGxlZnRJbWc6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgdmFsdWU6ICcuLi8uLi9pbWFnZS9pbWVzc2FnZS5wbmcnXHJcbiAgICB9LFxyXG4gICAgcmlnaHRJbWc6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWx1ZTogJy4uLy4uL2ltYWdlL2tlZnUucG5nJ1xyXG4gICAgfSxcclxuICAgIHR5cGVTZWFyY2g6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWx1ZTogJ3ZpZXcnICAgIC8vIHZpZXcg5LiN5Y+v6L6T5YWlICBpbnB1dCDlj6/ovpPlhaXlj5blgLwgXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICBzZWFyY2hWYWx1ZTogJydcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGNsaWNrVmlldygpIHtcclxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2NsaWNrU2VhcmNoVmlldycsIHt9ICwge30pXHJcbiAgICB9LFxyXG4gICAgc2V0SW5wdXRWYWx1ZSh7IGRldGFpbDogeyB2YWx1ZSB9IH0pIHtcclxuICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgc2VhcmNoVmFsdWU6IHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2xpY2tSaWdodEltZygpIHtcclxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2NsaWNrUmlnaHRJbWcnLCB7fSwge30pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5Db21wb25lbnQob3B0aW9ucykiXX0=