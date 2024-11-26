<script module>
  export let displayed: boolean = true
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
    import { resultSet } from "../lib/GlobalState";
  let { displayed } = $props()
</script>

<div class="apply-body" style:display={displayed ? "block" : "none"} >
  <div class="apply-head-caption">
    Operating on { $resultSet.length } files.
  </div>

  <div class="apply-body-content">
    <div class="caption">Operation</div>
    <select class="operation-select">
      <option>Copy</option>
      <option>Move</option>
      <option>Rename</option>
      <option>Concatenate</option>
    </select>

    <div class="operation-pane">
      <b>Copy Location:</b>
      <div class="filter-bar" contenteditable="true">
        /home/user/Publish/
      </div>
    </div>

    <div class="button-bar-set">
      <div class="spacer"> </div>
      <div class="button-bar darkblue">
        <div class="button" style="font-size: 12px; padding: 5px">
          Apply
        </div>
      </div>
    </div>

    <div class="caption">Preview</div>

    <div class="results-bar">
      <div class="result">
        <div class="title">My Doc: First.doc</div>
        <div class="path">/home/user/Publish/work/My Doc: First.doc</div>
      </div>
      <div class="result">
        <div class="title">My Doc: Second.doc</div>
        <div class="path">/home/user/Publish/work/My Doc: Second.doc</div>
      </div>
      <div class="result">
        <div class="title">My Doc: Third.doc</div>
        <div class="path">/home/user/Publish/work/My Doc: Third.doc</div>
      </div>
      <div class="result">
        <div class="title">My Doc: First Draft.doc</div>
        <div class="path">/home/user/Publish/work/My Doc: First Draft.doc</div>
      </div>
    </div>
  </div>
</div>