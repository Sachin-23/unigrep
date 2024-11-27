<script module>
  export let displayed: boolean = true
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { password, resultDisplaySet, resultSet, rootAddress, searchDomain, username } from "../lib/GlobalState";
  let { displayed } = $props()

  const ipAddr = "localhost"
  const clientPort = "8000"

  const performDownload = () => {
    fetch(`http://${ipAddr}:${clientPort}/api/apply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "search_domain": $searchDomain,
        "root_address":  $rootAddress,
        "auth_username": $username,
        "auth_password": $password,
        "operation":     "download",
        "parameters":    {},
        "result_set":    $resultSet})
    })
    .then(
      resp => {
        console.log(resp);
        if (resp.headers.get("Content-Type") != "application/octet-stream") {
          alert("Error in getting value")
          return null
        }
        return resp.blob()
      },
      reason => { alert(`${reason}`);})
    .then(
      blob => {
        if (!blob) {
          return;
        }
        const url = window.URL.createObjectURL(blob); // create a new object url
        const a = document.createElement("a"); // create a new anchor element
        a.href = url; // set its href to the object URL
        a.download = "file.zip";  // set its download attribute to the deisred filename.
        a.click();
      },
      reason => { alert(`${reason}`);}
    )

  }

  const runCommand = () => {
    fetch(`http://${ipAddr}:${clientPort}/api/apply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "search_domain": $searchDomain,
        "root_address":  $rootAddress,
        "auth_username": $username,
        "auth_password": $password,
        "operation":     "run_command",
        "parameters":    { "command": "touch /tmp/runned$BASENAME$.txt" },
        "result_set":    $resultSet})
    })
    .then(
      resp => {
        console.log(resp);
      },
      reason => { alert(`${reason}`);})
  }

</script>

<div class="apply-body" style:display={displayed ? "block" : "none"} >
  <div class="apply-head-caption">
    Operating on { $resultDisplaySet.length } files.
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

    <button class="button" onclick={performDownload}>Download</button>
    <button class="button" onclick={runCommand}>Run Command</button>


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