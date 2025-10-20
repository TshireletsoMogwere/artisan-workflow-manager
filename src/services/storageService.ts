import type { Project, InventoryItemType } from '../types'


const PROJECT_KEY = 'awm_projects_v1'
const INVENTORY_KEY = 'awm_inventory_v1'


export const storage = {
loadProjects(): Project[] {
try {
const raw = localStorage.getItem(PROJECT_KEY)
return raw ? JSON.parse(raw) : null
} catch { return null }
},
saveProjects(projects: Project[]) {
localStorage.setItem(PROJECT_KEY, JSON.stringify(projects))
},
loadInventory(): InventoryItemType[] | null {
try { return JSON.parse(localStorage.getItem(INVENTORY_KEY) || 'null') } catch { return null }
},
saveInventory(items: InventoryItemType[]) { localStorage.setItem(INVENTORY_KEY, JSON.stringify(items)) }
}