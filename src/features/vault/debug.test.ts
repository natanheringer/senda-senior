import { classify } from "./classifier";

console.log("Testing familia classification:");
const result1 = classify({
  name: "certidao_nascimento.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Result:", result1);

console.log("\nTesting previdencia classification:");
const result2 = classify({
  name: "extrato_inss_beneficio.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Result:", result2);

console.log('\nTesting what "certidao_nascimento" normalizes to:');
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
console.log("Normalized:", normalize("certidao_nascimento"));

console.log('\nTesting what "extrato_inss_beneficio" normalizes to:');
console.log("Normalized:", normalize("extrato_inss_beneficio"));
