import { ResponseGlobal, ResponseGlobalCatch } from '@interfaces';

export const handlerReponse = ({
  res,
  data,
  message = 'success',
  statusCode = 200,
}: ResponseGlobal) => {
  res.status(statusCode).json({ data, message, statusCode });
};

export const handlerReponseCatch = ({
  res,
  err,
  statusCode = 400,
}: ResponseGlobalCatch) => {
  const message = err?.detail || err?.message || err || 'Bad request';
  res.status(statusCode).json({
    message,
    statusCode: err?.code | statusCode,
  });
};
