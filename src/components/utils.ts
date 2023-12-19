import React from "react";
export function capitalize(str: any) {
  // Verifica se str é uma string não nula ou indefinida
  if (typeof str !== "string" || str.length === 0) {
    return str; // Retorna a string original se não for uma string válida
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
