const BASE_URL = 'http://localhost:8000'

async function handleResponse(response) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail || `Request failed with status ${response.status}`)
  }
  if (response.status === 204) return null
  return response.json()
}

export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/tasks`)
  return handleResponse(response)
}

export async function createTask(title, priority) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, priority }),
  })
  return handleResponse(response)
}

export async function toggleTaskCompletion(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
    method: 'PATCH',
  })
  return handleResponse(response)
}

export async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}

export async function fetchStats() {
  const response = await fetch(`${BASE_URL}/stats`)
  return handleResponse(response)
}
