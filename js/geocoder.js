var data = d3.csv('input/schools.csv',function(data){

		var test = data.slice(0,10);
		//test with first 10 data points to make sure it's working
		test.forEach(function(d, i){
			
			var search = d.streetaddress + ' Chicago, IL';
			d.search = search; 
			
			setTimeout(function(){
				//replace xxxxxxx with unique API key from https://mapzen.com
				var url = "https://search.mapzen.com/v1/search?text=" + search + "&api_key=mapzen-xxxxxxx"; 
				d3.json(url, function(err, geo){
					console.log("GEO", d, geo)
					d.geo = geo;
					
					render(test);
				})
			//set a time increment to manage API rate limit			
			}, i * 200)
			
			
		})
		
	});	
	
d3.select('#output').append('div').classed('header',true)
	.text('address,long,lat \n');	
	
function render(test){
		var rows = d3.select('#output').selectAll('div.row')
			.data(test)
		rows.enter().append('div').classed('row',true)
			.on('click',function(d){
			;})
		rows.text(function(d){return '"'+d.search+'"'+','+ d.geo.bbox[0]+','+d.geo.bbox[1];})
	
	}
/*
h/t to Ian Johnson for the tutorial (https://www.youtube.com/watch?v=XmwiZSopYQs)
*/