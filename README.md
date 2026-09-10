# LLLDO Seminar 2569

เว็บลงทะเบียนสัมมนา **เขื่อนและเขาในสายหมอก — ภูมนตรา รีสอร์ท นครนายก** 28–30 ตุลาคม 2569

## โครงสร้าง
- `/` แบบฟอร์มลงทะเบียน responsive สำหรับ PC/iPad/มือถือ
- `/admin` หลังบ้าน: สถิติ, รายชื่อ, ค้น/ตรวจข้อมูล และ QR Code
- Google Sheets เป็นฐานข้อมูลผ่าน Google Apps Script
- อัปเดตแดชบอร์ดทุก 10 วินาที
- รายชื่อบุคลากรนำมาจากไฟล์ PDF ที่ผู้ใช้ส่งให้ และมีตัวเลือกกรณีไม่มีชื่อ

## Deploy ไป Vercel
1. Push repository นี้ขึ้น GitHub แล้ว Import เข้า Vercel
2. ตั้ง Environment Variables:
   - `GOOGLE_APPS_SCRIPT_URL` = URL Web App ของ Google Apps Script
   - `ADMIN_USERNAME` = `admin`
   - `ADMIN_PASSWORD` = `admin1234`
3. Deploy
4. เปิด `/admin` สำหรับหลังบ้าน

> ก่อนใช้งานจริงควรเปลี่ยนรหัสผ่าน `admin1234` เป็นรหัสผ่านที่แข็งแรง

## Google Sheets
1. สร้าง Google Sheet ใหม่
2. Extensions → Apps Script
3. คัดลอก `gas/Code.gs` ไปวาง
4. Deploy → New deployment → Web app
5. Execute as: Me
6. Who has access: Anyone
7. นำ URL `/exec` มาใส่ใน `GOOGLE_APPS_SCRIPT_URL` บน Vercel

Apps Script จะสร้างชีต `Registrations` และหัวตารางให้อัตโนมัติ

## รูปภาพสถานที่
หน้าเว็บมีโครงสร้างพร้อมสำหรับเพิ่มภาพบรรยากาศสถานที่ หากมีภาพล่องแก่ง ATV เขื่อนขุนด่านปราการชล และภูมนตรา รีสอร์ท ให้วางไว้ใน `public/images/` แล้วเพิ่มเป็นการ์ดภาพในหน้าแรกได้โดยไม่ต้องเปลี่ยนระบบลงทะเบียน
