const sendErrorResponse = (error, response, status = 400) => {
  console.log(error);
  response.status(status).send({ message: "Xatolik: ", error: error.message });
};

module.exports = { sendErrorResponse };
