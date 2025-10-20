
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SAMPLE_PROJECTS, SAMPLE_INVENTORY } from '../data/sampleData'
import ProjectCard from '../components/ProjectCard'
import InventoryItem from '../components/InventoryItem'
import type { Project, InventoryItemType } from '../types'


export default function DashboardPage() {
const [projects] = useLocalStorage<Project[]>('awm_projects_v1', SAMPLE_PROJECTS)
const [inventory] = useLocalStorage<InventoryItemType[]>('awm_inventory_v1', SAMPLE_INVENTORY)


return (
<div className="max-w-[var(--max-w)] mx-auto mt-6">
<h2 className="text-2xl font-semibold mb-6 text-textDark">Dashboard Overview</h2>


<div className="grid md:grid-cols-2 gap-6">
<section>
<h3 className="font-semibold text-lg mb-2">Active Projects</h3>
{projects.map(p => <ProjectCard key={p.id} project={p} />)}
</section>


<section>
<h3 className="font-semibold text-lg mb-2">Inventory Summary</h3>
{inventory.map(i => <InventoryItem key={i.id} item={i} />)}
</section>
</div>
</div>
)
}