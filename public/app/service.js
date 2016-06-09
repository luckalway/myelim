app.factory('soldCasesFactory', function($resource) {
	return $resource('/api/sold-cases?limit=:limit', {}, {
		query : {
			method : 'GET',
			params : {
				limit : '@limit'
			},
			isArray : true
		},
		create : {
			method : 'POST'
		}
	})
});

app.factory('soldCasesFolderFactory', function($resource) {
	return $resource('/api/sold-cases/folder', {}, {
		query : {
			method : 'GET',
			isArray : true
		}
	})
});

app.factory('soldCaseFactory', function($resource) {
	return $resource('/api/sold-cases/:id', {}, {
		get : {
			method : 'GET',
			params : {
				id : '@id'
			}
		},
		update : {
			method : 'PUT',
			params : {
				id : '@id'
			}
		},
		remove : {
			method : 'DELETE',
			params : {
				id : '@id'
			}
		}
	})
});