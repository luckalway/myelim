var path = require('path');

exports.resizeVersion = {
    default: {
        thumbnail:{
            width:80
        },
        smaller:{
        	 width:160
        },
        small: {
            width:280
        },
        medium:{
            width:410
        },
        large: {
            width: 800
        }
    }
};

exports.directors = {
    temp: './tmp',

    default: '/public/uploads/default',
    default_url: '/uploads/default',

    location: '/public/uploads/location',
    location_url: '/uploads/location',
    
    upload_image: __dirname + '/public/data',
    upload_image_url: '/data'
};

exports.image = {
		getImageLocalPath:function(url){
			var localPath = path.join(__dirname,'public',url);
			return localPath;
		},
		getOriginImageLocalPath:function(url){
			var localPath = this.getImageLocalPath(url);
			return localPath.replace(/_(thumbnail|smaller|small|medium|large)\.jpg$/,'');
		}
}
