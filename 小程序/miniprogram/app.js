"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./utils/env/env");
const api_1 = require("./utils/api/api");
App({
    globalData: {
        domain: env_1.dev,
        location: {},
        sysMark: 'newddc',
        systemInfo: {}
    },
    $service: api_1.default(env_1.dev),
    onLaunch() {
        this.getUpdateManager();
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                this.globalData.location = res;
            }
        });
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.systemInfo = res;
            }
        });
        let token = wx.getStorageSync("token");
        if (!token) {
            this.getWxPayInfo();
        }
        else {
            this.getShoppingNum();
        }
    },
    isForbidden() {
        let token = wx.getStorageSync("token") || '';
        let params = {
            Authorization: token
        };
        this.$service.apiIsForbidden(params).then((res) => {
            if (res.data.status === 403) {
                wx.removeStorageSync("token");
                wx.showToast({
                    title: '该账号已被禁用',
                    icon: 'none'
                });
            }
        });
    },
    getWxPayInfo() {
        wx.login({
            success: res => {
                if (res.code) {
                    this.$service.apiGetWxPayInfo(res.code).then((tokenInfo) => {
                        wx.setStorageSync('wxPayInfo', tokenInfo.data.result);
                    });
                }
            }
        });
    },
    getShoppingNum() {
        this.$service.apiGetShoppingNum().then((res) => {
            if (res.data) {
                this.setShoppingNum(res.data.allBuyNum);
            }
        });
    },
    setShoppingNum(num) {
        if (num > 0 && num <= 99) {
            wx.setTabBarBadge({
                index: 2,
                text: `${num}`
            });
        }
        else if (num > 99) {
            wx.setTabBarBadge({
                index: 2,
                text: '99+'
            });
        }
        else {
            wx.removeTabBarBadge({
                index: 2
            });
        }
    },
    getUpdateManager() {
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    updateManager.applyUpdate();
                                }
                            }
                        });
                    });
                    updateManager.onUpdateFailed(function () {
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        });
                    });
                }
            });
        }
        else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQW9EO0FBQ3BELHlDQUFpQztBQStCakMsR0FBRyxDQUFTO0lBQ1YsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFOLFNBQU07UUFDTixRQUFRLEVBQUUsRUFBeUM7UUFDbkQsT0FBTyxFQUFFLFFBQVE7UUFDakIsVUFBVSxFQUFFLEVBQTJDO0tBQ3hEO0lBQ0QsUUFBUSxFQUFFLGFBQUcsQ0FBQyxTQUFNLENBQUM7SUFDckIsUUFBUTtRQUVOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBRXZCLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDYixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUE7WUFDaEMsQ0FBQztTQUNGLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDZixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7WUFDbEMsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtTQUNwQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1NBQ3RCO0lBQ0gsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLEtBQUssR0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNwRCxJQUFJLE1BQU0sR0FBRztZQUNYLGFBQWEsRUFBRSxLQUFLO1NBQ3JCLENBQUE7UUFDRCxJQUFJ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QUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTyxFQUFFLGlDQUFpQzthQUMzQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2FwcC50c1xuaW1wb3J0IHsgZGV2IGFzIGRvbWFpbiwgRW52IH0gZnJvbSAnLi91dGlscy9lbnYvZW52J1xuaW1wb3J0IGFwaSBmcm9tICcuL3V0aWxzL2FwaS9hcGknXG5pbXBvcnQgVkFwaSBmcm9tICcuL3V0aWxzL2FwaS9hcGlWZXJpZmllcidcbmV4cG9ydCBpbnRlcmZhY2UgSU15QXBwIHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIGxvY2F0aW9uOiB3eC5HZXRMb2NhdGlvblN1Y2Nlc3NDYWxsYmFja1Jlc3VsdCxcbiAgICByZWFkb25seSBzeXNNYXJrOiBzdHJpbmcsXG4gICAgcmVhZG9ubHkgZG9tYWluOiBFbnYsXG4gICAgc3lzdGVtSW5mbzogd3guR2V0U3lzdGVtSW5mb1N1Y2Nlc3NDYWxsYmFja1Jlc3VsdFxuICB9XG4gIHJlYWRvbmx5ICRzZXJ2aWNlOiBWQXBpXG4gICAvKipcbiAgICog5b6u5L+h5pu05paw5py65Yi2XG4gICAqL1xuICBnZXRVcGRhdGVNYW5hZ2VyKCk6IHZvaWRcbiAgLyoqXG4gICAqIOiOt+WPluaUr+S7mOaJgOmcgOWPguaVsO+8iOaIkeeMnOeahO+8iVxuICAgKi9cbiAgZ2V0V3hQYXlJbmZvKCk6IHZvaWRcbiAgLyoqXG4gICAqIOiuvue9rui0reeJqei9puaVsOmHjyBcbiAgICovXG4gIHNldFNob3BwaW5nTnVtKG51bTogbnVtYmVyKTogdm9pZFxuICAgLyoqXG4gICAqIOiOt+WPlui0reeJqei9puaVsOmHj1xuICAgKi9cbiAgZ2V0U2hvcHBpbmdOdW0oKTogdm9pZFxuICAvKipcbiAgICog55So5oi35piv5ZCm6KKr56aB55SoXG4gICAqL1xuICBpc0ZvcmJpZGRlbigpOiB2b2lkXG59XG5BcHA8SU15QXBwPih7XG4gIGdsb2JhbERhdGE6IHtcbiAgICBkb21haW4sICAgLy8gYWxs5Z+f5ZCNXG4gICAgbG9jYXRpb246IHt9IGFzIHd4LkdldExvY2F0aW9uU3VjY2Vzc0NhbGxiYWNrUmVzdWx0LCAgIC8vIOW9k+WJjeS9jee9ruS/oeaBr1xuICAgIHN5c01hcms6ICduZXdkZGMnLCAgIC8vIOacjeWKoeivt+axguadpea6kOihqOekuiBuZXdkZGMg5Luj6KGo5LyY6bKcXG4gICAgc3lzdGVtSW5mbzoge30gYXMgd3guR2V0U3lzdGVtSW5mb1N1Y2Nlc3NDYWxsYmFja1Jlc3VsdCAgLy8g6K6+5aSH5L+h5oGvXG4gIH0sXG4gICRzZXJ2aWNlOiBhcGkoZG9tYWluKSwgIC8vIOacjeWKoeaOpeWPo1xuICBvbkxhdW5jaCgpIHtcbiAgICAvLyDlvq7kv6Hmm7TmlrDmnLrliLZcbiAgICB0aGlzLmdldFVwZGF0ZU1hbmFnZXIoKVxuICAgIC8vIOiOt+WPluW9k+WJjee7j+e6rOW6piB3Z3M4NCDov5Tlm54gZ3BzIOWdkOagh++8jGdjajAyIOi/lOWbnuWPr+eUqOS6jiB3eC5vcGVuTG9jYXRpb24g55qE5Z2Q5qCHXG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgdHlwZTogJ3dnczg0JyxcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5sb2NhdGlvbiA9IHJlc1xuICAgICAgfVxuICAgIH0pXG4gICAgLy8g6I635Y+W6K6+5aSH5L+h5oGvXG4gICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5zeXN0ZW1JbmZvID0gcmVzXG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8g6I635Y+W55So5oi355u45YWz5L+h5oGvXG4gICAgbGV0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiKVxuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRoaXMuZ2V0V3hQYXlJbmZvKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRTaG9wcGluZ051bSgpXG4gICAgfVxuICB9LFxuICBpc0ZvcmJpZGRlbigpIHtcbiAgICBsZXQgdG9rZW46IHN0cmluZyA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidG9rZW5cIikgfHwgJydcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogdG9rZW5cbiAgICB9XG4gICAgdGhpcy4kc2VydmljZS5hcGlJc0ZvcmJpZGRlbihwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoXCJ0b2tlblwiKVxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6K+l6LSm5Y+35bey6KKr56aB55SoJyxcbiAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBnZXRXeFBheUluZm8oKSB7XG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICAgICAgdGhpcy4kc2VydmljZS5hcGlHZXRXeFBheUluZm8ocmVzLmNvZGUpLnRoZW4oKHRva2VuSW5mbzogYW55KSA9PiB7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnd3hQYXlJbmZvJywgdG9rZW5JbmZvLmRhdGEucmVzdWx0KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBnZXRTaG9wcGluZ051bSgpIHtcbiAgICB0aGlzLiRzZXJ2aWNlLmFwaUdldFNob3BwaW5nTnVtKCkudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICB0aGlzLnNldFNob3BwaW5nTnVtKHJlcy5kYXRhLmFsbEJ1eU51bSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBzZXRTaG9wcGluZ051bShudW0pIHtcbiAgICBpZiAobnVtID4gMCAmJiBudW0gPD0gOTkpIHtcbiAgICAgIHd4LnNldFRhYkJhckJhZGdlKHtcbiAgICAgICAgaW5kZXg6IDIsXG4gICAgICAgIHRleHQ6IGAke251bX1gXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAobnVtID4gOTkpIHtcbiAgICAgIHd4LnNldFRhYkJhckJhZGdlKHtcbiAgICAgICAgaW5kZXg6IDIsXG4gICAgICAgIHRleHQ6ICc5OSsnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5yZW1vdmVUYWJCYXJCYWRnZSh7XG4gICAgICAgIGluZGV4OiAyXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2V0VXBkYXRlTWFuYWdlcigpIHtcbiAgICBpZiAod3guY2FuSVVzZSgnZ2V0VXBkYXRlTWFuYWdlcicpKSB7XG4gICAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG4gICAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmhhc1VwZGF0ZSkge1xuICAgICAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVSZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+abtOaWsOaPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmlrDniYjmnKzlt7Lnu4/lh4blpIflpb3vvIzmmK/lkKbph43lkK/lupTnlKjvvJ8nLFxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlRmFpbGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOaWsOeahOeJiOacrOS4i+i9veWksei0pVxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/mnInmlrDniYjmnKzkuoblk59+JyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+aWsOeJiOacrOW3sue7j+S4iue6v+WVpn7vvIzor7fmgqjliKDpmaTlvZPliY3lsI/nqIvluo/vvIzph43mlrDmkJzntKLmiZPlvIDlk59+JyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5aaC5p6c5biM5pyb55So5oi35Zyo5pyA5paw54mI5pys55qE5a6i5oi356uv5LiK5L2T6aqM5oKo55qE5bCP56iL5bqP77yM5Y+v5Lul6L+Z5qC35a2Q5o+Q56S6XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjor6Xlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkiXX0=