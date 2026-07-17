export const ENDPOINTS = {
  pokemon: {
    list: (limit: number, offset: number) =>
      `/pokemon?limit=${limit}&offset=${offset}`,
    byId: (id: string | number) => `/pokemon/${id}`,
  },
}
