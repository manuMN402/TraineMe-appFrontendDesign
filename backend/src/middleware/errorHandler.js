export default function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Prisma unique constraint error
  if (err.code === 'P2002') {
    const target = err.meta?.target?.[0];
    return res.status(400).json({
      error: `${target || 'Field'} already exists`,
    });
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Record not found',
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
} 
