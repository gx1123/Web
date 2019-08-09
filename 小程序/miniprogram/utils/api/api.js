"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myRequest_1 = require("../myRequest/myRequest");
const api = (domain) => {
    let { cloudhost, omsurl, baseinfo } = domain;
    return {
        apiGetWxPayInfo(code) {
            return myRequest_1.default(`${cloudhost}v2/baseinfo/wechat/small/openid/${code}`, 'GET');
        },
        apiGetShoppingNum() {
            return myRequest_1.default(`${omsurl}app/cart`, 'GET');
        },
        apiIsForbidden(params) {
            return myRequest_1.default(`${baseinfo}open/customer/status`, 'POST', params);
        }
    };
};
exports.default = api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0RBQThDO0FBRTlDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBVyxFQUFRLEVBQUU7SUFDaEMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFBO0lBQzVDLE9BQU87UUFDTCxlQUFlLENBQUMsSUFBSTtZQUNsQixPQUFPLG1CQUFTLENBQUMsR0FBRyxTQUFTLG1DQUFtQyxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNoRixDQUFDO1FBQ0QsaUJBQWlCO1lBQ2YsT0FBTyxtQkFBUyxDQUFDLEdBQUcsTUFBTSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDOUMsQ0FBQztRQUNELGNBQWMsQ0FBQyxNQUFNO1lBQ25CLE9BQU8sbUJBQVMsQ0FBQyxHQUFHLFFBQVEsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3JFLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBQ0Qsa0JBQWUsR0FBRyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW52IH0gZnJvbSAnLi4vZW52L2VudidcclxuaW1wb3J0IG15UmVxdWVzdCBmcm9tICcuLi9teVJlcXVlc3QvbXlSZXF1ZXN0J1xyXG5pbXBvcnQgVkFwaSBmcm9tICcuL2FwaVZlcmlmaWVyJ1xyXG5jb25zdCBhcGkgPSAoZG9tYWluOiBFbnYpOiBWQXBpID0+IHtcclxuICBsZXQgeyBjbG91ZGhvc3QsIG9tc3VybCwgYmFzZWluZm8gfSA9IGRvbWFpblxyXG4gIHJldHVybiB7XHJcbiAgICBhcGlHZXRXeFBheUluZm8oY29kZSkge1xyXG4gICAgICByZXR1cm4gbXlSZXF1ZXN0KGAke2Nsb3VkaG9zdH12Mi9iYXNlaW5mby93ZWNoYXQvc21hbGwvb3BlbmlkLyR7Y29kZX1gLCAnR0VUJylcclxuICAgIH0sXHJcbiAgICBhcGlHZXRTaG9wcGluZ051bSgpIHtcclxuICAgICAgcmV0dXJuIG15UmVxdWVzdChgJHtvbXN1cmx9YXBwL2NhcnRgLCAnR0VUJylcclxuICAgIH0sXHJcbiAgICBhcGlJc0ZvcmJpZGRlbihwYXJhbXMpIHtcclxuICAgICAgcmV0dXJuIG15UmVxdWVzdChgJHtiYXNlaW5mb31vcGVuL2N1c3RvbWVyL3N0YXR1c2AsICdQT1NUJywgcGFyYW1zKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBhcGkiXX0=