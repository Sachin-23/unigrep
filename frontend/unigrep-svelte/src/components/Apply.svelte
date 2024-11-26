<script module>
  export let displayed: boolean = true
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { resultSet } from "../lib/GlobalState";
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
        "search_domain":     "local",
        "root_address":      "/",
        "auth_username":     null,
        "auth_password":     null,
        "operation":         "download",
        "parameters":        { "destination_path": "/tmp/e" },
        "result_set":        { "path": {
            "0": "/tmp/b/a (copy 11).doc",
            "1": "/tmp/b/a (copy 12).doc",
            "2": "/tmp/b/a (copy 3).doc",
            "3": "/tmp/b/a (copy 10).doc",
            "4": "/tmp/b/a (copy 7).doc",
            "5": "/tmp/b/a (copy 5).doc",
            "6": "/tmp/b/a (copy 2).doc",
            "7": "/tmp/b/a.doc",
            "8": "/tmp/b/a (copy 4).doc",
            "9": "/tmp/b/a (copy 1).doc",
            "10": "/tmp/b/a (copy 8).doc",
            "11": "/tmp/b/a (copy 9).doc",
            "12": "/tmp/b/a (copy 13).doc",
            "13": "/tmp/b/a (copy 6).doc"
         }, "domain": {}, "address": {} }
      })
    })
    .then(
      resp => {
        console.log(resp);
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

    <button class="button" onclick={performDownload}>Download</button>

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