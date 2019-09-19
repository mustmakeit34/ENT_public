// About
var main_left_1_1, main_left_1_2, main_left_1_3, main_left_2_1, main_left_2_2, main_left_2_3, main_left_3_1,
main_left_3_2, main_left_3_3, main_right_1_1, main_right_1_2, main_right_1_3, main_right_2_1,
main_right_2_2, main_right_2_3, main_right_3_1, main_right_3_2, main_right_3_3;
var teh_cart = document.getElementById("cart_items");
var $cart_img = $('#cart_img');

(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

var is_mobile = jQuery.browser.mobile;
if (is_mobile){window.location = "http://www.entmods.com/Mobile/mobile.html"}

left_panel = document.getElementById('left_panel');
right_panel = document.getElementById('right_panel');
$('.main_img').on('mouseover', (is_mobile) ? null : function () {
    $left_01 = $('#left_01');
    $left_01.attr('src', `../Images/bio/main_${this.id}_left_01.jpg`);
    $left_02 = $('#left_02');
    $left_02.attr('src', `../Images/bio/main_${this.id}_left_02.jpg`);
    $left_03 = $('#left_03');
    $left_03.attr('src', `../Images/bio/main_${this.id}_left_03.jpg`);
    $right_01 = $('#right_01');
    $right_01.attr('src', `../Images/bio/main_${this.id}_right_01.jpg`);
    $right_02 = $('#right_02');
    $right_02.attr('src', `../Images/bio/main_${this.id}_right_02.jpg`);
    $right_03 = $('#right_03');
    $right_03.attr('src', `../Images/bio/main_${this.id}_right_03.jpg`);

    left_panel.style.visibility = 'visible';
    right_panel.style.visibility = 'visible'
});
color_dict = {
    "#0500ab" : 'color_1',
    "#2bc5ff" : 'color_2',
    "#c80000" : 'color_3',
    "#ff9321" : 'color_4',
    "#5b0089" : 'color_5',
    "#ff00ff" : 'color_6',
    "#0d9000" : 'color_7',
    "#8bff00" : 'color_8',
    "#ffcd00" : 'color_9',
    "#fff827" : 'color_10',
    "#543a27" : 'color_11',
    "#ffffff" : 'color_12'
};
$cart_img.on('click', function(ev){
    if ($('#cart_items :first-child').data('mod_object')){
        var shipping_type = $('#shipping').serializeArray()[0]["value"];
        $.ajax({type: "GET",
            url: (shipping_type=="dhl") ? '../fast.lets_go':'../normal.lets_go',
            success: function(data){
                $('#modal').append(data);
                $('#paypal_form').submit()

        }})
 }});
function create_cart_el(json_data){
    var mod = json_data;
    if (! mod){
        $('#cart_items').empty()
    }else{
        var cart_item = document.createElement('div');
        $(cart_item).data('mod_object', mod);
        var color_grouping = document.createElement('div');
        cart_item.className = 'cart_item';
        cart_item.appendChild(color_grouping);
        color_grouping.className = 'color_grouping';
        $('#cart_items').append(cart_item);
        var item_p = document.createElement('p');
        var item_text = document.createTextNode(mod.size + " | " + mod.material + " | " +
                        mod.style + " | $" +  String(mod.price));
        cart_item.appendChild(item_p);
        item_p.appendChild(item_text);
        item_p.setAttribute('class','cart_text');
        for (var i=0;i < mod.colors.length; i++){
            color_div = document.createElement('div');
            color_div.className = 'dot';
            color_div.setAttribute('id', `${color_dict[mod.colors[i]]}_2`);
            color_grouping.appendChild(color_div)
        }
    $(".cart_item").on('click', function(){
        var $cart_item = $(this);
        var json_item = JSON.stringify($cart_item.data('mod_object'));
            $.ajax({
                data : json_item,
                type : "POST",
                url : "../remove.json",
                mimeType : "application/json",
                complete : function(data) {
                          return_json = (data.responseJSON);
                          create_cart_el(null);
                          for(var i=0;i< return_json.length;i++){
                            create_cart_el(JSON.parse(return_json[i]))
                          }}
            });
        $cart_item.remove()
    });
    }
}
$(function(){
    $.ajax({
        type : "POST",
        url : "../give_me.json",
        mimeType : "application/json",
        complete : function(data) {
                  return_json = (data.responseJSON)
                  create_cart_el(null)
                  for(var i=0;i< return_json.length;i++){
                    create_cart_el(JSON.parse(return_json[i]))
                  }}
    })
});

function evaluate_cart(){
    if ($('#cart_items :first-child').data('mod_object')){
        $cart_img.css('cursor', 'pointer');
        animate_cart = true;
        allow_buy = true;
        animate_teh_cart();
        $('#shipping').css('visibility', 'visible')
    }else{
        $cart_img.css('cursor', 'default');
        animate_cart = false;
        allow_buy = false;
        $('#shipping').css('visibility', 'hidden')
    }}
function animate_teh_cart(){
    $cart_img.animate({opacity:0.0}, 600, 'swing');
    $cart_img.animate({opacity:1.0}, 600, 'swing', animate_cart ? animate_teh_cart : null);
}
teh_cart.addEventListener('DOMSubtreeModified', evaluate_cart, true);
$(function(){
    $.get('../Images/bio/main_01_left_01.jpg', function(){main_left_1_1 = this});
    $.get('../Images/bio/main_01_left_02.jpg', function(){main_left_1_2 = this});
    $.get('../Images/bio/main_01_left_03.jpg', function(){main_left_1_3 = this});
    $.get('../Images/bio/main_02_left_01.jpg', function(){main_left_2_1 = this});
    $.get('../Images/bio/main_02_left_02.jpg', function(){main_left_2_2 = this});
    $.get('../Images/bio/main_02_left_03.jpg', function(){main_left_2_3 = this});
    $.get('../Images/bio/main_03_left_01.jpg', function(){main_left_3_1 = this});
    $.get('../Images/bio/main_03_left_02.jpg', function(){main_left_3_2 = this});
    $.get('../Images/bio/main_03_left_03.jpg', function(){main_left_3_3 = this});
    $.get('../Images/bio/main_01_right_01.jpg', function(){main_right_1_1 = this});
    $.get('../Images/bio/main_01_right_02.jpg', function(){main_right_1_2 = this});
    $.get('../Images/bio/main_01_right_03.jpg', function(){main_right_1_3 = this});
    $.get('../Images/bio/main_02_right_01.jpg', function(){main_right_2_1 = this});
    $.get('../Images/bio/main_02_right_02.jpg', function(){main_right_2_2 = this});
    $.get('../Images/bio/main_02_right_03.jpg', function(){main_right_2_3 = this});
    $.get('../Images/bio/main_03_right_01.jpg', function(){main_right_3_1 = this});
    $.get('../Images/bio/main_03_right_02.jpg', function(){main_right_3_2 = this});
    $.get('../Images/bio/main_03_right_03.jpg', function(){main_right_3_3 = this});
});