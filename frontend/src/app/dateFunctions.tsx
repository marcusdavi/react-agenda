export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2,"0");
  const day = date.getDate().toString().padStart(2,"0");
  return `${year}-${month}-${day}`;
}

export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split("-");
  return `${MONTHS[+month - 1]} de ${year}`;
}

export function addMonths(isoMonth: string, increment:number) {
  const jsDate = new Date(isoMonth + "-01T12:00:00");
  jsDate.setMonth(jsDate.getMonth()+ increment);
  const year = jsDate.getFullYear()
  const month = (jsDate.getMonth()+1).toString().padStart(2, "0");
  return `${year}-${month}`;
}
