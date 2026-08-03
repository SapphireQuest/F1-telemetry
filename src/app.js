const driver_standings_div = document.querySelector(".driver-standings");
const team_standings_div = document.querySelector(".team-standings");

const btn_driver_standings = document.querySelector("#btn-driver-standings");
const btn_team_standings = document.querySelector("#btn-team-standings");

const getDriverStandingsData = async () => {
    const response = await fetch('./src/data/drivers_standings.json');
    if (!response.ok)
    {
        return;
    }

    const data = await response.json();
    return data;
};

const displayDriverStandingsData = (data) => {
    for (const driver of data)
    {
        const {first_name, last_name, name_acronym, number,photo_url, points, position, team_color, team_name} = driver;
        const driverDiv = document.createElement("div");
        driverDiv.innerHTML = `
            <div class="driver_name">
                <p>${position}. ${first_name} ${last_name} | ${team_name}</p>
            </div>
            <div class="points_and_photo_flexbox">    
                <div class="driver_points">
                    <p>${points}</p>
                </div>
                <div class="driver_image_div">
                    <img src="${photo_url}">
                </div>
            </div>
            `;
        driverDiv.classList.add("driver_card");
        const card_color = `#${team_color}`;
        driverDiv.style.backgroundColor = card_color;
        driver_standings_div.appendChild(driverDiv);
    }
};


const getTeamStandingsData = async () => {
    const response = await fetch('./src/data/team_standings.json');
    if (!response.ok)
    {
        return;
    }

    const data = await response.json();
    return data;
};

const displayTeamStandingsData = (data) => {
    for (const team of data)
    {
        const {name, color, position, points} = team
        const teamDiv = document.createElement("div");
        teamDiv.innerHTML = `
            <div class="team_name">
                <p>${position}. ${name}</p>
            </div>
            <div class="team_points">
                <p>${points}</p>
            </div> 
            `;
        teamDiv.classList.add("team_card");
        const card_color = `#${color}`;
        teamDiv.style.backgroundColor = card_color;
        team_standings_div.appendChild(teamDiv);
    }
};

const handleTeamStandings = async () => {
    const data = await getTeamStandingsData();
    displayTeamStandingsData(data);
};

const handleDriverStandings = async () => {
    const data = await getDriverStandingsData();
    displayDriverStandingsData(data);
};

btn_driver_standings.addEventListener('click', (event) => {
    event.preventDefault();

    team_standings_div.classList.add("hidden");
    driver_standings_div.classList.remove("hidden");

    btn_driver_standings.style.color = "Red";
    btn_team_standings.style.color = "White";
});


btn_team_standings.addEventListener('click', (event) => {
    event.preventDefault();

    team_standings_div.classList.remove("hidden");
    driver_standings_div.classList.add("hidden");

    btn_driver_standings.style.color = "White";
    btn_team_standings.style.color = "Red";
});



handleDriverStandings();
handleTeamStandings();