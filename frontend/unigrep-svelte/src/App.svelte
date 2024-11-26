<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import unigrepLogo from './assets/logo_short_export.svg'
  import viteLogo from '/vite.svg'
  import Filter from './components/Filter.svelte';

  const TAB_FILTER = 0;
  const TAB_APPLY = 1;
  let tabNumber: number = $state(TAB_FILTER);
</script>

<main>
<div class="container">
  <div class="header-title">
    <img class="logo" src={unigrepLogo} alt="Unigrep" />
  </div>
  <div class="tabbar">
    <div class="tab" style="background-color:#444444;">Filter</div>
    <div class="tab">Apply</div>
    <div class="spacer"></div>
    <div class="tab">Settings</div>
  </div>
  <Filter displayed = {tabNumber == TAB_FILTER} />
</div>
</main>