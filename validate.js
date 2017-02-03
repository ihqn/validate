(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define(factory);
    else if(typeof exports === 'object')
        exports["validate"] = factory();
    else
        root["validate"] = factory();
})(this, function() {
    return function(inputarray, errcall, ifround , newren){
        var c = {
            ren : {
                cellphone:"^(((13[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))+\\d{8})$",    //手机
                num : "^\\d*$",
                number : "^\\d*(?:\\.\\d{1,2})?$",
                phone:"^(((13[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))+\\d{8})|((0\\d{2,3}-?)?[1-9]\\d{6,7})$", //手机或者固话
                name:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]([\\s.]?[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]+){1,4}$",
                otempty:function(value){//非空
                    return value.length > 0;
                },
                email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, //邮件
                url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",   //url
                passwrd:"^[^1-9][\\w-@#$%^&*]{6,20}$"         //密码保证6-20位的英文字母/数字/下划线/减号和@#$%^&*这些符号
            },
            showErr : errcall,
            cheakinput : function(input){
                var that = this;
                var vails = input.attr('vail'),
                     errs = input.attr('errormsg');

                //可以为空
                var ifcareempty = /otempty/gi.test(vails);
                if( !ifcareempty && input.val() <= 0){
                    return true;
                }
                var regs = vails.split('|'),
                     err = errs.split('|');

                var t = true;
                for(var j=0, len=regs.length; j<len;j++){
                    var icom = regs[j];
                    var ative = (typeof that.ren[icom] == 'function') ? that.ren[icom](input.val(), input) : new RegExp(that.ren[icom]).test(input.val());
                    if(!ative){
                        that.showErr(err[j], input);
                        t = ative;
                        if(!ifround){
                            return ative;
                        }
                        break;
                    }
                }
                return t;
            }
        }
        return function(){
            var tt = true;

            jQuery.extend(c.ren, newren)
            inputarray.each(function() {
                var t =  c.cheakinput($(this));
                if(!ifround && !t){
                    tt = t;
                    return t;
                }
                if(!t){
                    tt = t;
                }
            });
            return tt;
        }
    }
})
/*接收参数
    *inputarray，$对象，所要进行判断的元素
    *errcall,错误回调 方法
    *ifround,是否全部错误都显示出来还是出现第一个错误的时候打断
    *newren,需要新添加的正则
/*使用方法
    *html
    * <input type="tel" vail="otempty|cellphone" errormsg="联系手机不能为空|联系手机不正确哦"  placeholder="请输入手机号码" />
    *调用
    *var iftrue  = validate($('.js-validate input'), global.errcallbak, false)();
    *返回true为表单验证通过
**/