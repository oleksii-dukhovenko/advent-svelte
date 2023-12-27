import type { ResponseData } from './types';

export async function fetchElfPosts(): Promise<ResponseData> {
  const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-twenty-three.json');
  if (!response.ok) {
    throw new Error('Failed to fetch ElfNet posts');
  }
  return response.json() as Promise<ResponseData>;
}
