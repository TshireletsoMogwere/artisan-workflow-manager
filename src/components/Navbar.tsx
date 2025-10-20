import { Link, useLocation } from 'react-router-dom'


export default function Navbar() {
const location = useLocation()
const links = [
{ name: 'Dashboard', path: '/' },
{ name: 'Projects', path: '/projects' },
{ name: 'Inventory', path: '/inventory' },
]


return (
<nav className="bg-white shadow-md fixed w-full top-0 z-20">
<div className="max-w-[var(--max-w)] mx-auto flex justify-between items-center px-4 py-3">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">A</div>
<h1 className="text-lg font-semibold text-primary">Artisan Manager</h1>
</div>


<ul className="hidden sm:flex items-center gap-6">
{links.map((l) => (
<li key={l.path}>
<Link
to={l.path}
className={`text-sm font-medium ${location.pathname === l.path ? 'text-primary border-b-2 border-primary' : 'text-textLight hover:text-primary'}`}>
{l.name}
</Link>
</li>
))}
</ul>


<div className="sm:hidden">

</div>
</div>
</nav>
)
}