import sirv from 'sirv';
import express from 'express';
import { json, urlencoded } from "body-parser";
import compression from 'compression';
import * as sapper from '@sapper/server';

const app = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app.use(json({ limit: "2mb" }), urlencoded({ limit: "2mb", extended: true }));

app.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
