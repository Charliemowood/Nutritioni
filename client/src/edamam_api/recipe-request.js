var RecipeRequest = function() {
	this.url = 'https://api.edamam.com/api/nutrition-details?app_id=3e9c23fc&app_key=b933c7dff6662a955efd389261d28d44'
}

RecipeRequest.prototype = {
	makePostRequest: function(recipeData) {
		var jsonString = JSON.stringify(recipeData);
		console.log(jsonString);
		var request = this.request = new XMLHttpRequest();
		request.open('POST', this.url);
		request.setRequestHeader('Content-Type', 'application/json');
		request.addEventListener('load', this.handleResponse.bind(this));
		request.send(jsonString);
	},
	handleResponse: function() {
		if (this.request.status !== 200) return;
		var jsonResponse = this.request.responseText;
		var responseData = JSON.parse(jsonResponse);
		console.log(responseData);
	}
}

module.exports = RecipeRequest;