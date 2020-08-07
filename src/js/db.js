import idb from 'idb';

const dbPromise = idb.open('serieA', 1, upgradeDb => {
    upgradeDb.createObjectStore('matches', { autoIncrement: false });
});

function saveFavoritDb(data) {
    dbPromise.then(db => {
        const tx = db.transaction('matches', 'readwrite');
        const store = tx.objectStore('matches');
        store.add(data, data.match.id);
        return tx.complete;
    }).then(() => {
        M.toast({ html: 'Pertandingan berhasil difavoritkan', classes: 'rounded' });
    }).catch((e) => {
        M.toast({ html: 'Pertandingan ini sudah terdapat pada halaman favorit', classes: 'rounded' });
    });
}

function getFavoritAllDb() {
    return new Promise((resolve, reject) => {
        dbPromise.then(db => {
            const tx = db.transaction('matches', 'readonly');
            const store = tx.objectStore('matches');
            return store.getAll();
        }).then(matches => {
            resolve(matches);
        });
    });
}

function updateDbFavorit() {
    getFavoritAllDb().then(matches => {
        matches.forEach(match => {
            $.ajax({
                mode: 'no-cors',
                headers: {
                    'X-Auth-Token': '59caa191a2454611837e2ab0ffd66bb6'
                },
                type: "GET",
                url: `https://api.football-data.org/v2/matches/${match.match.id}`,
                dataType: "json"
            }).done(response => {
                dbPromise.then(db => {
                    const tx = db.transaction('matches', 'readwrite');
                    const store = tx.objectStore('matches');
                    store.put(response, response.match.id);
                    return tx.complete;
                });
            });
        });
    });
}

function deleteFavoritDb(id) {
    dbPromise.then(db => {
        const tx = db.transaction('matches', 'readwrite');
        const store = tx.objectStore('matches');
        store.delete(parseInt(id));
        tx.complete;
    }).then(() => {
        M.toast({ html: 'Pertandingan berhasil dihapus', classes: 'rounded' });
    });
}

function getDetailFavoritDb(id) {
    return new Promise((resolve, reject) => {
        dbPromise.then(db => {
            const tx = db.transaction('matches', 'readonly');
            const store = tx.objectStore('matches');
            return store.get(parseInt(id));
        }).then(matches => {
            resolve(matches);
        });
    });
}

export {
    updateDbFavorit,
    getFavoritAllDb,
    saveFavoritDb,
    deleteFavoritDb,
    getDetailFavoritDb
};