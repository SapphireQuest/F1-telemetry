from urllib.request import urlopen
import json
import os


def fetch_api_data(url):
    try:
        response = urlopen(url)
        data = json.loads(response.read().decode('utf-8'))
    except Exception as e: 
        print(e)
        return
    return data


def save_to_json(data, path):
    directory = os.path.dirname(path) 

    if directory: 
        os.makedirs(directory, exist_ok=True)
        
    with open(path, 'w') as f:
        json.dump(data, f)


def process_driver_standings(data_drivers, data_standings_drivers):
    drivers_dct = {}
    final_standings_list = []

    for curr_driver in data_drivers: 
        driver_info = {}
        number = curr_driver['driver_number']
        driver_info['team_name'] = curr_driver['team_name']
        driver_info['team_color'] = curr_driver['team_colour']
        driver_info['name_acronym'] = curr_driver['name_acronym']
        driver_info['first_name'] = curr_driver['first_name']
        driver_info['last_name'] = curr_driver['last_name']
        driver_info['photo_url'] = curr_driver['headshot_url']
        drivers_dct[number] = driver_info

    for driver in data_standings_drivers:
        number = driver['driver_number']
        if number in drivers_dct:
            drivers_dct[number]['number'] = number
            drivers_dct[number]['points'] = driver['points_current']
            drivers_dct[number]['position'] = driver['position_current']
            final_standings_list.append(drivers_dct[number])
    return final_standings_list
   

def drivers_standings(drivers):
    standings = fetch_api_data('https://api.openf1.org/v1/championship_drivers?session_key=latest')
    if not standings or not drivers:
        return
    final_standings_list = process_driver_standings(drivers, standings)
    save_to_json(final_standings_list, './src/data/drivers_standings.json')


def get_team_colors(drivers):
    team_color_dct = {}
    for driver in drivers:
        if driver['team_name'] not in team_color_dct:
            team_color_dct[driver['team_name']] = driver['team_colour']
    return team_color_dct

def process_team_standings(standings, team_colors):
    teams_dct = {}
    for team in standings:
        team_info = {}
        team_info['name'] = team['team_name']
        if team_info['name'] in team_colors:
            team_info['color'] = team_colors[team_info['name']]
        position = team['position_current']
        team_info['position'] = position
        team_info['points'] = team['points_current']
        teams_dct[position] = team_info
    final_team_standings = [team for _, team in sorted(teams_dct.items(), key=lambda item: item[0])]
    return final_team_standings
        



def team_standings(drivers):
    standings = fetch_api_data('https://api.openf1.org/v1/championship_teams?session_key=latest')
    team_color_dct = get_team_colors(drivers)
    final_team_standings = process_team_standings(standings, team_color_dct)
    save_to_json(final_team_standings, './src/data/team_standings.json')



if __name__ == '__main__':
    drivers = fetch_api_data('https://api.openf1.org/v1/drivers?session_key=latest')
    drivers_standings(drivers)
    team_standings(drivers)