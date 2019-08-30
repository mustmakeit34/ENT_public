// order_status
let $notif = $('#notification');
$(function(){
    let counter = 0;
    async function use_ajax(){
        await sleep(5000);
        counter ++;
        $.ajax({
            url:'../give.status',
            type:'get',
            success: function(data){
                console.log("success");
                $notif.text(data);i = 5},
            error: ((counter<5) ? use_ajax : function(){
                console.log("timeout");
                $notif.text("We have not received notification from " +
                    "paypal, or the server has encountered a problem. Please check your email for a notification from paypal"
                )
            })
        })}
    use_ajax()
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
