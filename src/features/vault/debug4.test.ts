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

console.log("\nPrevidencia regex matches:");
const previdenciaRegex = [
  /\b(previdencia|pgbl|pgbil|vbgf|reserva\s*matematica)\b/i,
  /\b(beneficio\s*previdenciario|contribuicao\s*previdenciaria)\b/i,
];
previdenciaRegex.forEach((rx, i) => {
  const match = normalized.match(rx);
  if (match) {
    console.log(`  Regex ${i}: ${rx} -> ${match[0]}`);
  } else {
    console.log(`  Regex ${i}: ${rx} -> NO MATCH`);
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
  } else {
    console.log(`  Term: "${term}" -> NO MATCH`);
  }
});

// Let's also test with a term that should match
console.log('\n=== Testing with "previdencia social" ===');
const result2 = classify({
  name: "previdencia_social.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Result:", result2);
