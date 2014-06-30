/**
 * @description 表单工具集
 * @namespace FormUtils
 * @author wyj on 14/5/5
 */
var FormUtils = {
    /**
     * jQuery获取表单对象
     * @method getFormData
     * @module util
     * @param { jqueryElement } $from jquery form 表单
     * @require jquery
     * @example
     * $.ajax({
     *   type: 'post',
     *   data: JSON.stringify(util.getFormData($(form)))
     */
    getFormData : function($form){
        var indexed_array = {},
            unindexed_array = $form.serializeArray();
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    },
    /**
     * jQuery表单提交验证
     * @method doValidate
     * @module util
     * @param { jqueryElement } $from jquery form 表单
     * @param {object} 选项   {errorElement : 'div',errorPlacement : function(error, element){}, success : function(label){}, url : '', type: 'post/get'}
     * @require validate.min.js, form.min.js
     * @example
     * util.doValidate($(form), {});
     */
    doValidate : function($form, opts){
        $form.validate( {
            errorElement : "div",
            errorPlacement : function(error, element) {
                error.appendTo(element.parents("li:first").next("li"));
            },
            success : function(label) {
                label.remove();
            },
            submitHandler : function(form) {
                $.ajax({
                    url:'{{$.baseUrl}}tellme',
                    type: 'post',
                    data: JSON.stringify(getFormData($(form))),
                    success:function(result){
                        alert('{{$.lan.leave.success}}');
                    },
                    error : function(result){
                        alert('验证码错误');
                    }
                });
            }
        });
    }
}