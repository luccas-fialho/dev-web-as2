function formatDate(date) {
  // transform the received date into pt-BR format
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("pt-BR", options);
}

export default formatDate;
