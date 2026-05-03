import { classify } from "./classifier";

console.log('=== Testing previdencia with "extrato_inss_beneficio.pdf" ===');
const result = classify({
  name: "extrato_inss_beneficio.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Result:", result);

console.log('\n=== Testing previdencia with "previdencia_social.pdf" ===');
const result2 = classify({
  name: "previdencia_social.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Result:", result2);

console.log(
  '\n=== Testing previdencia with "beneficio_previdenciario.pdf" ===',
);
const result3 = classify({
  name: "beneficio_previdenciario.pdf",
  mime: "application/pdf",
  size: 1024,
});
console.log("Result:", result3);
