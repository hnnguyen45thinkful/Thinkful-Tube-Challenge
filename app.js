$(document).ready(function(){

//Create a variable nextPage to turn and see more video in the results.
var nextPage; //nextPage = results.nextPageToken; calling this in the .$ajax({ .... })

	function showResults(videos){
		var html = "";
		//console.log(videos);
		$.each(videos.items, function(index, video){
			//console.log(video);
			html = html + "<li><p>" + video.snippet.title + "<p><a target='_blank' href='https://www.youtube.com/watch?v=" + video.id.videoId + "'><img src='" 
			+ video.snippet.thumbnails.medium.url + "'/></a></p></li>";
		});
		$("#search-results ul").html(html);
	}
//Using the API key - Task
//Build the YouTube search app described above. Sketch exactly what you want to build, and try describing in English each feature you'd like to build. 
//It should be similar to the OMDB app you made in the earlier assignment. The key differences are the endpoint URLs and the parameters that you send. 
//The endpoint is "https://www.googleapis.com/youtube/v3/search"
//You will need to pass the following in the params object:
//part: 'snippet'
//key: (your API key as a string)
//q: (your search term as a string)
	function getResults(query){
		var request = {
				part: "snippet", //
				key: "AIzaSyDLvebM_BupT1Y5KQW1NOc_SjtFejbuMGI",//my API key generated for my computer
				q: query,// 
			};
			//Move to to the next page and add condition with more information on video searches.
			if (nextPage){
				request.pageToken = nextPage
			}
		$.ajax({ //Similar to the Lesson 1 format using the ajax instead of .getJSON.
			url: "https://www.googleapis.com/youtube/v3/search", // endpoints of the URL and using the AJAX request.
			method: "GET", 
			dataType: 'json',
			data: request
		}).done(function(results){
			nextPage = results.nextPageToken; //Move the pages with more videos stack together.
				showResults(results);//Showing the results.
			})
		
	}
	//Submitting the terms with the query tage and getting the result and shows
	$('#search-term').submit(function (event){
		event.preventDefault();
		var searchTerm = $('#query').val();
		getResults(searchTerm);
		$('.more').show();
	});
	//Same from above but to show more results by clicking on the page more
	$('.more').click(function(event){
		event.preventDefault();
		var searchTerm = $('#query').val();
		getResults(searchTerm);
	})
})


