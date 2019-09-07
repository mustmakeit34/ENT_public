// Maple
var size, colors, color_dict, comments, animate_add_1, price, flag, material, style,
animate_add_2, animate_cart, allow_buy, main_1, main_2, main_4, main_5, main_6;
comments = "";
colors = [];
animate_add_1 = false;
animate_add_2 = false;
flag = null;
allow_buy = false;
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

(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

var is_mobile = jQuery.browser.mobile;
if (is_mobile){
    var $whole = $('#whole_thing');
    $whole.css('transform', 'unset');
    $whole.css('left', 'unset');
    $whole.css('width', '950px');
    $whole.css('height', '1200px');
    $whole.css('overflow', 'hidden');
    $('#watermark').css('left', '-76px');
}

var teh_cart = document.getElementById("cart_items");
var $cart_img = $('#cart_img');
$cart_img.on('click', function(){
    console.log("working");
    if ($('#cart_items :first-child').data('mod_object')){
        console.log("this too");
        var shipping_type = $('#shipping').serializeArray()[0]["value"];
        console.log(shipping_type);
        $.ajax({type: "GET",
            url: (shipping_type=="dhl") ? '../fast.lets_go':'../normal.lets_go',
            success: function(data){
                console.log(data);
                $('#modal').append(data);
                $('#paypal_form').submit()

        }})
}});
function evaluate_cart(){
      console.log($('#cart_items :first-child').data('mod_object'));
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
$('#comments').on('click', function(e) {
     $('#colors').css('visibility', 'visible');
     $('#comments').css('visibility', 'visible');
     e.stopPropagation();
});
$('form').on('submit',function(e) {
    e.preventDefault();
});
$('.thumb').on('mouseover click', function () {
    $main_img = $('#main_prev');
    $main_img.attr('src', `../Images/main_prev/maple_${this.id}.jpg`);
    console.log($main_img)
});
$('td').on('mouseover', function () {
    $(this).css('text-shadow', '0px 4px 10px #FFE878')
});
$('td').on('mouseout', function () {
    $(this).css('text-shadow', '')
});
$('.click_add').on('click', function() {
    $('#colors').css('visibility', 'visible');
    $('#comments').css('visibility', 'visible');
    event.stopPropagation();
    if (flag == this && $('#cart_items').children().length < 4 && colors.length > 0){
        animate_add_1 = false;
        animate_add_2 = false;
        comments = $('#comments').val();
        new_mod = new ENT_Mod();
        console.log(new_mod);
        flag = null;
        ship_it(new_mod);
        document.getElementsByTagName('form')[1].reset();
        $('#comments').css('visibility', 'hidden');
        $('#colors').css('visibility', 'hidden');
    }else if (animate_add_1){
        flag = this;
        animate_add_1 = false;
        animate_add_2 = true;
        animate_cart_2($(this));
    }else if (animate_add_2 || !(animate_add_1 || animate_add_2)){
        flag = this;
        animate_add_1 = true;
        animate_add_2 = false;
        animate_cart_1($(this));
    }
    if ($('#cart_items').children().length === 4){$('#full').css('visibility','visible')}
});

function ENT_Mod(){
    this.size = size;
    this.material = material;
    this.style = style;
    this.price = price;
    this.colors = colors;
    this.comments = comments
}

function animate_cart_1(el){
    el.animate({opacity:0.0}, 600, 'swing');
    el.animate({opacity:1.0}, 600, 'swing', animate_add_1 ? function(){animate_cart_1(el)} : null);
}

function animate_cart_2(el){
     el.animate({opacity:0.0}, 600, 'swing');
     el.animate({opacity:1.0}, 600, 'swing', animate_add_2 ? function(){animate_cart_2(el)} : null);
}
$('#colors').on('click', function() {
    $('#colors').css('visibility', 'visible');
    event.stopPropagation();
});
$(document).on('click', function() {
    $('#colors').css('visibility', 'hidden');
    $('#comments').css('visibility', 'hidden');
    animate_add_1 = false;
    animate_add_2 = false;
    colors = [];
    size = null;
    flag = null;
    material = null;
    style = null;
    price = null;
    clear_dots()
});
$('#18650_V_25').on('click', function() {
    size = "18650";
    material = "maple";
    style = "V_25";
    price = 230;
    clear_dots()
});
$('#21700_V_25').on('click', function() {
    size = "21700";
    material = "maple";
    style = "V_25";
    price = 250;
    clear_dots()
});
$('#18650_V_3').on('click', function() {
    size = "18650";
    material = "maple";
    style = "V_3";
    price = 250;
    clear_dots()
});
$('#21700_V_3').on('click', function() {
    size = "21700";
    material = "maple";
    style = "V_3";
    price = 270;
    clear_dots()
});
$('#color_1').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#0500ab") && colors.length < 3){colors.push("#0500ab")
    }else if (colors.includes("#0500ab")){colors.splice(colors.indexOf("#0500ab"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_2').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#2bc5ff") && colors.length < 3){colors.push("#2bc5ff")
    }else if (colors.includes("#2bc5ff")){colors.splice(colors.indexOf("#2bc5ff"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_3').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#c80000") && colors.length < 3){colors.push("#c80000")
    }else if (colors.includes("#c80000")){colors.splice(colors.indexOf("#c80000"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_4').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ff9321") && colors.length < 3){colors.push("#ff9321")
    }else if (colors.includes("#ff9321")){colors.splice(colors.indexOf("#ff9321"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_5').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#5b0089") && colors.length < 3){colors.push("#5b0089")
    }else if (colors.includes("#5b0089")){colors.splice(colors.indexOf("#5b0089"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_6').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ff00ff") && colors.length < 3){colors.push("#ff00ff")
    }else if (colors.includes("#ff00ff")){colors.splice(colors.indexOf("#ff00ff"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_7').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#0d9000") && colors.length < 3){colors.push("#0d9000")
    }else if (colors.includes("#0d9000")){colors.splice(colors.indexOf("#0d9000"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_8').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#8bff00") && colors.length < 3){colors.push("#8bff00")
    }else if (colors.includes("#8bff00")){colors.splice(colors.indexOf("#8bff00"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_9').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ffcd00") && colors.length < 3){colors.push("#ffcd00")
    }else if (colors.includes("#ffcd00")){colors.splice(colors.indexOf("#ffcd00"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_10').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#fff827") && colors.length < 3){colors.push("#fff827")
    }else if (colors.includes("#fff827")){colors.splice(colors.indexOf("#fff827"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_11').on('click', function() {
    if (!colors.includes("#543a27")){
        clear_dots();
        colors.push("#543a27")
    }else if (colors.includes("#543a27")){colors.splice(colors.indexOf("#543a27"),1)}
    apply_dots(`${style}_${size}`);
});
$('#color_12').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ffffff") && colors.length < 3){colors.push("#ffffff")
    }else if (colors.includes("#ffffff")){colors.splice(colors.indexOf("#ffffff"),1)}
    apply_dots(`${style}_${size}`);
});
function apply_dots(dot_id){
    $('.dot').css('background-color', '');
    for (var i=0; i < colors.length; i++){
    $(`#${dot_id}_${i+1}`).css('background-color', `${colors[i]}`);
}}
function clear_dots(){
    $('.dot').css('background-color', '');
    colors = []
}
function ship_it(mod){
    string_version = JSON.stringify(mod);
    $.ajax({
        data : string_version,
        type : "POST",
        url : "../mod.json",
        mimeType : "application/json",
        complete : function(data) {
                  return_json = (data.responseJSON);
                  create_cart_el(null);
                  for(var i=0;i< return_json.length;i++){
                    create_cart_el(JSON.parse(return_json[i]))
                  }}
    })
}

function create_cart_el(json_data){
    var mod = json_data;
    if (! mod){
        $('#cart_items').empty()
    }else{
        console.log(mod);
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
        $cart_item.remove();
        $('#full').css('visibility','hidden')
    });
    }
}
$(function(){
    $.ajax({
        type : "POST",
        url : "../give_me.json",
        mimeType : "application/json",
        complete : function(data) {
                  return_json = (data.responseJSON);
                  create_cart_el(null);
                  for(var i=0;i< return_json.length;i++){
                    create_cart_el(JSON.parse(return_json[i]))
                  }}
    })
});
$(function(){
    $.get('../Images/main_prev/maple_01.jpg', function(){main_1 = this});
    $.get('../Images/main_prev/maple_02.jpg', function(){main_2 = this});
    $.get('../Images/main_prev/maple_04.jpg', function(){main_4 = this});
    $.get('../Images/main_prev/maple_05.jpg', function(){main_5 = this});
    $.get('../Images/main_prev/maple_06.jpg', function(){main_6 = this});
});