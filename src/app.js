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
    console.log(data);
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

const handleDriverStandings = async () => {
    const data = await getDriverStandingsData();
    displayDriverStandingsData(data);
    ScrollReveal().reveal('.driver_card');
};

btn_driver_standings.addEventListener('click', (event) => {
    event.preventDefault();

    team_standings_div.classList.add("hidden");
    driver_standings_div.classList.remove("hidden");
});


btn_team_standings.addEventListener('click', (event) => {
    event.preventDefault();

    team_standings_div.classList.remove("hidden");
    driver_standings_div.classList.add("hidden");
});



handleDriverStandings();