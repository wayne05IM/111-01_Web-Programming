# Web Programming HW#9  

• 全端服務的網址: https://deploy-scoreboard.vercel.app  
• 服務功能簡述: 詳細功能介紹請見 HW06 scorecards  
• Deployment 的流程:  
(1) 打開 Vercel 官網註冊帳號  
(2) 註冊帳號
(3) 將 scoreboard backend 加入 .json 檔  
(4) 在 Vercel 網頁選擇 deploy 加入 mongodb 加密連結  
(5) 將 scoreboard frontend 連線 socket 改為 backend 網址  
(6) 在 Vercel 網頁選擇 deploy yarn 將 frontend deploy  
(7) 完成  
• 遇到的困難以及解決的方式 (經驗分享):  
一開始嘗試使用助教上課所教的 docker + railway 然而照步驟 deploy 發現連線出問題。但 railway 非常難 debug ，因此最後改用 Vercel 發現前後端可以分開 deploy 讓整個過程更簡潔清楚。  