type Healthcheck = {
  uptime?: number;
  responsetime?: [number, number];
  message?: string;
  timestamp?: number;
};

export default defineEventHandler((event) => {
  let healthcheck: Healthcheck = {};

  try {
    healthcheck = {
      uptime: process.uptime(),
      responsetime: process.hrtime(),
      message: `OK`,
      timestamp: Date.now(),
    };
  } catch (error) {
    if (error instanceof Error) {
      healthcheck.message = error.message;
    } else {
      healthcheck.message = `Unknown error`;
    }
    event.node.res.statusCode = 503;
  }

  return healthcheck;
});
