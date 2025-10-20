import type { Task } from '../types'


export default function TaskCard({ task, onToggle } : { task: Task, onToggle?: (t: Task)=>void }) {
return (
<div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-2">
<div>
<div className="font-medium">{task.title}</div>
<div className="text-xs text-textLight">{task.status}</div>
</div>
<div className="flex items-center gap-2">
<button onClick={() => onToggle?.(task)} className="px-3 py-1 rounded-md border text-sm">Toggle</button>
</div>
</div>
)
}