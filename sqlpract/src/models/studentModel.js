const API_URL = '/api/students'

async function readJson(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export async function fetchStudents() {
  const response = await fetch(API_URL)
  return readJson(response)
}

export async function createStudent(student) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  })

  return readJson(response)
}
