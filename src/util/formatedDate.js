function formatDate(date) {
  const [year, month, day] = date.split("-");

  const localDate = new Date(year, month - 1, day);

  const options = { year: "numeric", month: "long", day: "numeric" };
  return localDate.toLocaleDateString("pt-BR", options);
}
