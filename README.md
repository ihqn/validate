# validate
基于jQuery表单验证，非常通用的表单验证，在需要的表单原素上添加上相应的正则和错误提示的内容，就可以愉快的使用了，
如果设置了disabled，则不对其进行验证
如果设置了readonly，会进行验证，一般用于该节点不需要被输入（如在其它层选择后填充内容），但需要验证时使用


### 如何使用
使用方法
html
<input type="tel" vail="otempty|cellphone" errormsg="联系手机不能为空|联系手机不正确哦"  placeholder="请输入手机号码" />


调用
* 为true 则是验证通过 = validate(需要认证的节点，错误回调，是否全部验证完再返回错误（false为出现一个错误后马上中断返回错误），新添加的正则或者函数)
*
* 如：
$('form').submit(function(){
    var iftrue  = validate($('form input'), function(that, err){console.log(err, that)}, false, {num: "^\\d*$", ifNum: function(val){return /\d/.test(val)}})();
    return false
})




### 原有的正则
cellphone判断手机号
num 纯数字
decimal小数
chinese中文
otempty [type: function] 为空返回false
otemptySelect [type: function] 用于select原素，为空返回false


