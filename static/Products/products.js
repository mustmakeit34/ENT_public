// Products
var maple_descript, maple_size, ash_descript, ash_size, hybrid_descript, hybrid_size, zjel_descript, zjel_size,
maple_V25, ash_V25, hybrid_V25, zjel_V25, maple_V3, ash_V3, hybrid_V3, zjel_V3, zjel_style,
animate_cart, allow_buy;
allow_buy = false;

(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
console.log(jQuery.browser.mobile);
var is_mobile = jQuery.browser.mobile;
maple_descript = "Maple is the classic stabilized standard, for stab-wood mods. Swirling beautiful vibrance.";
ash_descript = "Black Ash is a more rare material in the industry. Its dark and sinister weave, \
                set it apart from the standard fare.";
hybrid_descript = "Peek through to the treasure within. A marvel of beauty and creativity; \
                   You won't find the Brass Hybrid at your local Vape shop.";
zjel_descript = "Though made of brass, its name means, 'chunk of iron'. With the shine of ornate jewelry, and the grip of a motorcycle handlebar--\
                 does a vape get more satisfying?";
V_25_descript = "The V2.5 is symmetrical and straight, exuding a feeling of streamlined strength.";
V_3_descript = "With a Bulging button at the base, and a tapering top, the V3 features a comfortable feel, with a flash of elegance.";
maple_size = "Will you give your mad Maple max power, with the 21700, or will you minimize its mass with the 18650?";
ash_size = "The Black Ash is worthy of open display(21700), but if you want to keep it in a pocket, \
            you might prefer the 18650 instead.";
hybrid_size = "Bling it up with the full 21700, or accessorize with the 18650.";
zjel_size = "Monster grip of the 21700, or the more managable 18650?";
zjel_style = "The Zjelezyaka, has a unique twist on the flat V2.5 style.";
function leftp_load(element, h4, h4_2, p, p2) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    var vape_h4 = document.createElement('h4');
    var vape_h4_2 = document.createElement('h4');
    var vape_h4_3 = document.createElement('h4');
    var vape_p = document.createElement('p');
    var vape_p2 = document.createElement('p');
    var vape_p3 = document.createElement('p');
    var h4_text = document.createTextNode(h4);
    var h4_2_text = document.createTextNode(h4_2);
    var p_text = document.createTextNode(p);
    var p2_text = document.createTextNode(p2);
    var style_h4 = document.createTextNode("Style");
    var v3_text = document.createTextNode(V_3_descript);
    var v25_text = document.createTextNode(V_25_descript);
    var zjel_style_text = document.createTextNode(zjel_style);
    vape_h4.appendChild(h4_text);
    vape_h4_2.appendChild(h4_2_text);
    vape_h4_3.appendChild(style_h4);
    vape_p.appendChild(p_text);
    vape_p2.appendChild(p2_text);
    if (h4 != "Zjelezyaka") {
        vape_p3.appendChild(v3_text);
        vape_p3.appendChild(v25_text);
    } else {
        vape_p3.appendChild(zjel_style_text);
    }
    element.appendChild(vape_h4);
    element.appendChild(vape_p);
    element.appendChild(vape_h4_2);
    element.appendChild(vape_p2);
    element.appendChild(vape_h4_3);
    element.appendChild(vape_p3);
}
function rightp_load(element, product) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    rightp_img1 = document.createElement('img');
    rightp_img2 = document.createElement('img');
    rightp_img3 = document.createElement('img');
    rightp_img1.src = `../Images/preview/${product}_01.jpg`;
    rightp_img2.src = `../Images/preview/${product}_02.jpg`;
    rightp_img3.src = `../Images/preview/${product}_03.jpg`;
    element.appendChild(rightp_img1);
    element.appendChild(rightp_img2);
    element.appendChild(rightp_img3);
    $('#right_panel').children().each(function () {
        $(this).addClass('rightp_img');
    });
}
var left_panel = document.getElementById('left_panel');
var right_panel = document.getElementById('right_panel');
var maple = document.getElementById('maple');
var ash = document.getElementById('ash');
var hybrid = document.getElementById('hybrid');
var zjel = document.getElementById('zjel');
var V_3 = document.getElementById('V_3');
var V_25 = document.getElementById('V_25');
function preview_vape() {
    if (this == maple) {
        leftp_load(left_panel, "Maple", "Sizes", maple_descript, maple_size);
        rightp_load(right_panel, "maple");
    } else if (this == ash) {
        leftp_load(left_panel, "Black Ash", "Sizes", ash_descript, ash_size);
        rightp_load(right_panel, "ash");
    } else if (this == hybrid) {
        leftp_load(left_panel, "Brass Hybrid", "Sizes", hybrid_descript, ash_size);
        rightp_load(right_panel, "hybrid");
    } else if (this == zjel) {
        leftp_load(left_panel, "Zjelezyaka", "Sizes", zjel_descript, zjel_size);
        rightp_load(right_panel, "zjel");
    } else if (this == V_3) {
        leftp_load(left_panel, "", "", "", "");
        rightp_load(right_panel, "V_3")
    } else if (this == V_25) {
        leftp_load(left_panel, "", "", "", "");
        rightp_load(right_panel, "V_25")
    }
    left_panel.style.visibility = 'visible';
    right_panel.style.visibility = 'visible';
}
maple.addEventListener('mouseover', (is_mobile) ? null:preview_vape, false);
ash.addEventListener('mouseover',(is_mobile) ? null:preview_vape, false);
hybrid.addEventListener('mouseover',(is_mobile) ? null:preview_vape, false);
zjel.addEventListener('mouseover', (is_mobile) ? null: preview_vape, false);
V_3.addEventListener('mouseover', (is_mobile) ? null:preview_vape, false);
V_25.addEventListener('mouseover', (is_mobile) ? null:preview_vape, false);
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
                  return_json = (data.responseJSON);
                  create_cart_el(null);
                  for(var i=0;i< return_json.length;i++){
                    create_cart_el(JSON.parse(return_json[i]))
                  }}
    })
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
var teh_cart = document.getElementById("cart_items");
var $cart_img = $('#cart_img');
$cart_img.on('click', function(ev){
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
    if ($('#cart_items :first-child').data('mod_object')){
        console.log('true');
        $cart_img.css('cursor', 'pointer');
        animate_cart = true;
        allow_buy = true;
        animate_teh_cart();
        $('#shipping').css('visibility', 'visible')
    }else{
        console.log("false");
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

