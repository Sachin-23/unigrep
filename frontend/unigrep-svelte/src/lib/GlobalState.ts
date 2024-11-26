import { writable, type Writable } from "svelte/store";

export const searchQuery: Writable<string>             = writable("")
export const searchType: Writable<string>              = writable("filenames")
export const searchDomain: Writable<string>            = writable("local")
export const searchQueryType: Writable<string>         = writable("glob")
export const authUsername: Writable<string | null>     = writable(null)
export const authPassword: Writable<string | null>     = writable(null)
export const maxRecursionDepth: Writable<number>       = writable(5)
export const resultDisplaySet: Writable<Array<string>> = writable([])
export const resultSet: Writable<Object>               = writable({})
export const rootAddress: Writable<string>             = writable("/")
export const username: Writable<string | null>         = writable("")
export const password: Writable<string | null>         = writable("")