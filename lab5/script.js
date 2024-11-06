const variant = 43;

const $qs = (e, s) => e.querySelector(s);
const $qsa = (e, s) => e.querySelectorAll(s);

const $dqs = s => $qs(document, s);
const $dqsa = s => $qsa(document, s);

const form = $dqs(".form-wrapper form");

//ключ - id input поля
const regexes = {
    //всі літери А-Я + українські для формату [(строка довільної довжини) (один символ). (один символ).]
    //ТТТТТТ Т.Т.
    'fullname': /^[А-ЯІЇЄҐ][а-яіїєґ']{1,}\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/,
    //формат телефону: (0XX)-XXX-XX-XX, де X - цифра
    //(ЧЧЧ)-ЧЧЧ-ЧЧ-ЧЧ
    'phone': /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    //формат ідентифікаційної картки: дві великі літери (А-Я + укр.) + пробіл + "№" + 6 цифр
    //ТТ №ЧЧЧЧЧЧ
    'idcard': /^[А-ЯІЇЄҐ]{2}\s№\d{6}$/,
    //дата народження: DD.MM.YYYY, де D, M, Y - день, місяць, рік відповідної довжини запису (двозначий день, місяць та 4-значний рік)
    //ЧЧ.ЧЧ.ЧЧЧЧ
    'birthdate': /^\d{2}\.\d{2}\.\d{4}$/,
    //формат пошти: строка (латинські символи + [._%+-]) + "@" + строка + "." + строка від 2-х символів (домен)
    //ТТТТТ@ТТТТТ.com
    'email': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

//ключ - id input поля
const additional_test_functions = {
    'phone': (str, errors = null) => {
        const operators_codes = ['039', '067', '068', '096', '097', '098', '050', '066', '095', '099', '063', '073', '093', '091', '092', '089', '094'];
        const operator = str.replaceAll(/[-()]/g, '').slice(0, 3);

        if ( !(operators_codes.includes(operator)) ) {
            errors = ['невідомий код оператора'];
        }

        return errors;
    },
    'birthdate': (str, errors = null) => {
        const date = new Date(str);

        if ( isNaN(date.getTime()) ) {
            errors = ['невідомий формат дати'];
            return errors;
        }

        const date_now = new Date();
        const year_diff = date_now.getFullYear() - date.getFullYear()

        if ( year_diff < 10 || year_diff > 100) {
            errors = ['некоректний вік'];
        }

        return errors;
    },
    'email': (str, errors = null) => {
        const valid_tlds = [
            'com', 'org', 'net', 'int', 'edu', 'gov', 'mil',
            'ua', 'us', 'uk', 'de', 'jp', 'fr', 'ru', 'ch',
            'it', 'nl', 'se', 'no', 'es', 'mil', 'info', 'biz',
            'io', 'tech', 'xyz', 'site', 'online', 'store', 'club',
            'agency', 'museum', 'travel', 'pro', 'name', 'coop',
            'aero', 'jobs', 'mobi', 'cat', 'tel', 'asia', 'post',
            'su', 'website'
        ];

        const domain = str.split('@')[1];
        const tld = domain.split('.').pop().toLowerCase();

        if ( !valid_tlds.includes(tld) ) {
            errors = ['невідома доменна зона'];
        }

        return errors;
    },
};

const labels = [...form.childNodes].filter(n => n.nodeName == "LABEL");

labels.forEach(l => {
    const input = $qs(l, "input");
    const title = document.createTextNode( input.getAttribute("data-title") + ":" );
    l.insertBefore(title, input);
});

const inputs = $qsa(form, 'input[type="text"]');

form.addEventListener('submit', e => {
    e.preventDefault();

    const output_table = $dqs('table#formoutput');
    [...inputs].forEach(input => {
        const id = input.id;
        const title = input.getAttribute('data-title');
        const value = input.value;

        let tr = $qs(output_table, '.js-output-' + id);
        if ( !tr ) {
            tr = document.createElement('tr');
            tr.classList.add('js-output-' + id);

            tr.append(
                document.createElement('td'), 
                document.createElement('td')
            );

            $qs(tr, 'td').innerHTML = '<b>' + title + ': </b>';
            output_table.appendChild(tr);
        }

        const output_cell = $qsa(tr, 'td')[1];

        if( !(regexes[id]?.test(value)) ) {
            input.style.border = 'solid 2px red';
            output_cell.innerHTML = '<i>(некоректний формат)</i>';
            return;
        }

        if ( additional_test_functions.hasOwnProperty(id) ) {
            const errors = additional_test_functions[id](value);
            if (errors) {
                input.style.border = 'solid 2px red';
                output_cell.innerHTML = '<i>(помилки: ' + errors.join('; ') + ')</i>';
                return;
            };
        }

        input.style.border = '';
        output_cell.innerHTML = value;

    });
});


//---


const table_size = [6, 6];
const table_grid_wrapper = $dqs('.table-grid-wrapper');
const table_grid = $qs(table_grid_wrapper, 'table#tablegrid');

function randomColorCSS() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

let curr_variant = variant;
let table_max = table_size[0] * table_size[1]

if (table_max <= curr_variant) {
    curr_variant %= table_max;
    curr_variant++;
}

for (let i = 0; i < table_size[0]; i++) {
    const tr = document.createElement('tr');
    table_grid.appendChild(tr);

    for (let j = 1; j <= table_size[1]; j++) {
        const td = document.createElement('td');
        const number = i * table_size[1] + j

        if (number == curr_variant) {
            td.addEventListener('mouseover', t => {
                t.target.style.backgroundColor = randomColorCSS();
            });

            td.addEventListener('click', t => {
                const picker = $qs(table_grid_wrapper, '#colorpicker');
                t.target.style.backgroundColor = picker.value;
            });

            td.addEventListener('dblclick', t => { 
                const color = randomColorCSS();
                [...$qsa(table_grid, 'td')].forEach((t, indx) => {
                    if (indx == 0 || indx + 1 == table_max)
                        return;
                    if (indx % (table_size[1] - 1) == 0)
                        t.style.backgroundColor = color;
                });
            });
        }
        

        td.innerText = number;

        tr.appendChild(td);
    }
}