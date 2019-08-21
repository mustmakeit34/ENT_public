// V_3
var size, colors, color_dict, comments, animate_add_1,
animate_add_2, animate_cart, allow_buy;
colors = [];
comments = "";
allow_buy = false;
animate_add_1 = false;
animate_add_2 = false;
flag = null;
var teh_cart = document.getElementById("cart_items");
var $cart_img = $('#cart_img');
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
$('.click_add').on('click', function() {
    var hybrid_18 =  document.getElementById('18650_hybrid');
    var hybrid_21 =  document.getElementById('21700_hybrid');
    if (this != hybrid_18 && this != hybrid_21){
        $('#colors').css('visibility', 'visible');
    }
    $('#comments').css('visibility', 'visible');
    event.stopPropagation();
    if (flag == this && $('#cart_items').children().length < 4 && (colors.length > 0 ||this==hybrid_18||this==hybrid_21)){
        animate_add_1 = false;
        animate_add_2 = false;
        flag = null;
        comments = $('#comments').val();
        new_mod = new ENT_Mod();
        console.log(new_mod);
        ship_it(new_mod);
        document.getElementsByTagName('form')[0].reset();
        $('#colors').css('visibility', 'hidden');
        $('#comments').css('visibility', 'hidden');
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

$('.thumb').on('mouseover click', function () {
    $main_img = $('#main_prev');
    $main_img.attr('src', `../Images/main_prev/V_3_${this.id}.jpg`)
});
$('td').on('mouseover', function () {
    $(this).css('text-shadow', '0px 4px 10px #FFE878')
});
$('td').on('mouseout', function () {
    $(this).css('text-shadow', '')
});
$('#colors').on('click', function() {
    $('#colors').css('visibility', 'visible');
    event.stopPropagation();
});
$(document).on('click', function() {
    $('#colors').css('visibility', 'hidden');
    $('#comments').css('visibility', 'hidden');
    animate_add_1 = false;
    animate_add_2 = false;
    size = null;
    material = null;
    style = null;
    price = null;
    flag = null;
    color = [];
    clear_dots()
});
$('#18650_maple').on('click', function() {
    size = "18650";
    material = "maple";
    style = "V_3";
    price = 250;
    clear_dots()
});
$('#21700_maple').on('click', function() {
    size = "21700";
    material = "maple";
    style = "V_3";
    price = 270;
    clear_dots()
});
$('#18650_ash').on('click', function() {
    size = "18650";
    material = "ash";
    style = "V_3";
    price = 300;
    clear_dots()
});
$('#21700_ash').on('click', function() {
    size = "21700";
    material = "ash";
    style = "V_3";
    price = 320;
    clear_dots()
});
$('#18650_hybrid').on('click', function() {
    $('#colors').css('visibility', 'hidden');
    size = "18650";
    material = "hybrid";
    style = "V_3";
    price = 250;
    clear_dots()
});
$('#21700_hybrid').on('click', function() {
    $('#colors').css('visibility', 'hidden');
    size = "21700";
    material = "hybrid";
    style = "V_3";
    price = 270;
    clear_dots()
});
$('#color_1').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#0500ab") && colors.length < 3){colors.push("#0500ab")
    }else if (colors.includes("#0500ab")){colors.splice(colors.indexOf("#0500ab"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_2').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#2bc5ff") && colors.length < 3){colors.push("#2bc5ff")
    }else if (colors.includes("#2bc5ff")){colors.splice(colors.indexOf("#2bc5ff"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_3').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#c80000") && colors.length < 3){colors.push("#c80000")
    }else if (colors.includes("#c80000")){colors.splice(colors.indexOf("#c80000"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_4').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ff9321") && colors.length < 3){colors.push("#ff9321")
    }else if (colors.includes("#ff9321")){colors.splice(colors.indexOf("#ff9321"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_5').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#5b0089") && colors.length < 3){colors.push("#5b0089")
    }else if (colors.includes("#5b0089")){colors.splice(colors.indexOf("#5b0089"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_6').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ff00ff") && colors.length < 3){colors.push("#ff00ff")
    }else if (colors.includes("#ff00ff")){colors.splice(colors.indexOf("#ff00ff"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_7').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#0d9000") && colors.length < 3){colors.push("#0d9000")
    }else if (colors.includes("#0d9000")){colors.splice(colors.indexOf("#0d9000"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_8').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#8bff00") && colors.length < 3){colors.push("#8bff00")
    }else if (colors.includes("#8bff00")){colors.splice(colors.indexOf("#8bff00"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_9').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ffcd00") && colors.length < 3){colors.push("#ffcd00")
    }else if (colors.includes("#ffcd00")){colors.splice(colors.indexOf("#ffcd00"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_10').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#fff827") && colors.length < 3){colors.push("#fff827")
    }else if (colors.includes("#fff827")){colors.splice(colors.indexOf("#fff827"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_11').on('click', function() {
    if (!colors.includes("#543a27")){
        clear_dots();
        colors.push("#543a27")
    }else if (colors.includes("#543a27")){colors.splice(colors.indexOf("#543a27"),1)};
    apply_dots(`${material}_${size}`);
});
$('#color_12').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ffffff")){colors.push("#ffffff")
    }else if (colors.includes("#ffffff")){colors.splice(colors.indexOf("#ffffff"),1)};
    apply_dots(`${material}_${size}`);
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