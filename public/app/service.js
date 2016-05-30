app.factory('soldCasesFactory', function($resource) {
	return $resource('/api/sold-cases', {}, {
		query : { method : 'GET', isArray : true },
		create : { method : 'POST' }
	})
});


app.factory('soldCaseFactory', function($resource) {
	return $resource('/api/sold-cases/:id', {}, { 
		get: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        remove: { method: 'DELETE', params: {id: '@id'} }
	})
});