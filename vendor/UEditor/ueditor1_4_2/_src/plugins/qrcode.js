/**
 * Created by yongjin on 14-3-14.
 */
UE.commands['qrcode'] = {
    execCommand: function() {
        this.fireEvent("openCodeDialog");
        console.log("UE.commands openCodeDialog");
    }
};