const update = document.querySelector("#update-btn");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

update.addEventListener("click", (_) => {
  // PUT request here
  fetch("/bookmarks", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
      quote: "I find your lack of faith disturbing.",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => console.error(error));
});

deleteButton.addEventListener("click", (_) => {
  fetch("/bookmarks", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No quote to delete") {
        messageDiv.textContent = "No Darth Vader quote to delete";
      } else {
        window.location.reload();
      }
    });
});
