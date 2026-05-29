//  # Camada de Integração Externa (fetch nativo). Retorna Promises tipadas com Interfaces.
import type { PokemonApiResponse, PokemonResumo } from "../models/pokemon.ts";

export async function buscarPokemon(
  nomeOuId: string,
): Promise<PokemonResumo | null> {
  const parametrolimpo = nomeOuId.toLocaleLowerCase().trim();
  const url = `https://pokeapi.co/api/v2/pokemon/${parametrolimpo}`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      console.log("[ERRO] Pokémon não encontrado.");
      return null;
    }
    const dados: PokemonApiResponse = await resposta.json();

    const listaTipos = dados.types.map((item) => item.type.name);

    return {
      id: dados.id,
      name: dados.name,
      tipos: listaTipos,
      altura: dados.height,
      peso: dados.weight,
    };
  } catch (erro) {
    console.log("[ERRO] Não foi possível buscar o Pokémon.");
    return null;
  }
}
