const reviewForm = document.querySelector("#reviewForm");
const editReviewForm = document.querySelector("#editReviewForm");
const reviewsTable = document.querySelector("#reviewsTable");
const cancelEditButton = document.querySelector("#cancelEdit");

const courseInput = document.querySelector("#course");
const userNameInput = document.querySelector("#userName");
const commentInput = document.querySelector("#comment");
const ratingInput = document.querySelector("#rating");

const editCourseInput = document.querySelector("#editCourse");
const editUserNameInput = document.querySelector("#editUserName");
const editCommentInput = document.querySelector("#editComment");
const editRatingInput = document.querySelector("#editRating");

fetch("https://6747d56c38c8741641d7d298.mockapi.io/api/reviews")
  .then((response) => response.json())
  .then((data) => populateReviewsTable(data))
  .catch((error) => console.error("Error al cargar las reseñas:", error));

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newReview = {
    course: courseInput.value,
    userName: userNameInput.value,
    comment: commentInput.value,
    rating: ratingInput.value,
  };

  fetch("https://6747d56c38c8741641d7d298.mockapi.io/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReview),
  })
    .then(() => fetchAndUpdateTable())
    .catch((error) => console.error("Error al agregar la reseña:", error));
  clearForm();
});

function fetchAndUpdateTable() {
  fetch("https://6747d56c38c8741641d7d298.mockapi.io/api/reviews")
    .then((response) => response.json())
    .then((data) => populateReviewsTable(data))
    .catch((error) => console.error("Error al actualizar la tabla:", error));
}

function clearForm() {
  courseInput.value = "";
  userNameInput.value = "";
  commentInput.value = "";
  ratingInput.value = "";
}

function populateReviewsTable(data) {
  reviewsTable.innerHTML = "";

  data.forEach((review) => {
    const row = document.createElement("tr");

    const courseCell = document.createElement("td");
    courseCell.textContent = review.course;
    row.appendChild(courseCell);

    const userNameCell = document.createElement("td");
    userNameCell.textContent = review.userName;
    row.appendChild(userNameCell);

    const commentCell = document.createElement("td");
    commentCell.textContent = review.comment;
    row.appendChild(commentCell);

    const ratingCell = document.createElement("td");
    ratingCell.textContent = `${review.rating} / 5`;
    row.appendChild(ratingCell);

    const actionsCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "btn";
    editButton.addEventListener("click", () => editReviewHandler(review));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar";
    deleteButton.className = "btn";
    deleteButton.addEventListener("click", () =>
      deleteReviewHandler(review.id)
    );
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    reviewsTable.appendChild(row);
  });
}

function deleteReviewHandler(id) {
  if (confirm("¿Estás seguro de que quieres borrar esta reseña?")) {
    deleteReview(id);
  }
}

function deleteReview(id) {
  fetch(`https://6747d56c38c8741641d7d298.mockapi.io/api/reviews/${id}`, {
    method: "DELETE",
  })
    .then(() => fetchAndUpdateTable())
    .catch((error) => console.error("Error al borrar la reseña:", error));
}

function editReviewHandler(review) {
  editReviewForm.style.display = "block";

  editCourseInput.value = review.course;
  editUserNameInput.value = review.userName;
  editCommentInput.value = review.comment;
  editRatingInput.value = review.rating;

  editReviewForm.setAttribute("data-review-id", review.id);
}

editReviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const reviewId = editReviewForm.getAttribute("data-review-id");

  const updatedReview = {
    course: editCourseInput.value,
    userName: editUserNameInput.value,
    comment: editCommentInput.value,
    rating: editRatingInput.value,
  };

  fetch(`https://6747d56c38c8741641d7d298.mockapi.io/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedReview),
  })
    .then(() => {
      fetchAndUpdateTable();
      hideEditForm();
    })
    .catch((error) => console.error("Error al editar la reseña:", error));
});

cancelEditButton.addEventListener("click", () => {
  hideEditForm();
});

function hideEditForm() {
  editReviewForm.style.display = "none";
  editReviewForm.removeAttribute("data-review-id");
}
