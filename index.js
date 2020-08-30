require('dotenv').config();
const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function () {
	// connect to twitter via api
	const client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
	});

	// pull next tweet from spreadsheet
	const sheet = new Sheet();
	await sheet.load();
	const tweets = await sheet.getRows();
	const status = tweets[0].tweet;

	// send tweet
	client.post('statuses/update', { status }, (error, tweet, response) => {
		if (error) throw error;
		console.log(tweet);
	});

	// remove tweet from spreadsheet
	await tweets[0].delete();
	console.log('tweeted', tweets[0].tweet);
})();
