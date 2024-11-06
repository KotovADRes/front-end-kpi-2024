const variant = 43;

const $qs = (e, s) => e.querySelector(s);
const $qsa = (e, s) => e.querySelectorAll(s);

const $dqs = s => $qs(document, s);
const $dqsa = s => $qsa(document, s);

const url = 'https://randomuser.me/api';
let is_data_loading = false;

function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Помилка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Помилка:', error);
            throw error;
        });
}

function createProfileDOM(img_src, fields = []) {
    const profile_card = document.createElement('div');
    profile_card.classList.add('profile-card');

    const img_container = document.createElement('div');
    img_container.classList.add('image-wrapper');

    const img = document.createElement('img');
    img.src = img_src;

    img_container.appendChild(img);

    const table = document.createElement('table');
    table.classList.add('profile-info');

    fields.forEach(field => {
        const tr = document.createElement('tr');

        const fname = document.createElement('td');
        fname.innerHTML = '<b>' + field[0] + ': </b>';

        const fvalue = document.createElement('td');
        fvalue.innerText = field[1];

        tr.append(fname, fvalue);
        table.appendChild(tr);
    });

    profile_card.append(img_container, table);

    return profile_card;
}

function populateProfiles(profiles) {
    const container = $dqs('.profiles');
    container.innerHTML = '';

    profiles.forEach(profile => {
        const img_src = profile.picture.large;
        const fields = [
            ['Gender', profile.gender],
            ['Name', profile.name.first + ' ' + profile.name.last],
            ['City', profile.location.city],
            ['Postcode', profile.location.postcode],
            ['Phone', profile.phone]
        ];

        const profile_dom = createProfileDOM(img_src, fields);
        container.appendChild(profile_dom);
    });

}


function reloadProfiles() {
    if (is_data_loading) return false;
    
    is_data_loading = true;
    status_line.innerText = "Loading...";
    button.disabled = true;

    fetchData(url + '/?results=5').then(data => {
            populateProfiles(data.results);
            is_data_loading = false;
            status_line.innerText = "Success!";
            button.disabled = false;
        })
        .catch(error => {
            console.error('Помилка:', error);
            status_line.innerText = "Error!";
            button.disabled = false;
        });
    return true;
}

const button = $dqs('button#download');
const status_line = $dqs('#status');

button.addEventListener('click', e => {
    reloadProfiles();
});