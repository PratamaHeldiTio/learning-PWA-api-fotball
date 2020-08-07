import {
    getMatchAll,
    getStandings,
    getDetailMatch,
    getDetailFavorit,
    saveFavorit,
    getFavoritAll
} from './api.js';

import { loader, navigasi } from './display.js';
import { saveFavoritDb, deleteFavoritDb } from './db.js';

const main = () => {

    // awal daftarkan sw, notifikasi, pushSubscribe //
    if (!('serviceWorker' in navigator)) {
        alert('Service worker tidak didukung browser ini.');
    } else if (!('Notification' in window)) {
        alert('push notifikasi tidak didukung browser ini.');
    } else {
        navigator.serviceWorker.register('./sw.js');
        Notification.requestPermission()
        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(registration => {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array('BOFfvbOnYP31oWKtBlkDT5QhFjUGRvoVoh81ymmDcSiZZ3cZksO2QXfRYFhTL4ngmsqyztW-1z4cy5DuswePP8Q')
                }).then(subscribe => {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(e => {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }
    }
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    // akhir daftarkan sw, notifikasi, pushSubscribe //

    // ambil url dan split untuk cek dihalamn detail atau utama
    let page = window.location.hash.substr(1);
    let id = page.split('?')[1];
    if (!id) { loadNav(); }
    if (page === '') { page = 'match'; }
    loadPage(page);

    // action ketika diklik
    $(document).on('click', event => {
        if (event.target.classList.contains('data-favorit')) {
            const matchIdFavorit = event.target.dataset.id;
            const matchFavorit = saveFavorit(matchIdFavorit);
            matchFavorit.then(response => {
                saveFavoritDb(response);
            })
        } else if (event.target.classList.contains('data-delete')) {
            const matchIdDelete = event.target.dataset.id;
            deleteFavoritDb(matchIdDelete);
            loadPage('favorit');
        } else if (event.target.classList.contains('icon-arrow')) {
            let url = event.target.href.split('#')[1];
            loadNav();
            loadPage(url);
        } else {
            const detailId = event.target.dataset.id;
            if (detailId) {
                $('#body-content').html(loader());
                if (page === 'match') {
                    getDetailMatch(detailId);
                } else
                    getDetailFavorit(detailId);
            }
        }
    });

    // navigasi
    function loadNav() {
        const topNav = $('nav');
        topNav.html(navigasi());

        topNav.on('click', event => {
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
        });
    }

    // load halaman
    function loadPage(page) {
        if (page === 'match') {
            $('#body-content').html(loader())
            getMatchAll();
        } else if (page === 'standings') {
            $('#body-content').html(loader());
            getStandings();
        } else if (page === 'favorit') {
            $('#body-content').html(loader());
            getFavoritAll();
        } else {
            if (id) {
                id = id.split('&');
                const detailId = id[0].split('=')[1];
                const type = id[1].split('=')[1];
                $('#body-content').html(loader());
                if (type === 'match') {
                    getDetailMatch(detailId);
                } else {
                    getDetailFavorit(detailId);
                }
            }
        }
    }
}

export default main;