import type { InventoryItemType } from '../types'


export default function InventoryItem({ item, onEdit }: { item: InventoryItemType, onEdit?: (i: InventoryItemType)=>void }) {
return (
<div className="flex justify-between bg-white rounded-xl shadow p-3 mb-2 border border-gray-100">
<div>
<div className="font-medium text-textDark">{item.name}</div>
<div className="text-xs text-textLight">{item.unit ?? ''}</div>
</div>
<div className="text-right">
<div className="font-medium">{item.quantity}</div>
<button className="text-xs text-primary mt-1" onClick={() => onEdit?.(item)}>Edit</button>
</div>
</div>
)
}