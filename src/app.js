const drivers_standings_div = document.querySelector(".driver_standings");


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
        drivers_standings_div.appendChild(driverDiv);
    }
};


const handleDriverStandings = async () => {
    const data = await getDriverStandingsData();
    displayDriverStandingsData(data);
};

handleDriverStandings();