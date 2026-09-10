'use client'
import {useState} from 'react'
import {people} from '@/lib/people'

const allergyOptions=['นม/ผลิตภัณฑ์จากนม','ไข่','ถั่วลิสง','ถั่วเปลือกแข็ง','แป้งสาลี/กลูเตน','ถั่วเหลือง','ปลา','กุ้ง/สัตว์น้ำเปลือกแข็ง','หอย','งา','อื่นๆ']
const activityOptions=['เข้าร่วมกิจกรรม เวลา 08.30-12.00 น. (มีอาหารกลางวัน) ไม่ร่วมกิจกรรมสัมมนาที่ ภูมนตรา รีสอร์ท','เข้าร่วมกิจกรรมและร่วมกิจกรรมสัมมนาที่ ภูมนตรา รีสอร์ท','ไม่เข้าร่วมกิจกรรมทั้งหมด','อื่นๆ']

export default function Home(){
 const [form,setForm]=useState<any>({person:'',name:'',department:'',position:'',phone:'',email:'',follower:false,count:0,ages:[],allergies:[],diet:'ปกติ',activity:'',subActivity:'',otherActivity:'',signature:''})
 const [status,setStatus]=useState('')
 const set=(k:string,v:any)=>setForm((x:any)=>({...x,[k]:v}))
 const selected=people.find(p=>p.name===form.person)
 const submit=async(e:any)=>{e.preventDefault();setStatus('กำลังบันทึก...');
   const payload={...form,name:form.person==='__other__'?form.name:form.person,department:form.person==='__other__'?'บุคคลภายนอก/ไม่มีรายชื่อ':selected?.department,position:form.person==='__other__'?'':selected?.position}
   const r=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const j=await r.json();
   setStatus(r.ok?'ลงทะเบียนเรียบร้อยแล้ว ✓':j.error||'เกิดข้อผิดพลาด')
   if(r.ok) window.scrollTo({top:0,behavior:'smooth'})
 }
 return <><header className="hero"><div className="wrap"><div className="eyebrow">LLLDO • 2569</div><h1>เขื่อนและเขา<br/>ในสายหมอก</h1><p>แบบฟอร์มลงทะเบียนเข้าร่วมกิจกรรมสัมมนา<br/><b>ภูมนตรา รีสอร์ท นครนายก</b> • 28–30 ตุลาคม 2569</p></div></header>
 <main className="card"><form onSubmit={submit}>
 {status&&<div className={status.includes('เรียบร้อย')?'success':'error'}>{status}</div>}
 <section className="section"><h2>01 · ข้อมูลทั่วไป</h2><div className="grid">
 <div className="field full"><label>ชื่อ–นามสกุล *</label><select required value={form.person} onChange={e=>set('person',e.target.value)}><option value="">เลือกชื่อจากรายชื่อบุคลากร</option>{Object.entries(people.reduce((a:any,p)=>{(a[p.department]??=[]).push(p);return a},{})).map(([d,ps]:any)=><optgroup key={d} label={d}>{ps.map((p:any)=><option key={p.name} value={p.name}>{p.name}</option>)}</optgroup>)}<option value="__other__">ไม่มีชื่อในรายชื่อ — ลงชื่อใหม่</option></select></div>
 {form.person==='__other__'&&<div className="field full"><label>ชื่อ–นามสกุล (กรณีไม่มีรายชื่อ) *</label><input required value={form.name} onChange={e=>set('name',e.target.value)}/></div>}
 <div className="field"><label>โทรศัพท์ *</label><input required value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="08x-xxx-xxxx"/></div><div className="field"><label>อีเมล</label><input type="email" value={form.email} onChange={e=>set('email',e.target.value)}/></div>
 <div className="field full"><label>มีผู้ติดตามหรือไม่?</label><div className="choice"><label><input type="radio" checked={form.follower===true} onChange={()=>set('follower',true)}/> มีผู้ติดตาม</label><label><input type="radio" checked={form.follower===false} onChange={()=>set('follower',false)}/> ไม่มีผู้ติดตาม</label></div></div>
 {form.follower&&<><div className="field"><label>จำนวนผู้ติดตาม</label><input type="number" min="1" max="10" value={form.count} onChange={e=>{const n=+e.target.value;setForm((x:any)=>({...x,count:n,ages:Array.from({length:n},(_,i)=>x.ages[i]||'')}))}}/></div><div className="field full"><label>อายุผู้ติดตาม (คั่นด้วย , )</label><input value={form.ages.join(', ')} onChange={e=>set('ages',e.target.value.split(',').map((x:string)=>x.trim()))} placeholder="เช่น 12, 35"/></div></>}
 </div><p className="hint">กรณีสอบถามค่าใช้จ่าย กรุณาติดต่อธุรการฝ่ายจัดสัมมนา</p></section>
 <section className="section"><h2>02 · อาหารและข้อจำกัดด้านอาหาร</h2><div className="grid"><div className="field"><label>รูปแบบอาหาร</label><select value={form.diet} onChange={e=>set('diet',e.target.value)}><option>ปกติ</option><option>อาหารเจ</option><option>มังสวิรัติ</option><option>วีแกน</option><option>อิสลาม (ฮาลาล)</option><option>อื่นๆ</option></select></div><div className="field"><label>รายละเอียดเพิ่มเติม</label><input value={form.dietOther||''} onChange={e=>set('dietOther',e.target.value)} placeholder="เช่น ไม่ทานเนื้อวัว"/></div><div className="field full"><label>แพ้อาหาร — เลือกได้หลายรายการ</label><div className="choice">{allergyOptions.map(a=><label key={a}><input type="checkbox" checked={form.allergies.includes(a)} onChange={e=>set('allergies',e.target.checked?[...form.allergies,a]:form.allergies.filter((x:string)=>x!==a))}/>{a}</label>)}</div></div><div className="field full"><label>รายละเอียดอาการแพ้/อาหารที่ต้องหลีกเลี่ยง</label><textarea rows={3} value={form.allergyDetail||''} onChange={e=>set('allergyDetail',e.target.value)}/></div></div></section>
 <section className="section"><h2>03 · กิจกรรม วันพุธที่ 28 ตุลาคม 2569</h2><div className="field"><label>เลือกการเข้าร่วม *</label><select required value={form.activity} onChange={e=>set('activity',e.target.value)}><option value="">กรุณาเลือก</option>{activityOptions.map(x=><option key={x}>{x}</option>)}</select></div>{form.activity===activityOptions[1]&&<div className="field" style={{marginTop:16}}><label>เลือกกิจกรรมที่สนใจ</label><select value={form.subActivity} onChange={e=>set('subActivity',e.target.value)}><option value="">กรุณาเลือก</option><option>ล่องแก่งเขื่อนขุนด่านปราการชล</option><option>ขับ ATV เขื่อนขุนด่านปราการชล</option><option>พักผ่อนอยู่รีสอร์ท</option><option>อื่นๆ</option></select>{form.subActivity==='อื่นๆ'&&<textarea style={{marginTop:10}} rows={3} placeholder="ระบุรายละเอียด" value={form.otherActivity} onChange={e=>set('otherActivity',e.target.value)}/>}</div>} {form.activity==='อื่นๆ'&&<div className="field" style={{marginTop:16}}><label>รายละเอียด</label><textarea rows={3} value={form.otherActivity} onChange={e=>set('otherActivity',e.target.value)}/></div>}</section>
 <section className="section"><h2>04 · ยืนยันการลงทะเบียน</h2><div className="field"><label>ลงชื่อผู้เข้าร่วม *</label><input required value={form.signature} onChange={e=>set('signature',e.target.value)} placeholder="พิมพ์ชื่อเพื่อยืนยันการลงทะเบียน"/><span className="hint">สำหรับผู้ที่ไม่มีชื่อในไฟล์รายชื่อ ให้ลงชื่อในช่องนี้ด้วย</span></div></section>
 <div className="actions"><button className="btn primary" type="submit">ยืนยันการลงทะเบียน</button></div>
 </form></main><footer className="footer">Lifelong Learning Development Office • Kasetsart University</footer></>
}