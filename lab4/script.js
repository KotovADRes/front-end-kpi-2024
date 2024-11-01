const body = document.querySelector('body');
const variant = (43 % 10) + 1;

let first_id = '';
let second_id = '';

const elements = [...body.childNodes].filter(n => n.nodeType === Node.ELEMENT_NODE);

elements.every((element, indx) => {
    if (indx + 1 == variant % elements.length) {
        //Всі елементи мають id...
        first_id = element.id;
    } else if (indx == variant % elements.length) {
        second_id = element.id;
        return false;
    }
    return true;
});

const get_color_event = (blue_then_green = true) => {
    let cname_arr = ["blue", "green"];
    if (!blue_then_green) {
        cname_arr = cname_arr.reverse();
    }
    return e => {
        const classlist = e.currentTarget.classList;
        const class_name = [...classlist].includes(cname_arr[0]) ? cname_arr[1] : cname_arr[0];
    
        classlist.remove(...cname_arr);
        classlist.add(class_name);
    }
}

document.getElementById(first_id).innerHTML += " <b>[JS event]</b>"
document.getElementById(first_id).onclick = get_color_event();

document.querySelector("#" + second_id).innerHTML += " <b>[JS event]</b>"
document.querySelector("#" + second_id).onclick = get_color_event(false);


//-----

const image_a = document.querySelector("#city_img_link");
const buttons = document.querySelector("#buttons");
const b_add = document.querySelector("#b_add");
const b_zoomin = document.querySelector("#b_zoomin");
const b_zoomout = document.querySelector("#b_zoomout");
const b_delete = document.querySelector("#b_delete");

scales = [1];

function getLastValue(array) {
    if (array.length === 0) return;
    return array[array.length - 1];
}

function setLastValue(array, value) {
    if (array.length > 0) {
        array[array.length - 1] = value;
    }
    return array;
}

function buttonsUpdate() {
    const images = image_a.querySelectorAll("img");
    const hasImages = images.length > 0;
    const scale = hasImages ? getLastValue(scales) : 1;

    b_delete.disabled = images.length < 2;
    b_zoomin.disabled = !hasImages || scale >= 2;
    b_zoomout.disabled = !hasImages || scale <= 1;
}
buttonsUpdate();

function updateScale(scale) {
    const images = image_a.querySelectorAll("img");
    if (images.length < 1) return;

    const last = getLastValue(images);
    last.style.transform = `scale(${scale})`;
    scales = setLastValue(scales, scale);
}

function scaleChange(amout) {
    let scale = getLastValue(scales);
    let new_scale = Math.max(Math.min(scale + amout, 2), 1);
    new_scale = parseFloat(new_scale.toFixed(1)); //нам потрібен формат числа 0.0
    updateScale(new_scale);
}

b_add.onclick = e => {
    const image_div = image_a.querySelector("div");
    if (!image_div) return;

    const clone = image_div.cloneNode(true);
    clone.querySelector("img").style.transform = "scale(1)";
    image_a.appendChild(clone);
    scales.push(1);
}

b_zoomin.onclick = e => {
    scaleChange(0.1);
}

b_zoomout.onclick = e => {
    scaleChange(-0.1);
}

b_delete.onclick = e => {
    const image_divs = image_a.querySelectorAll("div");
    if (image_divs.length < 2) return;

    const last = getLastValue(image_divs);
    image_a.removeChild(last);
    scales.pop();
}

buttons.onclick = e => {
    buttonsUpdate();
};