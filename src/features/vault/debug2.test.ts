import { classify } from "./classifier";

console.log("=== Testing familia classification in detail ===");
const result1 = classify({
  name: "certidao_nascimento.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Final Result:", result1);

console.log('\n=== What "certidao_nascimento" normalizes to ===');
const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const normalized = norm("certidao_nascimento");
console.log("Normalized:", normalized);

console.log("\nJuridico regex matches:");
const juridicoRegex = [
  /\b(contrato|procuracao|testamento|diretiva|escritura|certidao)\b/,
  /\b(rg|cpf|cnh|passaporte|titulo\s*eleitor)\b/,
  /\bdoc(umento)?\s*pessoal\b/,
];
juridicoRegex.forEach((rx, i) => {
  const match = normalized.match(rx);
  if (match) {
    console.log(`  Regex ${i}: ${rx} -> ${match[0]}`);
  }
});

console.log("\nFamilia regex matches:");
const familiaRegex = [
  /\b(certidao|casamento|nascimento|obito)\b/i,
  /\b(registro\s*civil|power\s*of\s*attorney|familiar)\b/i,
];
familiaRegex.forEach((rx, i) => {
  const match = normalized.match(rx);
  if (match) {
    console.log(`  Regex ${i}: ${rx} -> ${match[0]}`);
  }
});

console.log("\nFamilia dict terms:");
const familiaTerms = [
  "certidao de casamento",
  "certidao de nascimento",
  "certidao de obito",
  "registro civil",
  "autorizacao de viagem",
  "visto familiar",
];
familiaTerms.forEach((term) => {
  if (normalized.includes(term)) {
    console.log(`  Term: "${term}" matches`);
  }
});
