import type { Project, InventoryItemType } from '../types'

export const SAMPLE_PROJECTS: Project[] = [
{
id: 'p-1',
name: 'Wooden Dining Table',
status: 'In Progress',
description: 'Custom oak dining table for client in Zeerust',
tasks: [
{ id: 't-1', title: 'Cut wood pieces', status: 'Completed' },
{ id: 't-2', title: 'Assemble table frame', status: 'In Progress' },
{ id: 't-3', title: 'Apply varnish', status: 'Pending' },
],
createdAt: Date.now(),
},
{
id: 'p-2',
name: 'Ceramic Coffee Mugs',
status: 'Pending',
description: 'Set of 12 handmade mugs for local café',
tasks: [
{ id: 't-4', title: 'Shape mugs on wheel', status: 'Pending' },
{ id: 't-5', title: 'Fire in kiln', status: 'Pending' },
{ id: 't-6', title: 'Glaze and decorate', status: 'Pending' },
],
createdAt: Date.now(),
},
]


export const SAMPLE_INVENTORY: InventoryItemType[] = [
{ id: 'i-1', name: 'Oak Wood', quantity: 25, unit: 'planks' },
{ id: 'i-2', name: 'Varnish', quantity: 5, unit: 'litres' },
{ id: 'i-3', name: 'Clay', quantity: 40, unit: 'kg' },
{ id: 'i-4', name: 'Paint', quantity: 8, unit: 'tins' },
]