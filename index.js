var osmosis = require('osmosis');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var tokml = require('tokml');

osmosis.config('user_agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')

var output = {
    'type': 'FeatureCollection',
    'features': []
};

osmosis.parse(fs.readFileSync('GoogleBookmarks.html'))
    .find('a')
    .set('name')
    .follow('@href')
    .find('meta@content')
    .set('meta')
    .then((context, data, next) => {
        if (data.meta.indexOf('maps.google.com') !== -1) {
            var parsedQuery = querystring.parse(url.parse(data.meta).query);
            if (parsedQuery.markers) {
                coordinates = parsedQuery.markers.split(',');
            }
            else if (parsedQuery.center) {
                coordinates = parsedQuery.center.split(',');
            }
            data.latitude = coordinates[0];
            data.longitude = coordinates[1];
            delete data.meta;
            next(context, data);
        }
    })
    .data(function (result) {
        console.log(result);
        output.features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [result.longitude, result.latitude]
            },
            "properties": {
                "name": result.name
            }
        });

        //TODO: Remove that hach and make the method done() below work.
        if (fs.existsSync("GoogleBookmarks.kml")) {
            fs.unlinkSync("GoogleBookmarks.kml");
        }
        fs.writeFileSync("GoogleBookmarks.kml", tokml(output));
    })
    .log(console.log)
    .error(console.log)
    .done(() => {
        if (fs.existsSync("GoogleBookmarks.kml")) {
            fs.unlinkSync("GoogleBookmarks.kml");
        }
        fs.writeFileSync("GoogleBookmarks.kml", tokml(output));
    });
