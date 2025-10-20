import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SAMPLE_PROJECTS } from '../data/sampleData'
import type { Project, Task } from '../types'
import ProjectCard from '../components/ProjectCard'
import Modal from '../components/Modal'
import TaskCard from '../components/TaskCard'

export default function ProjectsPage() {
  const [projects, setProjects] = useLocalStorage<Project[]>('awm_projects_v1', SAMPLE_PROJECTS)
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function toggleTaskStatus(p: Project, t: Task) {
    const updated = projects.map(proj => {
      if (proj.id !== p.id) return proj
      return {
        ...proj,
        tasks: proj.tasks.map(task => task.id === t.id ? { ...task, status: nextStatus(task.status) } : task)
      }
    })
    setProjects(updated)
  }

  function nextStatus(s: Task['status']) {
    if (s === 'Pending') return 'In Progress'
    if (s === 'In Progress') return 'Completed'
    return 'Pending'
  }

  function addTask(p: Project) {
    if (!newTaskTitle.trim()) return
    const id = 't-' + Math.random().toString(36).slice(2,9)
    const updated = projects.map(proj => proj.id === p.id ? { ...proj, tasks: [...proj.tasks, { id, title: newTaskTitle, status: 'Pending' }] } : proj)
    setProjects(updated)
    setNewTaskTitle('')
  }

  return (
    <div className="max-w-[var(--max-w)] mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-textDark">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {projects.map(p => (
            <div key={p.id} className="mb-2">
              <ProjectCard project={p} onOpen={(proj) => setOpenProject(proj)} />
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <p className="text-sm text-textLight">Click 'View' on a project to manage tasks.</p>
        </div>
      </div>

      <Modal open={!!openProject} title={openProject?.name} onClose={() => setOpenProject(null)}>
        <div>
          <p className="text-sm text-textLight mb-3">{openProject?.description}</p>
          <div>
            {(openProject?.tasks || []).map(t => (
              <TaskCard key={t.id} task={t} onToggle={() => toggleTaskStatus(openProject as Project, t)} />
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="New task title" />
            <button className="px-4 py-2 bg-primary text-white rounded-md" onClick={() => addTask(openProject!)}>Add</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
