
const landingPage = document.getElementById('landing-page');
const getStartedBtn = document.getElementById('get-started-btn');

getStartedBtn?.addEventListener('click', ()=>{
  landingPage.classList.add('hidden');
  authContainer.classList.remove('hidden');
});
// ===== LocalStorage helpers =====
const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const saveUsers = (u) => localStorage.setItem('users', JSON.stringify(u));
const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
const saveTasks = (t) => localStorage.setItem('tasks', JSON.stringify(t));
const getProjects = () => JSON.parse(localStorage.getItem('projects')) || [];
const saveProjects = (p) => localStorage.setItem('projects', JSON.stringify(p));
const getInventory = () => JSON.parse(localStorage.getItem('inventory')) || [];
const saveInventory = (i) => localStorage.setItem('inventory', JSON.stringify(i));

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ===== Dummy init (only first run) =====
function initializeDummyData(){
  if(!localStorage.getItem('users')){
    saveUsers([
      {id:1,name:'Manager Mike',email:'manager@example.com',password:'123',role:'manager',subscription:'business'},
      {id:2,name:'Artisan Anna',email:'artisan1@example.com',password:'123',role:'artisan',subscription:'pro'},
      {id:3,name:'Artisan Alex',email:'artisan2@example.com',password:'123',role:'artisan',subscription:'free'},
      {id:4,name:'Client Clara',email:'client@example.com',password:'123',role:'client',subscription:'pro'}
    ]);
  }
  if(!localStorage.getItem('tasks')){
    saveTasks([
      {id:101,title:'Fix Table',description:'Repair broken table',assigneeId:2,status:'Pending',usedInventory:[]},
      {id:102,title:'Paint Wall',description:'Paint office wall',assigneeId:3,status:'In Progress',usedInventory:[]}
    ]);
  }
  if(!localStorage.getItem('projects')){
    saveProjects([
      {id:201,title:'Client Website',description:'Build website',requestedBy:4,status:'Pending',assignedTo:null}
    ]);
  }
  if(!localStorage.getItem('inventory')){
    saveInventory([
      {id:301,name:'Wood Plank',quantity:50},
      {id:302,name:'Paint Bucket',quantity:10},
      {id:303,name:'Hammer',quantity:5},
      {id:304,name:'Screwdriver',quantity:7},
      {id:305,name:'Nails Pack',quantity:200}
    ]);
  }
}
initializeDummyData();

// ===== DOM refs =====
const authContainer = document.getElementById('auth-container');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toSignup = document.getElementById('to-signup');
const toLogin = document.getElementById('to-login');
const logoutBtn = document.getElementById('logout-btn');

const currentUserNameEl = document.getElementById('current-user-name');
const currentRoleEl = document.getElementById('current-role');
const currentSubscriptionEl = document.getElementById('current-subscription');

const taskList = document.getElementById('task-list');
const projectList = document.getElementById('project-list');
const inventoryList = document.getElementById('inventory-list');
const userList = document.getElementById('user-list');

const addTaskBtn = document.getElementById('add-task-btn');
const taskModal = document.getElementById('task-modal');
const closeTaskModal = document.getElementById('close-task-modal');
const saveTaskBtn = document.getElementById('save-task-btn');
const taskTitleEl = document.getElementById('task-title');
const taskDescEl = document.getElementById('task-desc');
const taskAssigneeEl = document.getElementById('task-assignee');

const requestProjectBtn = document.getElementById('request-project-btn');
const projectModal = document.getElementById('project-modal');
const closeProjectModal = document.getElementById('close-project-modal');
const saveProjectBtn = document.getElementById('save-project-btn');
const projectTitleEl = document.getElementById('project-title');
const projectDescEl = document.getElementById('project-desc');

const userManagementSection = document.getElementById('user-management');
const addInventoryBtn = document.getElementById('add-inventory-btn');

const assignProjectModal = document.getElementById('assign-project-modal');
const assignProjectTitle = document.getElementById('assign-project-title');
const assignProjectArtisan = document.getElementById('assign-project-artisan');
const closeAssignProjectModal = document.getElementById('close-assign-project-modal');
const confirmAssignProjectBtn = document.getElementById('confirm-assign-project-btn');

const logInventoryModal = document.getElementById('log-inventory-modal');
const logInventoryTaskTitle = document.getElementById('log-inventory-task-title');
const logInventorySelect = document.getElementById('log-inventory-select');
const logInventoryQty = document.getElementById('log-inventory-qty');
const closeLogInventoryModal = document.getElementById('close-log-inventory-modal');
const saveLogInventoryBtn = document.getElementById('save-log-inventory-btn');

// ===== Auth toggle =====
toSignup?.addEventListener('click', ()=>{ loginForm.classList.add('hidden'); signupForm.classList.remove('hidden'); document.getElementById('auth-title').textContent='Sign up'; });
toLogin?.addEventListener('click', ()=>{ signupForm.classList.add('hidden'); loginForm.classList.remove('hidden'); document.getElementById('auth-title').textContent='Login'; });

// ===== Signup =====
signupForm?.addEventListener('submit', e=>{
  e.preventDefault();
  const users = getUsers();
  const email = document.getElementById('signup-email').value.trim();
  if(users.find(u=>u.email===email)){ alert('User already exists'); return; }
  const newUser = {
    id: Date.now(),
    name: document.getElementById('signup-name').value.trim(),
    email,
    password: document.getElementById('signup-password').value,
    role: document.getElementById('signup-role').value,
    subscription: document.getElementById('signup-subscription').value
  };
  users.push(newUser);
  saveUsers(users);
  alert('Signup success — please login');
  signupForm.reset();
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  document.getElementById('auth-title').textContent='Login';
});

// ===== Login =====
loginForm?.addEventListener('submit', e=>{
  e.preventDefault();
  const users = getUsers();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const user = users.find(u=>u.email===email && u.password===password);
  if(!user){ alert('Invalid credentials'); return; }
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  showDashboardFor(user);
});

// ===== Logout =====
logoutBtn?.addEventListener('click', ()=>{
  localStorage.removeItem('currentUser');
  currentUser = null;
  // show auth
  mainApp.classList.add('hidden');
  authContainer.classList.remove('hidden');
  // reset auth view
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});

// ===== Dashboard rendering =====
function showDashboardFor(user){
  authContainer.classList.add('hidden');
  mainApp.classList.remove('hidden');
  currentUserNameEl.textContent = user.name;
  currentRoleEl.textContent = user.role.toUpperCase();
  currentSubscriptionEl.textContent = `${user.subscription.toUpperCase()} (R${user.subscription==='free'?0: user.subscription==='pro'?99:199}/month)`;
  // role-specific UI
  if(user.role==='manager'){ addTaskBtn.classList.remove('hidden'); userManagementSection.classList.remove('hidden'); addInventoryBtn.classList.remove('hidden'); }
  else { addTaskBtn.classList.add('hidden'); userManagementSection.classList.add('hidden'); addInventoryBtn.classList.add('hidden'); }
  // project request: only clients see request button
  requestProjectBtn.style.display = user.role==='client' ? 'inline-block' : 'none';
  // load content
  renderTasks();
  renderProjects();
  renderInventory();
  renderUsers();
  populateAssigneeSelect();
  populateArtisanSelect();
  populateInventorySelect();
}

// ===== RENDER TASKS (role-based) =====
function renderTasks(){
  taskList.innerHTML = '';
  const tasks = getTasks();
  let visible = [];
  if(currentUser.role==='manager') visible = tasks;
  else if(currentUser.role==='artisan') visible = tasks.filter(t => t.assigneeId === currentUser.id);
  else visible = []; // client sees none

  visible.forEach(task=>{
    const li = document.createElement('li');
    li.className = 'p-3 border rounded flex justify-between items-start';

    // left content
    const left = document.createElement('div');
    left.innerHTML = `<strong>${task.title}</strong> <div class="text-sm text-gray-600">${task.description}</div>
      <div class="text-xs text-gray-500 mt-1">Status: <span id="task-status-${task.id}">${task.status}</span></div>
      <div class="text-xs text-gray-500 mt-1">Assigned to: ${getUsers().find(u=>u.id===task.assigneeId)?.name || '—'}</div>`;

    // right actions
    const right = document.createElement('div');
    right.className = 'flex flex-col gap-2';

    // manager: delete button
    if(currentUser.role==='manager'){
      const del = document.createElement('button');
      del.className = 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600';
      del.textContent = 'Delete';
      del.addEventListener('click', ()=>{ deleteTask(task.id); });
      right.appendChild(del);
    }
    // artisan: status dropdown + log inventory
    if(currentUser.role==='artisan'){
      const sel = document.createElement('select');
      sel.className = 'border p-1 rounded';
      ['Pending','In Progress','Completed'].forEach(opt=>{
        const o = document.createElement('option'); o.value = opt; o.textContent = opt;
        if(task.status===opt) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', (e)=>{
        updateTaskStatus(task.id, e.target.value);
      });
      right.appendChild(sel);

      const logInvBtn = document.createElement('button');
      logInvBtn.className = 'bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800';
      logInvBtn.textContent = 'Log Inventory';
      logInvBtn.addEventListener('click', ()=> openLogInventoryModal(task));
      right.appendChild(logInvBtn);
    }

    li.appendChild(left);
    li.appendChild(right);
    taskList.appendChild(li);
  });

  if(visible.length===0){
    taskList.innerHTML = `<li class="p-2 text-gray-500">No visible tasks.</li>`;
  }
}

function deleteTask(id){
  saveTasks(getTasks().filter(t=>t.id!==id));
  renderTasks();
}

function updateTaskStatus(id,value){
  const tasks = getTasks();
  const t = tasks.find(x=>x.id===id);
  if(!t) return;
  t.status = value;
  saveTasks(tasks);
  document.getElementById(`task-status-${id}`).textContent = value;
}

// ===== RENDER PROJECTS (role-based) =====
function renderProjects(){
  projectList.innerHTML = '';
  const projects = getProjects();
  let visible = [];
  if(currentUser.role==='manager') visible = projects;
  else if(currentUser.role==='artisan') visible = projects.filter(p => p.assignedTo === currentUser.id);
  else if(currentUser.role==='client') visible = projects.filter(p => p.requestedBy === currentUser.id);

  visible.forEach(p=>{
    const li = document.createElement('li');
    li.className = 'p-3 border rounded flex justify-between items-start';
    const left = document.createElement('div');
    // compute completion (based on tasks assigned to this project if any; simplified: tasks with title containing project title -> demo)
    const relatedTasks = getTasks().filter(t => t.title.toLowerCase().includes(p.title.toLowerCase()));
    const completed = relatedTasks.filter(t=>t.status==='Completed').length;
    const completion = relatedTasks.length ? Math.round((completed/relatedTasks.length)*100) : (p.status==='Completed'?100:0);

    left.innerHTML = `<strong>${p.title}</strong> <div class="text-sm text-gray-600">${p.description}</div>
      <div class="text-xs text-gray-500 mt-1">Status: ${p.status} • Completion: ${completion}%</div>
      <div class="text-xs text-gray-500 mt-1">Requested by: ${getUsers().find(u=>u.id===p.requestedBy)?.name || '—'}</div>
      <div class="text-xs text-gray-500 mt-1">Assigned to: ${getUsers().find(u=>u.id===p.assignedTo)?.name || '—'}</div>`;

    const right = document.createElement('div');
    right.className = 'flex flex-col gap-2';

    // manager: assign button
    if(currentUser.role==='manager'){
      const assignBtn = document.createElement('button');
      assignBtn.className = 'bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700';
      assignBtn.textContent = 'Assign';
      assignBtn.addEventListener('click', ()=> openAssignProjectModal(p));
      right.appendChild(assignBtn);

      const delBtn = document.createElement('button');
      delBtn.className = 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', ()=> { saveProjects(getProjects().filter(x=>x.id!==p.id)); renderProjects(); });
      right.appendChild(delBtn);
    }

    // client: read-only, can view progress (no actions)
    li.appendChild(left); li.appendChild(right);
    projectList.appendChild(li);
  });

  if(visible.length===0) projectList.innerHTML = `<li class="p-2 text-gray-500">No visible projects.</li>`;
}

// ===== RENDER INVENTORY (role-based) =====
function renderInventory(){
  inventoryList.innerHTML = '';
  const inventory = getInventory();
  if(currentUser.role==='manager'){
    inventory.forEach(it=>{
      const li = document.createElement('li');
      li.className = 'p-2 border rounded flex justify-between items-center';
      li.innerHTML = `<div>${it.name} <div class="text-xs text-gray-500">Qty: ${it.quantity}</div></div>`;
      inventoryList.appendChild(li);
    });
  } else if(currentUser.role==='artisan'){
    // show inventory used by artisan's tasks (simple list)
    const tasks = getTasks().filter(t => t.assigneeId === currentUser.id && t.usedInventory && t.usedInventory.length);
    if(tasks.length===0) {
      inventoryList.innerHTML = `<li class="p-2 text-gray-500">No logged inventory for your tasks.</li>`;
      return;
    }
    tasks.forEach(t=>{
      const li = document.createElement('li');
      li.className = 'p-2 border rounded';
      let lines = `<div class="font-semibold">${t.title}</div>`;
      t.usedInventory.forEach(ui=>{
        const inv = getInventory().find(i=>i.id===ui.itemId);
        lines += `<div class="text-sm text-gray-600">${inv?.name || '—'}: ${ui.qty}</div>`;
      });
      li.innerHTML = lines;
      inventoryList.appendChild(li);
    });
  } else {
    inventoryList.innerHTML = `<li class="p-2 text-gray-500">No access</li>`;
  }
}

// ===== RENDER USERS (admin only) =====
function renderUsers(){
  userList.innerHTML = '';
  if(currentUser.role!=='manager') return;
  const users = getUsers();
  users.forEach(u=>{
    const li = document.createElement('li');
    li.className = 'p-2 border rounded flex justify-between items-center';
    li.innerHTML = `<div>${u.name} <div class="text-xs text-gray-500">${u.role} • ${u.subscription}</div></div>
      <div><button class="bg-red-500 text-white px-2 py-1 rounded" data-id="${u.id}">Remove</button></div>`;
    userList.appendChild(li);
  });
  // remove user handlers
  userList.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = Number(btn.dataset.id);
      saveUsers(getUsers().filter(u=>u.id!==id));
      renderUsers();
      populateAssigneeSelect();
      populateArtisanSelect();
    });
  });
}

// ===== Populate selects from users/inventory =====
function populateAssigneeSelect(){
  taskAssigneeEl.innerHTML = '';
  const artisans = getUsers().filter(u=>u.role==='artisan');
  if(artisans.length===0){
    taskAssigneeEl.innerHTML = `<option value="">No artisans</option>`;
    return;
  }
  artisans.forEach(a=>{
    const opt = document.createElement('option'); opt.value = a.id; opt.textContent = a.name;
    taskAssigneeEl.appendChild(opt);
  });
}

function populateArtisanSelect(){
  assignProjectArtisan.innerHTML = '';
  const artisans = getUsers().filter(u=>u.role==='artisan');
  if(artisans.length===0){
    assignProjectArtisan.innerHTML = `<option value="">No artisans</option>`;
    return;
  }
  artisans.forEach(a=>{
    const opt = document.createElement('option'); opt.value = a.id; opt.textContent = a.name;
    assignProjectArtisan.appendChild(opt);
  });
}

function populateInventorySelect(){
  logInventorySelect.innerHTML = '';
  getInventory().forEach(it=>{
    const opt = document.createElement('option'); opt.value = it.id; opt.textContent = `${it.name} (Qty: ${it.quantity})`;
    logInventorySelect.appendChild(opt);
  });
}

// ===== UI open/close modals & actions =====

// Add Task (manager)
addTaskBtn?.addEventListener('click', ()=>{ taskModal.classList.remove('hidden'); populateAssigneeSelect(); });
closeTaskModal?.addEventListener('click', ()=>{ taskModal.classList.add('hidden'); taskTitleEl.value=''; taskDescEl.value=''; });

saveTaskBtn?.addEventListener('click', ()=>{
  const title = taskTitleEl.value.trim();
  const desc = taskDescEl.value.trim();
  const assigneeId = Number(taskAssigneeEl.value);
  if(!title || !desc || !assigneeId){ alert('Fill all fields'); return; }
  const tasks = getTasks();
  tasks.push({id:Date.now(), title, description:desc, assigneeId, status:'Pending', usedInventory:[]});
  saveTasks(tasks);
  taskModal.classList.add('hidden'); taskTitleEl.value=''; taskDescEl.value='';
  renderTasks();
});

// Request project (client)
requestProjectBtn?.addEventListener('click', ()=>{ projectModal.classList.remove('hidden'); });
closeProjectModal?.addEventListener('click', ()=>{ projectModal.classList.add('hidden'); projectTitleEl.value=''; projectDescEl.value=''; });

saveProjectBtn?.addEventListener('click', ()=>{
  const title = projectTitleEl.value.trim();
  const desc = projectDescEl.value.trim();
  if(!title||!desc){ alert('Fill fields'); return; }
  const projects = getProjects();
  projects.push({id:Date.now(), title, description:desc, requestedBy: currentUser.id, status:'Pending', assignedTo:null});
  saveProjects(projects);
  projectModal.classList.add('hidden'); projectTitleEl.value=''; projectDescEl.value='';
  renderProjects();
});

// Open assign modal (manager)
let assignTargetProjectId = null;
function openAssignProjectModal(project){
  assignTargetProjectId = project.id;
  assignProjectTitle.textContent = project.title;
  populateArtisanSelect();
  assignProjectModal.classList.remove('hidden');
}
closeAssignProjectModal?.addEventListener('click', ()=>{ assignProjectModal.classList.add('hidden'); assignTargetProjectId = null; });

confirmAssignProjectBtn?.addEventListener('click', ()=>{
  const artisanId = Number(assignProjectArtisan.value);
  if(!artisanId){ alert('Choose artisan'); return; }
  const projects = getProjects();
  const proj = projects.find(p=>p.id===assignTargetProjectId);
  proj.assignedTo = artisanId;
  proj.status = 'In Progress';
  saveProjects(projects);
  assignProjectModal.classList.add('hidden');
  assignTargetProjectId = null;
  renderProjects();
});

// Artisan log inventory modal
let logInventoryTaskId = null;
function openLogInventoryModal(task){
  logInventoryTaskId = task.id;
  logInventoryTaskTitle.textContent = task.title;
  populateInventorySelect();
  logInventoryQty.value = '';
  logInventoryModal.classList.remove('hidden');
}
closeLogInventoryModal?.addEventListener('click', ()=>{ logInventoryModal.classList.add('hidden'); logInventoryTaskId = null; });

saveLogInventoryBtn?.addEventListener('click', ()=>{
  const itemId = Number(logInventorySelect.value);
  const qty = Number(logInventoryQty.value);
  if(!itemId || !qty || qty <= 0){ alert('Enter valid qty'); return; }
  // deduct from inventory
  const inventory = getInventory();
  const item = inventory.find(i=>i.id===itemId);
  if(!item || item.quantity < qty){ alert('Not enough inventory'); return; }
  item.quantity -= qty;
  saveInventory(inventory);
  // add log to task
  const tasks = getTasks();
  const task = tasks.find(t=>t.id===logInventoryTaskId);
  if(!task.usedInventory) task.usedInventory = [];
  task.usedInventory.push({itemId, qty});
  saveTasks(tasks);
  logInventoryModal.classList.add('hidden'); logInventoryTaskId = null;
  // refresh views
  renderInventory();
  renderTasks();
});

// ===== Helpers & boot =====
function bootIfLoggedIn(){
  if(currentUser){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    showDashboardFor(currentUser);
  } else {
    landingPage.classList.remove('hidden');
    authContainer.classList.add('hidden');
    mainApp.classList.add('hidden');
  }
}

bootIfLoggedIn();
