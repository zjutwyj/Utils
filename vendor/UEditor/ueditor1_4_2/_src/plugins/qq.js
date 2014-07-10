/**
 * Created by yongjin on 14-3-14.
 */
UE.commands['qq'] = {
    execCommand: function() {
        this.fireEvent("openQQDialog");
        console.log("UE.commands openQQDialog");
    }
};