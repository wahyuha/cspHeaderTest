import sirv from 'sirv';
import express from 'express';
import { json, urlencoded } from "body-parser";
import session from "express-session";
import compression from 'compression';
import * as sapper from '@sapper/server';

const app = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app.use(json({ limit: "2mb" }), urlencoded({ limit: "2mb", extended: true }));
app.use(session({
	secret: 'kocheng',
	cookie: { maxAge: 60 * 60 * 1000 },
}))
app.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => {
				return {
					sessionId: req.session.sessionId,
					customerState: req.session.customerState,
					customerNumber: req.session.customerNumber,
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
