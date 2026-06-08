import { startTransition, useEffect, useEffectEvent, useState } from 'react'
import { createStudent, fetchStudents } from '../models/studentModel.js'

const emptyForm = {
  name: '',
  email: '',
  course: '',
  age: ''
}

export default function useStudentPresenter() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  const loadStudents = useEffectEvent(async () => {
    try {
      const studentData = await fetchStudents()

      startTransition(() => {
        setStudents(studentData)
      })
    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  })

  useEffect(() => {
    let isMounted = true

    const loadWithGuard = async () => {
      if (!isMounted) {
        return
      }

      await loadStudents()
    }

    loadWithGuard()

    const intervalId = window.setInterval(() => {
      void loadWithGuard()
    }, 3000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [loadStudents])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('Saving student...')
    setMessageType('info')

    try {
      await createStudent({
        ...form,
        age: Number(form.age)
      })

      setForm(emptyForm)
      setMessage('Student added successfully')
      setMessageType('success')
      await loadStudents()
    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
    } finally {
      setIsSaving(false)
    }
  }

  return {
    students,
    form,
    isLoading,
    isSaving,
    message,
    messageType,
    handleChange,
    handleSubmit
  }
}
