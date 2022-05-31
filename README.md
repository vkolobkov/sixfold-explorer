# sixfold-explorer

Start command - npm run start

Supported two endpoints:
- GET http://localhost:3001/routes/:fromAirportCode/:toAirportCode/ (e.g. http://localhost:3001/routes/tll/hnl/)
- POST http://localhost:3001/routes/ with json in body e.g.
{
	"from": "TLL",
	"to": "HNL"
}
