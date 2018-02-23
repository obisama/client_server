 
var request = require('request')
, JSONStream = require('JSONStream')
, es = require('event-stream')

request({url: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-en-france&sort=-dep&facet=codeinsee&facet=organisme&facet=lumiere&facet=agglomeration&facet=intersection&facet=condition_atmospherique&facet=type_de_collision&facet=categorie_de_route&facet=regime_de_circulation&facet=voie_speciale&facet=profil_en_long&facet=trace_en_plan&facet=situation_de_l_accident&facet=departement&facet=coord&facet=grav'})
.pipe(JSONStream.parse('records.*'))
.pipe(es.mapSync(function (data) {
  console.error(data)
  return data
}))

