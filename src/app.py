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
   

def drivers_standings():
    standings = fetch_api_data('https://api.openf1.org/v1/championship_drivers?session_key=latest')
    drivers = fetch_api_data('https://api.openf1.org/v1/drivers?session_key=latest')
    if not standings or not drivers:
        return
    final_standings_list = process_driver_standings(drivers, standings)
    save_to_json(final_standings_list, './src/data/drivers_standings.json')


if __name__ == '__main__':
    drivers_standings()