/* Shared school Auth; C++ progress is scoped by immutable UUID/course/run. */
window.CppCloud=(()=>{'use strict';
 const cfg=window.CPP8_CLOUD_CONFIG,client=supabase.createClient(cfg.url,cfg.publishableKey,{auth:{storageKey:'lsts-learning-auth',persistSession:true,autoRefreshToken:true}});
 const api={client,user:null,profile:null,role:'student',enrollment:null,lessons:[],contents:{},states:{},revisions:{},pending:{},conflicts:{},ready:false};
 let generation=0,flushing=false,hydration=null,saveTimer;
 const fail=({data,error})=>{if(error)throw error;return data},clone=x=>JSON.parse(JSON.stringify(x));
 const emit=()=>window.dispatchEvent(new Event('cpp-cloud-change'));
 const status=t=>{api.status=t;emit()};
 const key=()=>`lsts:${api.user.id}:${cfg.courseId}:${cfg.runId}`;
 function store(){if(api.user&&api.enrollment)try{localStorage.setItem(key(),JSON.stringify({pending:api.pending,states:api.states,revisions:api.revisions}))}catch{status('Bộ nhớ máy đầy; tải bài làm để giữ bản sao.')}}
 function reset(){generation++;clearTimeout(saveTimer);api.user=null;api.profile=null;api.enrollment=null;api.role='student';api.contents={};api.states={};api.revisions={};api.pending={};api.conflicts={};api.ready=false;status('Đăng nhập để vào học')}
 async function hydrate(user){
  const ticket=++generation;api.ready=false;api.user=user;status('Đang tải tài khoản và bài làm…');
  const profile=fail(await client.from('learning_profiles').select('*').eq('user_id',user.id).single());
  const role=fail(await client.rpc('learning_staff_access',{p_run:cfg.runId}));
  const enrollment=fail(await client.rpc('learning_enroll',{p_run:cfg.runId}));
  const rows=fail(await client.from('learning_progress').select('lesson_id,state,revision').eq('enrollment_id',enrollment.enrollment_id));
  const contents=fail(await client.from('learning_content').select('lesson_id,payload').eq('course_id',cfg.courseId));
  if(contents.length!==api.lessons.length)throw Error('Chưa được cấp đủ học liệu C++. Liên hệ giáo viên.');
  if(ticket!==generation)return;
  api.profile=profile;api.role=role;api.enrollment=enrollment;api.contents={};api.states={};api.revisions={};api.pending={};api.conflicts={};
  for(const r of rows){api.states[r.lesson_id]=r.state;api.revisions[r.lesson_id]=r.revision}
  for(const r of contents)api.contents[r.lesson_id]=r.payload;
  try{const cache=JSON.parse(localStorage.getItem(key())||'null');if(cache?.pending)for(const [id,p]of Object.entries(cache.pending))if(Object.hasOwn(api.revisions,id)&&p&&typeof p.state==='object'){api.pending[id]=p;api.states[id]=p.state}}catch{}
  api.ready=true;store();status('Đã tải bài làm từ tài khoản');api.flush();
 }
 api.allowed=()=>Boolean(api.user&&api.ready&&api.enrollment);
 api.init=async()=>{
  api.lessons=fail(await client.from('learning_lessons').select('lesson_id,lesson_key,content_version,title,position').eq('course_id',cfg.courseId).eq('content_version',1).order('position'));
  if(api.lessons.length!==6)throw Error('Khóa C++ chưa được cấu hình đủ 6 bài.');
  const session=fail(await client.auth.getSession())?.session;
  if(session){const verified=fail(await client.auth.getUser()).user;if(!verified)throw Error('Phiên đăng nhập không hợp lệ.');await hydrate(verified)}else{api.ready=true;status('Đăng ký / đăng nhập để học')}
  client.auth.onAuthStateChange((event,session)=>{
   if(event==='SIGNED_OUT'){reset();api.ready=true;return}
   if(session&&session.user.id!==api.user?.id){hydration=new Promise((resolve,reject)=>setTimeout(()=>hydrate(session.user).then(resolve,reject),0));hydration.catch(()=>{api.ready=false;status('Chưa tải được tài khoản. Kiểm tra mạng rồi thử lại.')})}
  });
 };
 api.lessonId=id=>api.lessons.find(l=>l.lesson_key===id)?.lesson_id;
 api.state=id=>api.states[api.lessonId(id)]||{};
 api.content=id=>api.allowed()?api.contents[api.lessonId(id)]:null;
 api.save=(id,value)=>{
  if(!api.allowed())return false;const lid=api.lessonId(id);if(!lid)return false;
  const s=clone(value);if(new TextEncoder().encode(JSON.stringify(s)).length>120000){status('Bài làm quá lớn để đồng bộ. Tải bản sao trước khi rời trang.');return false}
  const old=api.pending[lid];api.pending[lid]={state:s,revision:old?.revision??api.revisions[lid],mutation:crypto.randomUUID()};api.states[lid]=s;store();status('Đang chờ lưu lên tài khoản…');clearTimeout(saveTimer);saveTimer=setTimeout(()=>api.flush(),600);return true;
 };
 api.flush=async()=>{
  if(flushing||!api.allowed()||!navigator.onLine)return;flushing=true;const ticket=generation;
  try{for(const lid of Object.keys(api.pending)){
   if(ticket!==generation)break;
   while(api.pending[lid]&&!api.conflicts[lid]&&ticket===generation){
    const p=api.pending[lid],r=fail(await client.rpc('learning_save_progress',{p_enrollment:api.enrollment.enrollment_id,p_lesson:lid,p_revision:p.revision,p_state:p.state,p_mutation:p.mutation}));
    if(ticket!==generation)break;
    if(r.conflict){api.conflicts[lid]=r;status('Có bài làm mới hơn ở máy khác; chọn bản muốn giữ.');break}
    api.revisions[lid]=r.revision;
    if(api.pending[lid]?.mutation===p.mutation){delete api.pending[lid];api.states[lid]=r.state}else if(api.pending[lid])api.pending[lid].revision=r.revision;
    store();
   }
  }if(ticket===generation&&!Object.keys(api.pending).length)status('Đã lưu lên tài khoản')}
  catch{if(ticket===generation)status('Chưa lưu lên tài khoản; đang giữ nháp trên máy này.')}
  finally{flushing=false;emit()}
 };
 api.resolve=(id,local)=>{
  const lid=api.lessonId(id),r=api.conflicts[lid];if(!r)return;
  api.revisions[lid]=r.revision;
  if(local){const p=api.pending[lid];p.revision=r.revision;p.mutation=crypto.randomUUID();api.states[lid]=p.state}else{api.states[lid]=r.state;delete api.pending[lid]}
  delete api.conflicts[lid];store();emit();if(!local)window.CPP_ENGINE?.remoteState?.();api.flush();
 };
 api.admin=async body=>{
  const session=fail(await client.auth.getSession())?.session;
  const r=await fetch(cfg.url+'/functions/v1/learning-admin',{method:'POST',headers:{apikey:cfg.publishableKey,'Content-Type':'application/json',...(session?{Authorization:'Bearer '+session.access_token}:{})},body:JSON.stringify({...body,runId:cfg.runId})});
  const v=await r.json();if(!r.ok||!v.ok)throw Error(v.error||'Chưa thực hiện được.');return v;
 };
 api.signIn=async(email,password)=>{const r=fail(await client.auth.signInWithPassword({email,password}));if(hydration)await hydration;if(!api.allowed()||api.user.id!==r.user.id)await hydrate(fail(await client.auth.getUser()).user)};
 api.signUp=async(sid,name,cls,family,password)=>{if(!/^\d{7}$/.test(sid))throw Error('Mã học sinh cần đúng 7 chữ số.');await api.admin({action:'register_student',studentCode:sid,name,classLabel:cls,family,password});await api.signIn(sid+'@lsts.edu.vn',password)};
 api.signOut=async()=>{await api.flush();fail(await client.auth.signOut({scope:'local'}));reset();api.ready=true};
 api.updateProfile=async fields=>{api.profile=fail(await client.from('learning_profiles').update(fields).eq('user_id',api.user.id).select().single());emit();window.CPP_ENGINE?.profileChanged?.()};
 api.password=async(current,password)=>fail(await client.auth.updateUser({password,current_password:current}));
 api.dashboard=async()=>fail(await client.rpc('learning_dashboard',{p_run:cfg.runId}));
 api.detail=async(uid,id)=>fail(await client.rpc('learning_student_detail',{p_run:cfg.runId,p_user:uid,p_lesson:api.lessonId(id)}));
 window.addEventListener('online',()=>{if(api.user&&!api.ready)hydrate(api.user).catch(()=>status('Chưa tải được tài khoản.'));else api.flush()});
 window.addEventListener('beforeunload',e=>{if(api.user&&Object.keys(api.pending).length){e.preventDefault();e.returnValue=''}});
 return api;
})();
