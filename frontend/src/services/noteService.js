import apiRequest from "./api";

export async function getNotes() {
  return apiRequest("/api/notes");
}

export async function createNote(title, content) {
  return apiRequest("/api/notes", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
  });
}

export async function updateNote(id, title, content) {
  return apiRequest(`/api/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });
}

export async function deleteNote(id) {
  return apiRequest(`/api/notes/${id}`, {
    method: "DELETE",
  });
}