// variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");
let savedName;
getButton.onclick = () => {
  getRepos();
};
async function getTarget() {
  fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.length === 0) {
        Swal.fire({
          title: "Error!",
          text: "Wrong Name",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        // looping on the results

        result.forEach((repo) => {
          // create the main div
          let mainDiv = document.createElement("div");
          // create the name of the repo
          let repoName = document.createTextNode(repo.name);
          // append the name to the main div
          mainDiv.appendChild(repoName);
          // make a link anchor to visit the repo
          let theUrl = document.createElement("a");
          // make a link name(caption)
          let theUrlText = document.createTextNode(" visit");
          // append the caption to the anchor
          theUrl.appendChild(theUrlText);
          // add href (the actual link)
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          theUrl.target = "blank";
          // append the a to the workflow
          mainDiv.appendChild(theUrl);
          // create span for the stars count
          let theStarsSpan = document.createElement("span");
          // get the number of the stars
          let theStars = document.createTextNode(
            ` the starts :- ${repo.stargazers_count}`
          );
          // append the num of text to the start span
          theStarsSpan.appendChild(theStars);
          // append the stars to the main div
          mainDiv.appendChild(theStarsSpan);
          // adding class to the mainDv to use css on it
          mainDiv.classList.add("repo-box");
          // append the main div to the work flow (your page)
          reposData.appendChild(mainDiv);
        });
      }
    });
}
// function

function getRepos() {
  if (theInput.value == "") {
    Swal.fire({
      title: "Error!",
      text: "cannot be empty",
      icon: "warning",
      confirmButtonText: "OK",
    });
  } else {
    reposData.innerHTML = "";
    getTarget();
  }
  // theInput.value = "";
}
