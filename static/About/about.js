// About
var main_left_1_1, main_left_1_2, main_left_1_3, main_left_2_1, main_left_2_2, main_left_2_3, main_left_3_1,
main_left_3_2, main_left_3_3, main_right_1_1, main_right_1_2, main_right_1_3, main_right_2_1,
main_right_2_2, main_right_2_3, main_right_3_1, main_right_3_2, main_right_3_3;
var teh_cart = document.getElementById("cart_items");
var $cart_img = $('#cart_img');

left_panel = document.getElementById('left_panel');
right_panel = document.getElementById('right_panel');
$('.main_img').on('mouseover', function () {
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
$('.thumb').on('mouseover click', function () {
    $main_img = $('#main_prev');
    $main_img.attr('src', `../Images/gallery/gallery_${this.id}.jpg`);
    $main_img.css('visibility', 'visible')
});
$cart_img.on('click', function(ev){
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