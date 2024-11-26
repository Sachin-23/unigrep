import { writable, type Writable } from "svelte/store";

export const searchQuery                        = writable("")
export const searchType                         = writable("filenames")
export const searchDomain                       = writable("local")
export const searchQueryType                    = writable("glob")
export const authUsername                       = writable(null)
export const authPassword                       = writable(null)
export const maxRecursionDepth                  = writable(5)
export const resultSet: Writable<Array<string>> = writable([])
export const rootAddress                        = writable("/")
export const username                           = writable("")
export const password                           = writable("")