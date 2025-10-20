export type TaskStatus = 'Pending' | 'In Progress' | 'Completed'


export interface Task {
id: string
title: string
status: TaskStatus
}


export interface Project {
id: string
name: string
description?: string
status: string
tasks: Task[]
createdAt: number
}


export interface InventoryItemType {
id: string
name: string
quantity: number
unit?: string
}