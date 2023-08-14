const setting = {
	hostName: 'https://example.com',

	isProduction: false,

	mysql: {
        'database1': {
		    host: 'db1.server.host',
		    user: 'dbUser1',
		    password: 'dbPass1',
			database: 'DBName'
	    },
        'database2': {
		    host: 'db2.server.host',
		    user: 'dbUser2',
		    password: 'dbPass2',
			database: 'DBName'
	    }
	},

	s3: {
        accessKeyId: 's3 accessKeyId',
        secretAccessKey: 's3 secretAccessKey'
    },

	gmailSmtp: {
		user: 'user@gmail.com',
		clientId: 'google-api-clientId.apps.googleusercontent.com',
		clientSecret: 'google-api-clientSecret',
		accessToken: 'aa00.access_token',
		refreshToken: '1//refresh-token'
	},

	encrypt: {
		key: 'encryptkeyString',
	}
}

module.exports = setting;