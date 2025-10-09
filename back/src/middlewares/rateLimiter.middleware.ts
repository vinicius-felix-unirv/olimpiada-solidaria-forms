import rateLimit from 'express-rate-limit';

export const createRateLimiter = (windowMs: number = 15 * 60 * 1000, max: number = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: 'Muitas requisições realizadas, tente novamente mais tarde',
      error: 'Rate limit exceeded'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Muitas requisições realizadas, tente novamente mais tarde',
        error: 'Rate limit exceeded'
      });
    }
  });
};

// Rate limiters específicos
export const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutos
  100 // 100 requests por IP
);

export const createLimiter = createRateLimiter(
  60 * 1000, // 1 minuto
  10 // 10 criações por minuto
);

export const deleteLimiter = createRateLimiter(
  60 * 1000, // 1 minuto
  5 // 5 deleções por minuto
);
