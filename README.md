# validate
基于jQuery表单验证，非常通用的表单验证，在需要的表单原素上添加上相应的正则和错误提示的内容，就可以愉快的使用了


** 注意设置了readonly、disabled，都会对其进行验证，一般用于该节点不需要被输入（如在其它层选择后填充内容），但需要验证时使用。手机上使用readonly仍会呼出键盘，还是需要使用disabled ** 


### 如何使用
可以直接引入使用，也支持AMD模块

配置
validate(eles，errFun，isround，newRen)()

- eles jQuery对象，所要进行判断的元素
- errFun，验证失败的回调方法，在这里对失败的元素进行处理，该回调有两个参数:that为当前验证失败的元素，err为失败信息
- isround 是否全部验证完所有元素再返回错误，false为出现一个验证失败后马上中断返回失败信息，true则是一下子验证完所有元素返回全部元素的失败信息
- newRen 扩展需要的正则或者函数，注意为匹配值为false则会进入验证失败环节


正式使用
** html **
```
<input type="tel" vail="otempty|cellphone" errormsg="联系手机不能为空|联系手机不正确哦"  placeholder="请输入手机号码" />
```

**js验证**
```
errFun = function(that, err){console.log(err, that)};

$('form').submit(function(){
    var iftrue  = validate($('form input'), errFun, false)();
    return false
})
```


### 原有的正则
- cellphone: '^(((1[1-9][0-9]{1})|(17[0-9]{1}))+\\d{8})$',    //判断手机号
- num: '^\\d*$',         //纯数字
- decimal: '^\\d*(?:\\.\\d{1,2})?$',      //小数
- chinese: '^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$'   //纯中文
- otempty: function(value) { return value.length > 0; //非空},  为空返回false
- otemptySelect: function(val){return val > 0 //select必选}   用于select原素，为空返回false

