import build from './app';
import dotenv from 'dotenv';

dotenv.config();

const app = build({ logger: true });

app.listen({ port: Number(process.env.PORT) || 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
