let size = null;
let material = null;
let style = null;
let colors = [];
let comments = "";
let price = null;
let flag = null;
let animate_add_1 = false;
let animate_add_2 = false;
let allow_buy = false;

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
const $maple_colors = $('#maple_colors');
const $maple_comments = $('#maple_comments');
const $ash_colors = $('#ash_colors');
const $ash_comments = $('#ash_comments');
const $hybrid_comments = $('#hybrid_comments');
const $zjel_comments = $('#zjel_comments');
const $V3_colors = $('#V3_colors');
const $V3_comments = $('#V3_comments');
const $V25_colors = $('#V25_colors');
const $V25_comments = $('#V25_comments');
const $top_cart = $('#top_cart');

$(function(){
    let maple_p_height = $('#maple_description').outerHeight(true);
    const $maple_table = $('#maple_table');
    $maple_table.css('margin-top', `${maple_p_height+2.5}px`);
    let maple_table_height = $maple_table.outerHeight(true);
    $maple_colors.css('margin-top', `${maple_table_height}px`);
    let maple_color_height = $maple_colors.outerHeight(true);
    $maple_comments.css('margin-top', `${maple_color_height}px`);

    let ash_p_height = $('#ash_description').outerHeight(true);
    const $ash_table = $('#ash_table');
    $ash_table.css('margin-top', `${ash_p_height+2.5}px`);
    let ash_table_height = $ash_table.outerHeight(true);
    $ash_colors.css('margin-top', `${ash_table_height}px`);
    let ash_color_height = $ash_colors.outerHeight(true);
    $ash_comments.css('margin-top', `${ash_color_height}px`);

    let hybrid_p_height = $('#hybrid_description').outerHeight(true);
    const $hybrid_table = $('#hybrid_table');
    $hybrid_table.css('margin-top', `${hybrid_p_height+2.5}px`);
    let hybrid_table_height = $hybrid_table.outerHeight(true);
    $hybrid_comments.css('margin-top', `${hybrid_table_height}px`);

    let zjel_p_height = $('#zjel_description').outerHeight(true);
    const $zjel_table = $('#zjel_table');
    $zjel_table.css('margin-top', `${zjel_p_height+2.5}px`);
    let zjel_table_height = $zjel_table.outerHeight(true);
    $zjel_comments.css('margin-top', `${zjel_table_height}px`);

    let V3_p_height = $('#V3_description').outerHeight(true);
    const $V3_table = $('#V3_table');
    $V3_table.css('margin-top', `${V3_p_height+2.5}px`);
    let V3_table_height = $V3_table.outerHeight(true);
    $V3_colors.css('margin-top', `${V3_table_height}px`);
    let V3_color_height = $V3_colors.outerHeight(true);
    $V3_comments.css('margin-top', `${V3_color_height}px`);

    let V25_p_height = $('#V25_description').outerHeight(true);
    const $V25_table = $('#V25_table');
    $V25_table.css('margin-top', `${V25_p_height+2.5}px`);
    let V25_table_height = $V25_table.outerHeight(true);
    $V25_colors.css('margin-top', `${V25_table_height}px`);
    let V25_color_height = $V25_colors.outerHeight(true);
    $V25_comments.css('margin-top', `${V25_color_height}px`);

});
const $overlay = $('.overlay');
function clear_all(){
    clear_dots();
    $overlay.css('visibility', 'hidden');
    price = null;
    size = null;
    material = null;
    style = null;
    colors = [];
    comments = ""
}
$('p').on('click', function(e){
    $overlay.css('visibility', 'hidden');
    e.stopPropagation()
});

$('#show_maple').on('click', function(){
    clear_all();
    $('.maple_overlay').css('visibility', 'visible')
});
$('#show_ash').on('click', function(){
    clear_all();
    $('.ash_overlay').css('visibility', 'visible')
});
$('#show_hybrid').on('click', function(){
    clear_all();
    $('.hybrid_overlay').css('visibility', 'visible')
});
$('#show_zjel').on('click', function(){
    clear_all();
    $('.zjel_overlay').css('visibility', 'visible')
});
$('#show_V3').on('click', function(){
    clear_all();
    $('.V3_overlay').css('visibility', 'visible')
});
$('#show_V25').on('click', function(){
    clear_all();
    $('.V25_overlay').css('visibility', 'visible')
});

$('#maple_18650_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_18650_V25();
    show_maple_color_comm();
    handle_add(this);
});
$('#maple_21700_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_21700_V25();
    show_maple_color_comm();
    handle_add(this);
});
$('#maple_18650_V_3').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_18650_V3();
    show_maple_color_comm();
    handle_add(this);
});
$('#maple_21700_V_3').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_21700_V3();
    show_maple_color_comm();
    handle_add(this);
});
$('#ash_18650_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_18650_V25();
    show_ash_color_comm();
    handle_add(this);
});
$('#ash_21700_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_21700_V25();
    show_ash_color_comm();
    handle_add(this);
});
$('#ash_18650_V_3').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_18650_V3();
    show_ash_color_comm();
    handle_add(this);
});
$('#ash_21700_V_3').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_21700_V3();
    show_ash_color_comm();
    handle_add(this);
});
$('#hybrid_18650_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_18650_V25();
    show_hybrid_comm();
    colors = [];
    handle_add(this);
});
$('#hybrid_21700_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_21700_V25();
    show_hybrid_comm();
    colors = [];
    handle_add(this);
});
$('#hybrid_18650_V_3').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_18650_V3();
    show_hybrid_comm();
    colors = [];
    handle_add(this);
});
$('#hybrid_21700_V_3').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_21700_V3();
    show_hybrid_comm();
    colors = [];
    handle_add(this);
});
$('#zjel_18650_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_zjel_18650_V25();
    show_zjel_comm();
    colors = [];
    handle_add(this);
});
$('#zjel_21700_V_25').on('click', function(){
    if (!flag==this){clear_dots()}
    add_zjel_21700_V25();
    show_zjel_comm();
    colors = [];
    handle_add(this);
});
$('#V3_18650_maple').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_18650_V3();
    show_V3_color();
    show_V3_comm();
    handle_add(this);
});
$('#V3_21700_maple').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_21700_V3();
    show_V3_color();
    show_V3_comm();
    handle_add(this);
});
$('#V3_18650_ash').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_18650_V3();
    show_V3_color();
    show_V3_comm();
    handle_add(this);
});
$('#V3_21700_ash').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_21700_V3();
    show_V3_color();
    show_V3_comm();
    handle_add(this);
});
$('#V3_18650_hybrid').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_18650_V3();
    show_V3_comm();
    handle_add(this);
    colors = [];
    hide_V3_color();
});
$('#V3_21700_hybrid').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_21700_V3();
    show_V3_comm();
    handle_add(this);
    colors = [];
    hide_V3_color();
});
$('#V25_18650_maple').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_18650_V25();
    show_V25_color();
    show_V25_comm();
    handle_add(this);
});
$('#V25_21700_maple').on('click', function(){
    if (!flag==this){clear_dots()}
    add_maple_21700_V25();
    show_V25_color();
    show_V25_comm();
    handle_add(this);
});
$('#V25_18650_ash').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_18650_V25();
    show_V25_color();
    show_V25_comm();
    handle_add(this);
});
$('#V25_21700_ash').on('click', function(){
    if (!flag==this){clear_dots()}
    add_ash_21700_V25();
    show_V25_color();
    show_V25_comm();
    handle_add(this);
});
$('#V25_18650_hybrid').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_18650_V25();
    show_V25_comm();
    handle_add(this);
    colors = [];
    hide_V25_color();
});
$('#V25_21700_hybrid').on('click', function(){
    if (!flag==this){clear_dots()}
    add_hybrid_21700_V25();
    show_V25_comm();
    handle_add(this);
    colors = [];
    hide_V25_color();
});
$('#V25_18650_zjel').on('click', function(){
    if (!flag==this){clear_dots()}
    add_zjel_18650_V25();
    show_V25_comm();
    handle_add(this);
    colors = [];
    hide_V25_color();
});
$('#V25_21700_zjel').on('click', function(){
    if (!flag==this){clear_dots()}
    add_zjel_21700_V25();
    show_V25_comm();
    handle_add(this);
    colors = [];
    hide_V25_color();
});

function show_maple_color_comm(){
    $maple_colors.css('visibility', 'visible');
    $maple_comments.css('visibility', 'visible');
}
function show_ash_color_comm(){
    $ash_colors.css('visibility', 'visible');
    $ash_comments.css('visibility', 'visible');
}
function show_hybrid_comm(){
    $hybrid_comments.css('visibility', 'visible');
}
function show_zjel_comm(){
    $zjel_comments.css('visibility', 'visible');
}
function show_V3_color(){
    $V3_colors.css('visibility', 'visible');
}
function show_V3_comm(){
    $V3_comments.css('visibility', 'visible');
}
function show_V25_color(){
    $V25_colors.css('visibility', 'visible');
}
function show_V25_comm(){
    $V25_comments.css('visibility', 'visible');
}
function hide_V3_color(){
    $V3_colors.css('visibility', 'hidden')
}
function hide_V25_color(){
    $V25_colors.css('visibility', 'hidden')
}
function add_maple_18650_V25(){
    price = 230;
    size = "18650";
    material = "maple";
    style = "V_25";
}
function add_maple_21700_V25(){
    price = 250;
    size = "21700";
    material = "maple";
    style = "V_25";
}
function add_maple_18650_V3(){
    price = 250;
    size = "18650";
    material = "maple";
    style = "V_3";
}
function add_maple_21700_V3(){
    price = 270;
    size = "21700";
    material = "maple";
    style = "V_3";
}
function add_ash_18650_V25(){
    price = 280;
    size = "18650";
    material = "ash";
    style = "V_25";
}
function add_ash_21700_V25(){
    price = 300;
    size = "21700";
    material = "ash";
    style = "V_25";
}
function add_ash_18650_V3(){
    price = 300;
    size = "18650";
    material = "ash";
    style = "V_3";
}
function add_ash_21700_V3(){
    price = 320;
    size = "21700";
    material = "ash";
    style = "V_3";
}
function add_hybrid_18650_V25(){
    price = 230;
    size = "18650";
    material = "hybrid";
    style = "V_25";
}
function add_hybrid_21700_V25(){
    price = 250;
    size = "21700";
    material = "hybrid";
    style = "V_25";
}
function add_hybrid_18650_V3(){
    price = 250;
    size = "18650";
    material = "hybrid";
    style = "V_3";
}
function add_hybrid_21700_V3(){
    price = 270;
    size = "21700";
    material = "hybrid";
    style = "V_3";
}
function add_zjel_18650_V25(){
    price = 175;
    size = "18650";
    material = "zjel";
    style = "V_25";
}
function add_zjel_21700_V25(){
    price = 195;
    size = "21700";
    material = "zjel";
    style = "V_25";
}

$('.color_1').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#0500ab") && colors.length < 3){colors.push("#0500ab")
    }else if (colors.includes("#0500ab")){colors.splice(colors.indexOf("#0500ab"),1)}
    (this.className=="color_1 V3_color" || this.className=="color_1 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_2').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#2bc5ff") && colors.length < 3){colors.push("#2bc5ff")
    }else if (colors.includes("#2bc5ff")){colors.splice(colors.indexOf("#2bc5ff"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_2 V3_color" || this.className=="color_2 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_3').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#c80000") && colors.length < 3){colors.push("#c80000")
    }else if (colors.includes("#c80000")){colors.splice(colors.indexOf("#c80000"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_3 V3_color" || this.className=="color_3 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_4').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ff9321") && colors.length < 3){colors.push("#ff9321")
    }else if (colors.includes("#ff9321")){colors.splice(colors.indexOf("#ff9321"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_4 V3_color" || this.className=="color_4 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_5').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#5b0089") && colors.length < 3){colors.push("#5b0089")
    }else if (colors.includes("#5b0089")){colors.splice(colors.indexOf("#5b0089"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_5 V3_color" || this.className=="color_5 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_6').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ff00ff") && colors.length < 3){colors.push("#ff00ff")
    }else if (colors.includes("#ff00ff")){colors.splice(colors.indexOf("#ff00ff"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_6 V3_color" || this.className=="color_6 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_7').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#0d9000") && colors.length < 3){colors.push("#0d9000")
    }else if (colors.includes("#0d9000")){colors.splice(colors.indexOf("#0d9000"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_7 V3_color" || this.className=="color_7 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_8').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#8bff00") && colors.length < 3){colors.push("#8bff00")
    }else if (colors.includes("#8bff00")){colors.splice(colors.indexOf("#8bff00"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_8 V3_color" || this.className=="color_8 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_9').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ffcd00") && colors.length < 3){colors.push("#ffcd00")
    }else if (colors.includes("#ffcd00")){colors.splice(colors.indexOf("#ffcd00"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_9 V3_color" || this.className=="color_9 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_10').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#fff827") && colors.length < 3){colors.push("#fff827")
    }else if (colors.includes("#fff827")){colors.splice(colors.indexOf("#fff827"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_10 V3_color" || this.className=="color_10 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_11').on('click', function() {
    if (!colors.includes("#543a27")){
        clear_dots();
        colors.push("#543a27")
    }else if (colors.includes("#543a27")){colors.splice(colors.indexOf("#543a27"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_11 V3_color" || this.className=="color_11 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
});
$('.color_12').on('click', function() {
    if (colors.includes("#543a27")){clear_dots()}
    if (!colors.includes("#ffffff") && colors.length < 3){colors.push("#ffffff")
    }else if (colors.includes("#ffffff")){colors.splice(colors.indexOf("#ffffff"),1)}
    apply_dots(`${material}_${style}_${size}`);
    (this.className=="color_12 V3_color" || this.className=="color_12 V25_color") ? apply_dots(`${style}_${material}_${size}`): apply_dots(`${material}_${style}_${size}`);
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
$('form').on('submit',function(e) {
    e.preventDefault();
});

function which_comments(){
    if ($maple_comments.val()){comments = $maple_comments
    }else if ($ash_comments.val()){comments = $ash_comments
    }else if ($hybrid_comments.val()){comments = $hybrid_comments
    }else if ($zjel_comments.val()){comments = $zjel_comments
    }else if ($V3_comments.val()){comments = $V3_comments
    }else if ($V25_comments.val()){comments = $V25_comments
    }else{comments = ""}
}

function handle_add(adding){
    if (flag == adding && $('#cart_items').children().length < 4 && (colors.length > 0 || adding.className == "add no_color")){
        animate_add_1 = false;
        animate_add_2 = false;
        which_comments();
        let new_mod = new ENT_Mod();
        flag = null;
        ship_it(new_mod);
        document.getElementsByTagName('form')[1].reset();
        document.getElementsByTagName('form')[2].reset();
        document.getElementsByTagName('form')[3].reset();
        document.getElementsByTagName('form')[4].reset();
        document.getElementsByTagName('form')[5].reset();
        document.getElementsByTagName('form')[6].reset();
        clear_all()
    }else if (animate_add_1){
        flag = adding;
        animate_add_1 = false;
        animate_add_2 = true;
        animate_cart_2($(adding));
    }else if (animate_add_2 || !(animate_add_1 || animate_add_2)){
        flag = adding;
        animate_add_1 = true;
        animate_add_2 = false;
        animate_cart_1($(adding));
    }
    if ($('#cart_items').children().length === 4){$('#full').css('visibility','visible')}
}

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

function create_cart_el(json_data){
    var mod = json_data;
    if (! mod){
        $('#cart_items').empty()
    }else{
        let cart_item = document.createElement('div');
        $(cart_item).data('mod_object', mod);
        let color_grouping = document.createElement('div');
        cart_item.className = 'cart_item';
        cart_item.appendChild(color_grouping);
        color_grouping.className = 'color_grouping';
        $('#cart_items').append(cart_item);
        let item_small = document.createElement('small');
        let item_text = document.createTextNode(mod.size + " | " + mod.material + " | " +
            mod.style + " | $" +  String(mod.price));
        cart_item.appendChild(item_small);
        item_small.appendChild(item_text);
        item_small.setAttribute('class','cart_text');
        for (var i=0;i < mod.colors.length; i++){
            let color_div = document.createElement('div');
            color_div.className = 'dot';
            color_div.setAttribute('class', `${color_dict[mod.colors[i]]}_2 dot`);
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
let teh_cart = document.getElementById("cart_items");
function evaluate_cart(){
    if ($('#cart_items :first-child').data('mod_object')){
        $top_cart.css('cursor', 'pointer');
        animate_cart = true;
        allow_buy = true;
        animate_teh_cart();
        $('#shipping').css('visibility', 'visible')
    }else{
        $top_cart.css('cursor', 'default');
        animate_cart = false;
        allow_buy = false;
        $('#shipping').css('visibility', 'hidden')
    }}
teh_cart.addEventListener('DOMSubtreeModified', evaluate_cart, true);
$('#comments').on('click', function() {
    $('#colors').css('visibility', 'visible');
    $('#comments').css('visibility', 'visible');
});
function animate_teh_cart(){
    $top_cart.animate({opacity:0.0}, 600, 'swing');
    $top_cart.animate({opacity:1.0}, 600, 'swing', animate_cart ? animate_teh_cart : null);
}

$top_cart.on('click', function(){
    if ($('#cart_items :first-child').data('mod_object')){
        var shipping_type = $('#shipping').serializeArray()[0]["value"];
        $.ajax({type: "GET",
            url: (shipping_type=="dhl") ? '../fast.lets_go':'../normal.lets_go',
            success: function(data){
                $('#modal').append(data);
                $('#paypal_form').submit()

         }})
}});

