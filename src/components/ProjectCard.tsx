import type { Project } from '../types'


export default function ProjectCard({ project, onOpen } : { project: Project, onOpen?: (p: Project)=>void }) {
const completed = project.tasks.filter(t => t.status === 'Completed').length
const total = project.tasks.length || 1
const pct = Math.round((completed / total) * 100)


return (
<div className="bg-white rounded-2xl shadow p-4 mb-3 border border-gray-100 hover:shadow-lg transition">
<div className="flex justify-between items-start">
<div>
<h4 className="font-medium text-textDark">{project.name}</h4>
<p className="text-sm text-textLight mt-1">{project.description}</p>
</div>
<div className="text-right">
<div className="text-sm font-medium text-textLight">{project.status}</div>
<div className="text-xs text-textLight">{pct}%</div>
</div>
</div>


<div className="mt-3">
<div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
<div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: 'var(--tw-color-primary, #4F46E5)' }}></div>
</div>
<div className="mt-2 flex justify-between text-xs text-textLight">
<span>{completed} completed</span>
<button onClick={() => onOpen?.(project)} className="text-sm text-primary">View</button>
</div>
</div>
</div>
)
}