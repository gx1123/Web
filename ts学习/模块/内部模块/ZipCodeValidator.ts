
const numberRegexp =  /^[0-9]+$/;

class ZipCodeValidator{
    isAcceptable(s : string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

// 导出重命名
// export { ZipCodeValidator as mainValidator };
// typeScript 导入方式
export = ZipCodeValidator