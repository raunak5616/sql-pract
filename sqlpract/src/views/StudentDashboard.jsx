import useStudentPresenter from '../presenters/useStudentPresenter.js'

function StudentList({ students, isLoading }) {
  if (isLoading) {
    return <p className="empty-state">Loading students...</p>
  }

  if (!students.length) {
    return <p className="empty-state">No students added yet.</p>
  }

  return (
    <div className="student-list">
      {students.map((student) => (
        <article key={student.id} className="student-card">
          <div className="student-card-head">
            <h2 className="student-name">{student.name}</h2>
            <span className="student-badge">{student.course}</span>
          </div>
          <div className="student-meta">
            <span>Email: {student.email}</span>
            <span>Age: {student.age}</span>
            <span>ID: {student.id}</span>
          </div>
        </article>
      ))}
    </div>
  )
}

function StudentForm({
  form,
  isSaving,
  message,
  messageType,
  onChange,
  onSubmit
}) {
  return (
    <form className="student-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <label className="field-label">
          <span>Name</span>
          <input
            className="field-input"
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Enter student name"
            required
          />
        </label>

        <label className="field-label">
          <span>Email</span>
          <input
            className="field-input"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter email"
            required
          />
        </label>

        <label className="field-label">
          <span>Course</span>
          <input
            className="field-input"
            type="text"
            name="course"
            value={form.course}
            onChange={onChange}
            placeholder="Enter course"
            required
          />
        </label>

        <label className="field-label">
          <span>Age</span>
          <input
            className="field-input"
            type="number"
            name="age"
            value={form.age}
            onChange={onChange}
            placeholder="Enter age"
            min="1"
            required
          />
        </label>
      </div>

      <button className="submit-button" type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Student'}
      </button>

      <p className={`form-message ${messageType === 'error' ? 'is-error' : ''}`}>
        {message}
      </p>
    </form>
  )
}

export default function StudentDashboard() {
  const presenter = useStudentPresenter()

  return (
    <main className="app-shell">
      <section className="student-page">
        <article className="student-panel">
          <header className="panel-header">
            <p className="eyebrow">View</p>
            <h1 className="panel-title">Students</h1>
            <p className="panel-subtitle">
              The list refreshes automatically, so newly added records appear
              without reloading the page.
            </p>
            <div className="status-bar">
              <span className="status-dot" />
              <span>{presenter.students.length} students loaded</span>
            </div>
          </header>
          <StudentList
            students={presenter.students}
            isLoading={presenter.isLoading}
          />
        </article>

        <article className="student-panel">
          <header className="panel-header">
            <p className="eyebrow">Presenter</p>
            <h1 className="panel-title">Add Record</h1>
            <p className="panel-subtitle">
              The form is controlled by the presenter, while the model handles API
              requests behind the scenes.
            </p>
          </header>
          <StudentForm
            form={presenter.form}
            isSaving={presenter.isSaving}
            message={presenter.message}
            messageType={presenter.messageType}
            onChange={presenter.handleChange}
            onSubmit={presenter.handleSubmit}
          />
        </article>
      </section>
    </main>
  )
}
