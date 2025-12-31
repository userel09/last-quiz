const btn = document.getElementById("load-btn");
const container = document.getElementById("user-container");

async function fetchUsers() {
  try {
    btn.disabled = true;
    btn.textContent = "იტვირთება...";

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("სერვერიდან მონაცემების წამოღება ვერ მოხერხდა");
    }

    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    container.innerHTML = `<p style="color: red;">შეცდომა: ${error.message}</p>`;
  } finally {
    btn.disabled = false;
    btn.textContent = "ჩვენება";
  }
}

function renderUsers(users) {
  container.innerHTML = "";

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
        `;

    container.appendChild(card);
  });
}

btn.addEventListener("click", fetchUsers);
