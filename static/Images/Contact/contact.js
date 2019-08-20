// main page
var maple_descript, maple_size, ash_descript, ash_size, hybrid_descript, hybrid_size, zjel_descript, zjel_size;
var V_25, maple_V25, ash_V25, hybrid_V25, zjel_V25, V_3, maple_V3, ash_V3, hybrid_V3, zjel_V3, zjel_style;
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
zjel_style = "The Zjelezyaka, has a unique twist on the flat V2.5 style."
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
    var zjel_style_text = document.createTextNode(zjel_style)
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
    rightp_img1 = document.createElement('img')
    rightp_img2 = document.createElement('img')
    rightp_img3 = document.createElement('img')
    rightp_img1.src = `Images/preview/${product}_01.jpg`
    rightp_img2.src = `Images/preview/${product}_02.jpg`
    rightp_img3.src = `Images/preview/${product}_03.jpg`
    element.appendChild(rightp_img1)
    element.appendChild(rightp_img2)
    element.appendChild(rightp_img3)
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
        leftp_load(left_panel, "", "", "", "")
        rightp_load(right_panel, "v_3")
    } else if (this == V_25) {
        leftp_load(left_panel, "", "", "", "")
        rightp_load(right_panel, "v_25")
    }
    left_panel.style.visibility = 'visible';
    right_panel.style.visibility = 'visible';
}
maple.addEventListener('mouseover', preview_vape, false);
ash.addEventListener('mouseover', preview_vape, false);
hybrid.addEventListener('mouseover', preview_vape, false);
zjel.addEventListener('mouseover', preview_vape, false);
V_3.addEventListener('mouseover', preview_vape, false);
V_25.addEventListener('mouseover', preview_vape, false);

