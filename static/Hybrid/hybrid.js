// Hybrid
var size,  colors, color_dict, animate_add_1, materials,
animate_add_2, animate_cart, allow_buy;
colors = [];
comments = [];
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
var teh_cart = document.getElementById("cart_items");
var $cart_img = $('#cart_img');

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
$('.thumb').on('mouseover click', function () {
    $main_img = $('#main_prev');
    $main_img.attr('src', `../Images/main_prev/hybrid_${this.id}.jpg`)
});
$('td').on('mouseover', function () {
    $(this).css('text-shadow', '0px 4px 10px #FFE878')
});
$('td').on('mouseout', function () {
    $(this).css('text-shadow', '')
});
$('#comments').on('click', function(e) {
     $('#colors').css('visibility', 'visible');
     $('#comments').css('visibility', 'visible');
     e.stopPropagation();
});
$('form').on('submit',function(e) {
    e.preventDefault();
});
$('.click_add').on('click', function() {
    event.stopPropagation();
    $('#comments').css('visibility', 'visible');
    if (flag == this && $('#cart_items').children().length < 4){
        animate_add_1 = false;
        animate_add_2 = false;
        comments = $('#comments').val();
        new_mod = new ENT_Mod();
        console.log(new_mod);
        ship_it(new_mod);
        flag = null;
        document.getElementsByTagName('form')[0].reset();
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
    this.comments = comments;
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
    $('#comments').css('visibility', 'hidden');
    size = null;
    material = null;
    animate_add_1 = false;
    animate_add_2 = false;
    flag = null;
    style = null;
    price = null;
    colors = [];
    clear_dots()
});
$('#18650_V_25').on('click', function() {
    size = "18650";
    material = "hybrid";
    style = "V_25";
    price = 230;
    clear_dots()
});
$('#21700_V_25').on('click', function() {
    size = "21700";
    material = "hybrid";
    style = "V_25";
    price = 250;
    clear_dots()
});
$('#18650_V_3').on('click', function() {
    size = "18650";
    material = "hybrid";
    style = "V_3";
    price = 250;
    clear_dots()
});
$('#21700_V_3').on('click', function() {
    size = "21700";
    material = "hybrid";
    style = "V_3";
    price = 270;
    clear_dots()
});
function ship_it(mod){
    string_version = JSON.stringify(mod)
    $.ajax({
        data : string_version,
        type : "POST",
        url : "../mod.json",
        mimeType : "application/json",
        complete : function(data) {
                  return_json = (data.responseJSON)
                  create_cart_el(null)
                  for(var i=0;i< return_json.length;i++){
                    create_cart_el(JSON.parse(return_json[i]))
                  }}
    })
}
function create_cart_el(json_data){
    var mod = json_data
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
                          return_json = (data.responseJSON)
                          create_cart_el(null)
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
                  return_json = (data.responseJSON)
                  create_cart_el(null)
                  for(var i=0;i< return_json.length;i++){
                    create_cart_el(JSON.parse(return_json[i]))
                  }}
    })
});