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
    /*
     *   inputarray，$对象，所要进行判断的元素
     *   errcall,错误回调 方法
     *   ifround，是否全部错误都显示出来还是出现第一个错误的时候打断
     *   newren, 自定义规则 ，可传正则或函数
    */
    return function(inputarray, errcall, ifround , newren){
        var c = {
            ren: {
                cellphone: '^(((1[1-9][0-9]{1})|(17[0-9]{1}))+\\d{8})$',    //手机
                num: '^\\d*$',
                decimal: '^\\d*(?:\\.\\d{1,2})?$',//小数
                phone: '^(((1[1-9][0-9]{1})+\\d{8})|((0\\d{2,3}-?)?[1-9]\\d{6,7})$', //手机或者固话
                chinese: '^[\\u4E00-\\u9FA5\\uF900-\\uFA2D][\\u4E00-\\u9FA5\\uF900-\\uFA2D1-9a-zA-Z]+$',
                otempty: function(value) {
                    return value.length > 0;
                }                       //非空
            },
            showErr: errcall,
            cheakinput: function(input){
                var that = this,
                    vails = input.attr('vail'),
                    errs = input.attr('errormsg');

                if (!vails) return true;

                //节点上不含otempty则可以为空
                var ifcareempty = /otempty/gi.test(vails);
                if( !ifcareempty && input.val() <= 0){
                    return true;
                }
                var regs = vails.split('|'),
                     err = errs.split('|'),
                     t = true;

                for (var j = 0, len = regs.length; j < len; j++) {
                    var icom = regs[j],
                        ative = (typeof that.ren[icom] == 'function') ? that.ren[icom](input.val(), input) : new RegExp(that.ren[icom]).test(input.val());

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

        $.extend(c.ren, newren)

        return function(){
            var isSucceed = true;

            inputarray.each(function() {
                var t = c.cheakinput($(this));

                if (!t) {
                    isSucceed = t;
                    if (!ifround) return t;
                }
            });
            return isSucceed;
        }
    }
})
            

/*
* 表单验证 依赖jQuery @tianqi

目前含有常用正则：
cellphone判断手机号
num 纯数字
decimal小数
chinese中文
otempty 为空返回false


使用方法
*html
* <input type="tel" vail="otempty|cellphone" errormsg="联系手机不能为空|联系手机不正确哦"  placeholder="请输入手机号码" />
* 
*调用
* 为true 则是验证通过 = validate(需要认证的节点，错误回调，是否全部验证完再返回错误（false为出现一个错误后马上中断返回错误），新添加的正则或者函数)
*
* 如：
$('form').submit(function(){
    var iftrue  = validate($('form input'), function(that, err){console.log(err, that)}, false, {num: "^\\d*$", ifNum: function(val){return /\d/.test(val)}})();
    return false
})
**/