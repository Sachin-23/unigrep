<script lang="ts">
  import unigrepLogo from './assets/logo_short_export.svg'
  import Filter from './components/Filter.svelte';
  import Apply from './components/Apply.svelte';

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
    <button
      class="tab"
      style:background-color={ tabNumber == TAB_FILTER ? "#444444" : "" }
      onclick={() => tabNumber = TAB_FILTER}>Filter</button>
    <button
      class="tab"
      style:background-color={ tabNumber == TAB_APPLY ? "#444444" : "" }
      onclick={() => tabNumber = TAB_APPLY}>Apply</button>
    <div class="spacer"></div>
  </div>
  <Filter displayed = {tabNumber == TAB_FILTER} />
  <Apply displayed = {tabNumber == TAB_APPLY} />
</div>
</main>