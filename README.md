# Weather app

Basic console app for searching weather info, based on a place name (city, town, country, postcode).

## Usage: 

~~~node
node index.js
~~~

or

~~~node
npm start
~~~

### Options

1. _Search_: Performs a single search based on a place name, and shows results, e.g.: Searching for _Medellín_:

~~~
City info:

City: Medellín, Antioquia, Colombia
Lat: 6.24475
Lng: -75.57483
Temp: 18.69
Desc: scattered clouds
Min: 18.07
Max: 19.13 
~~~

2. _History_: Shows last 5 (no duplicated) searches.

## Configuration

`.env` file is required on root directory, to effectively perform requests on [OpenWeather](https://openweathermap.org/) and [mapbox](https://www.mapbox.com/)

~~~properties
MAPBOX_TOKEN=here_your_mapbox_token
OPENWEATHER_KEY=here_your_openweather_key
~~~
