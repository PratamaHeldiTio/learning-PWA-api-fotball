import {
    getDetailUi,
    getFavoritAllUi,
    navbarDetailMatch,
    navbarDetailFavorit,
    getMatchAllUi,
    getStandingsUi
} from './display.js';

import { updateDbFavorit, getFavoritAllDb, getDetailFavoritDb } from './db.js';

const base_url = 'https://api.football-data.org/v2/';

function getMatchAll() {
    if ('caches' in window) {
        caches.match(`${base_url}competitions/SA/matches`)
            .then(function (response) {
                if (response) {
                    response.json().then(function (response) {
                        getMatchAllUi(response);
                    });
                }
            });
    }

    $.ajax({
        mode: 'no-cors',
        headers: {
            'X-Auth-Token': '59caa191a2454611837e2ab0ffd66bb6'
        },
        type: "GET",
        url: `${base_url}competitions/SA/matches`,
        dataType: "json",
        error: (e) => {
            $('#body-content').html('<h5 class="center-align not-found">Anda sedang offline</h5>');
        }
    })
        .done(response => {
            getMatchAllUi(response);
        });
}

function getStandings() {

    if ('caches' in window) {
        caches.match(`${base_url}competitions/SA/standings`)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(response => {
                            getStandingsUi(response);
                        });
                }
            });
    }

    $.ajax({
        mode: 'no-cors',
        headers: {
            'X-Auth-Token': '59caa191a2454611837e2ab0ffd66bb6'
        },
        type: "GET",
        url: `${base_url}competitions/SA/standings`,
        dataType: "json",
        error: (e) => {
            $('#body-content').html('<h5 class="center-align not-found">Anda sedang offline</h5>');
        }
    }).done(response => {
        getStandingsUi(response);
    });
}


function getDetailMatch(id) {

    if ('caches' in window) {
        caches.match(`${base_url}matches/${id}`)
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(response => {
                            let elm = navbarDetailMatch();
                            elm += getDetailUi(response);
                            $('.main-content').html(elm);
                        });
                }
            });
    }
    $.ajax({
        mode: 'no-cors',
        headers: {
            'X-Auth-Token': '59caa191a2454611837e2ab0ffd66bb6'
        },
        type: "GET",
        url: `${base_url}matches/${id}`,
        dataType: "json",
        error: (e) => {
            $('nav').html(navbarDetailMatch());
            $('#body-content').html('<h5 class="center-align not-found">Anda sedang offline</h5>');
        }
    }).done(response => {
        let elm = navbarDetailMatch();
        elm += getDetailUi(response);
        $('.main-content').html(elm);
    });
}

function getDetailFavorit(id) {
    getDetailFavoritDb(id).then(response => {
        let elm = navbarDetailFavorit();
        elm += getDetailUi(response);
        $('.main-content').html(elm);
    })
}

function saveFavorit(id) {
    return new Promise((resolve, reject) => {
        if ('caches' in window) {
            caches.match(`${base_url}matches/${id}`)
                .then(function (response) {
                    if (response) {
                        response.json()
                            .then(response => {
                                resolve(response);
                            });
                    }
                });
        }
        $.ajax({
            mode: 'no-cors',
            headers: {
                'X-Auth-Token': '59caa191a2454611837e2ab0ffd66bb6'
            },
            type: "GET",
            url: `${base_url}matches/${id}`,
            dataType: "json",
            error: (e) => {
                M.toast({ html: 'Anda sedang offline', classes: 'rounded' });
            }
        }).done(response => {
            resolve(response);
        });
    });
}

function getFavoritAll() {
    updateDbFavorit();
    getFavoritAllDb().then(matches => {
        if (matches.length === 0) {
            const empty = `<h5 class="center-align not-found">Daftar favorit kosong</h5>`;
            $('#body-content').html(empty);
        } else {
            getFavoritAllUi(matches);
        }
    });
}


export {
    getMatchAll,
    getStandings,
    getDetailMatch,
    getDetailFavorit,
    saveFavorit,
    getFavoritAll
};