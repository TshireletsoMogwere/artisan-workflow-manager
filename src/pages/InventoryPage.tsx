import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SAMPLE_INVENTORY } from '../data/sampleData'
import type { InventoryItemType } from '../types'
import InventoryItem from '../components/InventoryItem'
import Modal from '../components/Modal'

export default function InventoryPage() {
  const [items, setItems] = useLocalStorage<InventoryItemType[]>('awm_inventory_v1', SAMPLE_INVENTORY)
  const [openItem, setOpenItem] = useState<InventoryItemType | null>(null)
  const [editQty, setEditQty] = useState<number>(0)

  function saveEdit() {
    if (!openItem) return
    const updated = items.map(i => i.id === openItem.id ? { ...i, quantity: editQty } : i)
    setItems(updated)
    setOpenItem(null)
  }

  function addItem() {
    const id = 'i-' + Math.random().toString(36).slice(2,9)
    setItems([...items, { id, name: 'New Item', quantity: 1 }])
  }

  return (
    <div className="max-w-[var(--max-w)] mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-textDark">Inventory</h2>
        <div>
          <button className="px-3 py-2 bg-primary text-white rounded-md" onClick={addItem}>Add Item</button>
        </div>
      </div>

      <div>
        {items.map(i => (
          <InventoryItem key={i.id} item={i} onEdit={(it) => { setOpenItem(it); setEditQty(it.quantity) }} />
        ))}
      </div>

      <Modal open={!!openItem} title={openItem?.name} onClose={() => setOpenItem(null)}>
        <div>
          <label className="block text-sm text-textLight mb-2">Quantity</label>
          <input type="number" value={editQty} onChange={e => setEditQty(Number(e.target.value))} className="w-40 p-2 border rounded-md" />
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-2 bg-primary text-white rounded-md" onClick={saveEdit}>Save</button>
            <button className="px-3 py-2 border rounded-md" onClick={() => setOpenItem(null)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
