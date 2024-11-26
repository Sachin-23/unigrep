<script module>
  export let displayed: boolean = true
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    resultSet,
    searchQuery,
    searchDomain,
    searchType,
    searchQueryType,
    rootAddress,
    username,
    password } from "../lib/GlobalState"

  import { writable, type Writable } from "svelte/store";
  const ipAddr = "localhost"
  const clientPort = "8000"
  let { displayed } = $props()
  let paths: Array<string> = $state(["/"])
  let results: Array<string> = $state([])
  let errorMessage = writable("")

  const insertPath = () => {
    paths.push("")
    paths = paths
  }

  const removePathIndex = (index: number) => {
    paths.splice(index, 1)
  }

  const clearPaths = () => {
    paths = [""]
  }

  const extractResults = (data: any) => {
     console.log(data)
      console.log(data.path)
    for (let val of Object.keys(data.path)) {
      console.log(data.path[val])
      $resultSet.push(data.path[val])
    }
    $resultSet = $resultSet
  }

  const startSearch = () => {
    $errorMessage = `Please Wait...`
    fetch(`http://${ipAddr}:${clientPort}/api/search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "search_type":       $searchType,
        "search_domain":     $searchDomain,
        "search_locations":  paths,
        "search_query":      searchQuery,
        "search_query_type": $searchQueryType,
        "root_address":      $rootAddress,
        "recursion_depth":   5,
        "auth_username":     null,
        "auth_password":     null
      })
    })
    .then(resp => { console.log(resp); return resp.json(); }, reason => $errorMessage = `${reason}`)
    .then(value => {
      extractResults(value);
      $errorMessage = "";
    }, reason => $errorMessage = `${reason}`)
  }


</script>
<div>
    DEBUG: {`${$searchType} ${$searchDomain} ${$searchQueryType}`}
</div>
<div class="filter-body" style:display={displayed ? "block" : "none"} >
  <div class="caption">Filter Query</div>
  <div class="filter-bar" contenteditable="true" bind:textContent={$searchQuery}>My Doc:*</div>
  <div class="button-bar-set">
    <div class="button-bar darkgreen">
      <input type="radio" name="search_type" id="filenames" value="filenames" bind:group={$searchType}>
      <label class="button" for="filenames">File Names</label>
      <input type="radio" name="search_type" id="filecontents" value="filecontents" bind:group={$searchType}>
      <label class="button" for="filecontents">File Contents</label>
    </div>

    <div class="button-bar">
      <input type="radio" name="search_domain" id="local" value="local" bind:group={$searchDomain}>
      <label class="button" for="local">Local</label>
      <input type="radio" name="search_domain" id="ftp" value="ftp" bind:group={$searchDomain}>
      <label class="button" for="ftp">ftp</label>
      <input type="radio" name="search_domain" id="ssh" value="ssh" bind:group={$searchDomain}>
      <label class="button" for="ssh">SSH/SFTP</label>
    </div>

    <div class="spacer"> </div>

    <div class="button-bar darkblue">
      <input type="radio" name="search_query_type" id="glob" value="glob" bind:group={$searchQueryType}>
      <label class="button" for="glob">glob</label>
      <input type="radio" name="search_query_type" id="regex" value="regex" bind:group={$searchQueryType}>
      <label class="button" for="regex">regex</label>
    </div>
  </div>

  <div class="vertical-spacer"> </div>

  <div class="section-box" style:display={ $searchDomain != "local" ? "block" : "none" }>
    <div class="caption">Authentication</div>
    <div class="spacer"></div>
    <div class="input-box"> Root Address: <input type="text" bind:value={$rootAddress}/> </div>
    <div class="input-box"> Username: <input type="text" bind:value={$username}/> </div>
    <div class="input-box"> Password: <input type="password" bind:value={$password}/> </div>
  </div>

  <div class="vertical-spacer"> </div>

  <div class="section-box">
    <div class="caption">Filter Locations</div>
    <div class="spacer"></div>
    <div class="button-bar darkorange">
      <button class="button" onclick={clearPaths}>Clear All</button>
      <button class="button" onclick={insertPath}>Add</button>
    </div>
  </div>

  <div class="path-item-box">
    {#each paths as _, i}
      <div style="margin: none; padding: none; display: flex; flex-direction: row; gap: 10px;">
        <input
          class="path-item"
          type="text"
          style="flex: 1;"
          bind:value={paths[i]} />
        <button
          class="path-item-close"
          onclick={() => removePathIndex(i)}
          disabled={paths.length <= 1}>x</button>
      </div>
    {/each}
  </div>

  <div class="section-box">
    <div class="spacer"></div>
    <div class="button-bar darkcyan" style="min-width: 50px;">
      <button class="button darkcyan" onclick={startSearch}>Search</button>
    </div>
  </div>

  <div class="vertical-spacer"> </div>

  <div class="caption">Results [{$resultSet.length}]</div>
  <div class="loader"> </div>
  <div class="results-bar">
  {$errorMessage}
{#if $resultSet.length > 0}
  {#each $resultSet as result}
    <div class="result">
      <div class="title">{result.split("/").at(-1)}</div>
      <div class="path">{result}</div>
    </div>
  {/each}
{:else}
  <div>
    <i>No results.</i>
  </div>
{/if}
  </div>
</div>
