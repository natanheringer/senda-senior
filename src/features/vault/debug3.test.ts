import { classify } from "./classifier";

console.log("=== Testing previdencia classification in detail ===");
const result1 = classify({
  name: "extrato_inss_beneficio.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Final Result:", result1);

console.log('\n=== What "extrato_inss_beneficio" normalizes to ===');
const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const normalized = norm("extrato_inss_beneficio");
console.log("Normalized:", normalized);

console.log("\nFinanceiro regex matches:");
const financeiroRegex = [
  /\b(fatura|boleto|extrato|imposto|irpf|darf|nota\s*fiscal|nfe|nfse|nfs-?e)\b/,
  /\b(recibo|comprovante|pagamento|transferencia|pix|ted|doc)\b/,
  /\bir\s*\d{2,4}\b/,
];
financeiroRegex.forEach((rx, i) => {
  const match = normalized.match(rx);
  if (match) {
    console.log(`  Regex ${i}: ${rx} -> ${match[0]}`);
  }
});

console.log("\nTrabalho regex matches:");
const trabalhoRegex = [
  /\b(holerite|contracheque|folha\s*de\s*pagamento|admissao|demissao)\b/,
  /\b(ctps|pis|fgts|inss|rescisao|asu|acordo\s*coletivo)\b/,
  /\bcontrato\s*de\s*trabalho\b/,
];
trabalhoRegex.forEach((rx, i) => {
  const match = normalized.match(rx);
  if (match) {
    console.log(`  Regex ${i}: ${rx} -> ${match[0]}`);
  }
});

console.log("\nSeguros dict terms:");
const segurosTerms = [
  "seguro de vida",
  "seguro saude",
  "seguro residencial",
  "seguro veiculo",
  "inss",
  "previdencia complementar",
];
segurosTerms.forEach((term) => {
  if (normalized.includes(term)) {
    console.log(`  Term: "${term}" matches`);
  }
});

console.log("\nPrevidencia regex matches:");
const previdenciaRegex = [
  /\b(previdencia|pgbl|pgbil|vbgf|reserva\s*matematica)\b/i,
  /\b(beneficio\s*previdenciario|contribuicao\s*previdenciaria)\b/i,
];
previdenciaRegex.forEach((rx, i) => {
  const match = normalized.match(rx);
  if (match) {
    console.log(`  Regex ${i}: ${rx} -> ${match[0]}`);
  }
});

console.log("\nPrevidencia dict terms:");
const previdenciaTerms = [
  "previdencia social",
  "previdencia complementar",
  "fgts",
  "fundo de pensao",
  "risco",
  "sobrevivencia",
];
previdenciaTerms.forEach((term) => {
  if (normalized.includes(term)) {
    console.log(`  Term: "${term}" matches`);
  }
});
