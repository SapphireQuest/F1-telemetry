from urllib.request import urlopen
import json
import pandas as pd

response = urlopen('https://api.openf1.org/v1/drivers?driver_number=81&session_key=11470')
data = json.loads(response.read().decode('utf-8'))
print(data)

data = data[0]
first_name = data['first_name']
print(first_name)

