function getDetailUi(response) {
    if (response.match.score.fullTime.homeTeam === null) { response.match.score.fullTime.homeTeam = '-' }
    if (response.match.score.fullTime.awayTeam === null) { response.match.score.fullTime.awayTeam = '-' }
    if (response.match.score.halfTime.homeTeam === null) { response.match.score.halfTime.homeTeam = '-' }
    if (response.match.score.halfTime.awayTeam === null) { response.match.score.halfTime.awayTeam = '-' }
    if (response.match.score.extraTime.homeTeam === null) { response.match.score.extraTime.homeTeam = '-' }
    if (response.match.score.extraTime.awayTeam === null) { response.match.score.extraTime.awayTeam = '-' }
    if (response.match.score.penalties.homeTeam === null) { response.match.score.penalties.homeTeam = '-' }
    if (response.match.score.penalties.awayTeam === null) { response.match.score.penalties.awayTeam = '-' }

    const arrayDay = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', "Min"];
    const time = new Date(response.match.utcDate);
    const date = `${arrayDay[time.getDay()]}, ${time.getDate()}/${time.getMonth()}`;
    const detailHtml = `
    <div class="row" id="body-content">
    <div class="row">
        <div class="col s12">
            <div class="card card-detail">
                <div class="card-content row">
                    <div class="row heading">
                        <div class="col s5">
                            <h6>${date}</h6>
                        </div>
                    </div>
                    <div class="row result center-align">
                        <div class="col s4">
                            <img src="/src/assets/logos/${response.match.homeTeam.name}.webp" alt="${response.match.homeTeam.name}">
                        </div>
                        <div class="col s1">
                            <h4>${response.match.score.fullTime.homeTeam}</h4>
                        </div>
                        <div class="col s2">
                            <h4>-</h4>
                        </div>
                        <div class="col s1">
                            <h4>${response.match.score.fullTime.awayTeam}</h4>
                        </div>
                        <div class="col s4">
                            <img src="/src/assets/logos/${response.match.awayTeam.name}.webp" alt="${response.match.awayTeam.name}">
                        </div>
                    </div>
                    <div class="row grey lighten-3 sub-title">
                        <div class="col s12">
                            <h6>Head to Head</h6>
                        </div>
                    </div>
                    <div class="row sub-title-stat">
                        <table>
                            <tbody>
                                <tr>
                                    <td>${response.match.homeTeam.name}</td>
                                    <td>Team</td>
                                    <td>${response.match.awayTeam.name}</td>
                                </tr>
                                <tr>
                                    <td>${response.head2head.numberOfMatches}</td>
                                    <td>Matches</td>
                                    <td>${response.head2head.numberOfMatches}</td>
                                </tr>
                                <tr>
                                    <td>${response.head2head.homeTeam.wins}</td>
                                    <td>Win</td>
                                    <td>${response.head2head.awayTeam.wins}</td>
                                </tr>
                                <tr>
                                    <td>${response.head2head.homeTeam.draws}</td>
                                    <td>Draw</td>
                                    <td>${response.head2head.awayTeam.draws}</td>
                                </tr>
                                <tr>
                                    <td>${response.head2head.homeTeam.losses}</td>
                                    <td>Lost</td>
                                    <td>${response.head2head.awayTeam.losses}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row grey lighten-3 sub-title">
                        <div class="col s12">
                                <h6>Statistik Match</h6>
                        </div>
                    </div>
                    <div class="row sub-title-stat">
                        <table>
                                <tbody>
                                    <tr>
                                        <td>${response.match.homeTeam.name}</td>
                                        <td>Team</td>
                                        <td>${response.match.awayTeam.name}</td>
                                    </tr>
                                    <tr>
                                        <td>${response.match.score.fullTime.homeTeam}</td>
                                        <td>Full Time</td>
                                        <td>${response.match.score.fullTime.awayTeam}</td>
                                    </tr>
                                    <tr>
                                        <td>${response.match.score.halfTime.homeTeam}</td>
                                        <td>Half Time</td>
                                        <td>${response.match.score.halfTime.awayTeam}</td>
                                    </tr>
                                    <tr>
                                        <td>${response.match.score.extraTime.homeTeam}</td>
                                        <td>Extra Time</td>
                                        <td>${response.match.score.extraTime.awayTeam}</td>
                                    </tr>
                                    <tr>
                                        <td>${response.match.score.penalties.homeTeam}</td>
                                        <td>Penalties</td>
                                        <td>${response.match.score.penalties.awayTeam}</td>
                                    </tr>
                                
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    `;
    return detailHtml;
}

function getFavoritAllUi(matches) {
    let matchHtml = '';
    matches.forEach(match => {
        let scoreHome = match.match.score.fullTime.homeTeam;
        let scoreAway = match.match.score.fullTime.awayTeam;
        let arrayDay = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        let time = new Date(match.match.utcDate);
        let kickOff = `${arrayDay[time.getDay()]}, ${time.getDate()}/${time.getMonth()} <br> ${time.getHours()}:${time.getMinutes()}`;
        if (scoreHome === null) { scoreHome = '' }
        if (scoreAway === null) { scoreAway = '' }
        matchHtml +=
            `<div class="col s12 l6 match">
                <div class="btn-floating btn-large waves-effect waves-light indigo darken-3 btn-delete" >
                    <i class="material-icons data-delete" data-id=${match.match.id}>delete</i>
                </div>
                <a href="#detail?id=${match.match.id}&type=favorit" data-id=${match.match.id}>
                    <div class="card card-match" data-id=${match.match.id}>
                        <div class="row" data-id=${match.match.id}>
                            <div class="card-image img-home col s2" data-id=${match.match.id}>
                                <img src="/src/assets/logos/${match.match.homeTeam.name}.webp" alt="${match.match.homeTeam.name}" data-id=${match.match.id}>
                            </div>
                            <div class="card-content col s6 l7 row" data-id=${match.match.id}>
                                <div class="col s10">
                                    <p data-id=${match.match.id}>${match.match.homeTeam.name}</p>
                                </div>
                                <div class="col s2 left-align">
                                    <p data-id=${match.match.id}>${scoreHome}</p>
                                </div>
                            </div>
                        </div>
                        <div class="row" data-id=${match.match.id}>
                            <div class="card-image col s2">
                                <img src="/src/assets/logos/${match.match.awayTeam.name}.webp" alt="${match.match.awayTeam.name}"  data-id=${match.match.id}>
                            </div>
                            <div class="card-content col s6 l7 row" data-id=${match.match.id}>
                                <div class="col s10">
                                    <p data-id=${match.match.id}>${match.match.awayTeam.name}</p>
                                </div>
                                <div class="col s2 left-align">
                                    <p data-id=${match.match.id}>${scoreAway}</p>
                                </div>
                                </div>
                                <div class="col s4 l3 center-align kick-off">
                                    <span data-id=${match.match.id}>${kickOff}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`;
    })

    $('#body-content').html(matchHtml);
}

function navbarDetailMatch() {
    return `
    <nav class="indigo darken-4">
        <div class="nav-wrapper detail row">
            <div class="col s2 m1">
            <i class="material-icons"><a href="#match" class="icon-arrow">arrow_back</a></i>
            </div>
            <div class="col s10 m11">
                <h5 class="title">Detail Match</h5>
            </div>
        </div>
    </nav>`;
}

function navbarDetailFavorit() {
    return `
    <nav class="indigo darken-4">
        <div class="nav-wrapper detail row">
            <div class="col s2 m1">
            <i class="material-icons"><a href="#favorit" class="icon-arrow">arrow_back</a></i>
            </div>
            <div class="col s10 m11">
                <h5 class="title">Detail Match</h5>
            </div>
        </div>
    </nav>`;
}

function getMatchAllUi(response) {
    const matches = response.matches.slice((response.matches[0].season.currentMatchday * 10) - 30, (response.matches[0].season.currentMatchday * 10) + 30);

    let matchHtml = '';
    matches.forEach(match => {
        let scoreHome = match.score.fullTime.homeTeam;
        let scoreAway = match.score.fullTime.awayTeam;
        let arrayDay = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        let time = new Date(match.utcDate);
        let kickOff = `${arrayDay[time.getDay()]}, ${time.getDate()}/${time.getMonth()} <br> ${time.getHours()}:${time.getMinutes()}`;
        if (scoreHome === null) { scoreHome = '' }
        if (scoreAway === null) { scoreAway = '' }
        matchHtml +=
            `<div class="col s12 l6 match">
                <div class="btn-floating btn-large waves-effect waves-light indigo darken-3 btn-favorit" >
                    <i class="material-icons data-favorit" data-id=${match.id}>favorite</i>
                </div>
                <a href="#detail?id=${match.id}&type=match" data-id=${match.id}>
                    <div class="card card-match" data-id=${match.id}>
                        <div class="row" data-id=${match.id}>
                            <div class="card-image img-home col s2" data-id=${match.id}>
                                <img src="/src/assets/logos/${match.homeTeam.name}.webp" alt="${match.homeTeam.name}" data-id=${match.id}>
                            </div>
                            <div class="card-content col s6 l7 row" data-id=${match.id}>
                                <div class="col s10">
                                    <p data-id=${match.id}>${match.homeTeam.name}</p>
                                </div>
                                <div class="col s2 left-align">
                                    <p data-id=${match.id}>${scoreHome}</p>
                                </div>
                            </div>
                        </div>
                        <div class="row" data-id=${match.id}>
                            <div class="card-image col s2">
                                <img src="/src/assets/logos/${match.awayTeam.name}.webp" alt="${match.awayTeam.name}"  data-id=${match.id}>
                            </div>
                            <div class="card-content col s6 l7 row" data-id=${match.id}>
                                <div class="col s10">
                                    <p data-id=${match.id}>${match.awayTeam.name}</p>
                                </div>
                                <div class="col s2 left-align">
                                    <p data-id=${match.id}>${scoreAway}</p>
                                </div>
                                </div>
                                <div class="col s4 l3 center-align kick-off">
                                    <span data-id=${match.id}>${kickOff}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`;
    })

    $('#body-content').html(matchHtml);
}

function getStandingsUi(response) {
    const startSeason = new Date(response.season.startDate).getFullYear();
    const endSeason = new Date(response.season.endDate).getFullYear();
    const standings = response.standings[0].table;

    let standingsHtml = `
        <div class="card">
        <div class="season grey lighten-4">
                <h6>Season</h6>
                <h5>${startSeason}-${endSeason}</h5>
        </div>
        <table class="highlight responsive-table">
            <thead>
                <tr>
                    <th class="poin">Pos</th>
                    <th>Club</th>
                    <th class="poin">MP</th>
                    <th class="poin">W</th>
                    <th class="poin">D</th>
                    <th class="poin">L</th>
                    <th class="poin">GF</th>
                    <th class="poin">GA</th>
                    <th class="poin">GD</th>
                    <th class="poin">Pts</th>
                </tr>
            </thead>
        <tbody>
        `;
    standings.forEach(standing => {
        standingsHtml += `
                        <tr>
                            <td class="poin">${standing.position}</td>
                            <td>
                                <li><img src="/src/assets/logos/${standing.team.name}.webp" alt="${standing.team.name}"></li>
                                <li class="alpha">${standing.team.name}</li>
                            </td>
                            <td class="poin">${standing.playedGames}</td>
                            <td class="poin">${standing.won}</td>
                            <td class="poin">${standing.draw}</td>
                            <td class="poin">${standing.lost}</td>
                            <td class="poin">${standing.goalsFor}</td>
                            <td class="poin">${standing.goalsAgainst}</td>
                            <td class="poin">${standing.goalDifference}</td>
                            <td class="poin">${standing.points}</td>
                        </tr>
            `;
    })
    standingsHtml += `
            </tbody>
        </table>
        </div>
        `;
    $('#body-content').html(standingsHtml);
}

function loader() {
    return `
        <div class="col s12 center-align">
            <div class="preloader-wrapper medium active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>

                <div class="spinner-layer spinner-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>

                <div class="spinner-layer spinner-yellow">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>

                <div class="spinner-layer spinner-green">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>`;
}

function navigasi() {
    return `
    <div class="nav-wrapper center-align">
        <div class="row">
            <div class="offset-s1 col s2"><img src="/src/assets/serie a.webp" alt="logo serie a"></div>
            <div class="offset-s6 col s2"><img src="/src/assets/italia.webp" alt="logo italia"></div>
        </div>
        <div class="row indigo darken-4 pages">
            <div class="offset-s1 col s10">
                <ul class="top-nav">
                <li class="col s4 waves-effect"><a class="active white-text" href="#match">Match</a></li>
                <li class="col s4 waves-effect"><a class="white-text" href="#standings">Standings</a></li>
                <li class="col s4 waves-effect"><a class="white-text" href="#favorit">Favorit</a></li>
                </ul>
            </div>
        </div>
    </div>`;
}


export {
    getDetailUi,
    getFavoritAllUi,
    navbarDetailMatch,
    navbarDetailFavorit,
    getMatchAllUi,
    getStandingsUi,
    loader,
    navigasi
};