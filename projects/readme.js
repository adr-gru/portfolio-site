// Shows projects/readmes/<page-name>.md at the bottom of a project page.
// e.g. wallcal.html loads readmes/wallcal.md. No file = nothing shown.
const box = document.getElementById("readme");
const name = location.pathname.split("/").pop().replace(".html", "");

fetch(`readmes/${name}.md`)
  .then((res) => (res.ok ? res.text() : Promise.reject()))
  .then((md) => {
    box.innerHTML = marked.parse(md);
    box.hidden = false;
  })
  .catch(() => {});
