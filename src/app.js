const drivers_standings_div = document.querySelector(".driver_standings");


const getDriverStandingsData = async () => {
    const response = await fetch('./src/data/drivers_standings.json');
    if (!response.ok)
    {
        return;
    }

    const data = await response.json();;
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
                <h1>${first_name} ${last_name}</h1>
            </div>
            <div class="driver_points>
                <h1>${points}</h1>
            </div>

        `;
        driverDiv.classList.add("driver_card");
        card_color = `#${team_color}`;
        driverDiv.style.backgroundColor = card_color;
        drivers_standings_div.appendChild(driverDiv);
    }
};


const handleDriverStandings = async () => {
    const data = await getDriverStandingsData();
    displayDriverStandingsData(data);
};

handleDriverStandings();