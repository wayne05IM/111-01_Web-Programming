## Final Project - Shadowverse Toolbox Readme 第13組  

[111-1] Web Programming Final  
1. 專題題目名稱: (Group 13) Shadowverse Toolbox  
2. Demo 影片連結: https://www.youtube.com/watch?v=zj_nVz2lCFA
3. 描述這個服務在做什麼: 
    為卡牌遊戲 shadowverse 的玩家提供一個查詢及分享資訊的平台，功能包括卡片圖鑑、牌組分享及攻略文章查詢等  
4. Deployed 連結: https://shadowverse-tool-box.vercel.app  
5. 使用/操作方式:  
    server: 無操作方式，皆由前端操作控制。會透過對應的 axios API 去 mongodb 資料庫取回、放入資訊印出所取放內容並回傳給前端。  
    user: 連到網址後，會顯示 Home Page 分別會有置頂文章、精選牌組、攻略專欄以及活動時程。點擊內容即可顯示更詳細的資訊（如：點擊牌組會顯示出牌組內的卡牌資訊、點擊置頂文章或攻略能會顯示文章內容）。  
    而主要的分頁有三: 卡牌圖鑑、卡組分享、精選文章，各分頁功能如下  
    卡牌圖鑑:點進之後可以看到所有卡片的圖像，並可以用職業、費用等條件篩選卡牌。在點擊卡片圖像後會出現該卡牌的詳細資訊。  
    卡組分享:可以看到其他使用者分享的卡組內容，使用者在登入後可點擊右上角的分享牌組選擇想要分享的卡片組合，並且加上卡組名稱與簡介分享。點擊牌組會顯示出牌組內的卡牌資訊。  
    精選文章:可以看到所有文章的條目，點擊即可閱讀文章。在登入後可撰寫文章。  
    登入、註冊功能:
    登入後可看到用戶的個人頁面，包含名字、階級等資訊，並可以使用分享牌組及撰寫文章的功能。
    分享牌組的畫面會根據所選的職業顯示出可編入的卡片，再讓用戶依此將卡牌加入牌組中。
    撰寫文章方面則是會要求輸入標題及內容後發布。
6. Github link: https://github.com/sky456757/shadowverse-toolBox  
7. 其他說明: We deploy backend on Railway, frontend on Vercel.
8. 使用與參考之框架/模組/原始碼:  
    Frontend: ReactJS, MUI (Material UI), Axios (connect with backend)  
    Backend: Axios, Restful API (connect with frontend), Mongoose (connect to mongodb)   
9. 使用之第三方套件、框架、程式碼: 從零開始並參考網服課程所學內容及一些教學寫成  
10. 專題製作心得: 
    原本，網頁設計似乎是一門遙遠且高深莫測的技術，在經過一學期對於前端、後端及資料庫等領域的了解後，我們決定期末專題要實作一個卡牌遊戲 shadowverse 的資訊管理網站。隨著專案內容的推進，前端、後端的逐漸成形，整門課程的所學也一點一滴地融於其中。期末專案有如這個學期的集大成，我們從零到有生出這個專案，其中包括了我們的心血，也是對於自己網頁程式能力的證明。曾幾何時，網頁設計已不是難以理解的無字天書，而是一項充滿自由、創意及巧思的創作過程。期末專案並不是句號，而是一個逗號，網路技術的發展日新月異，我們只需不斷精進，相信在不久的將來，我們的程式設計能力將會更進一步。在團隊合作過程中，發現負責前端與後端組員間互相溝通需要的功能，與如何在寫完後順利接在一起，需要組員間充分討論、理解與對服務內容、socket 的深入了解。做完這次專題發現如何溝通、理解組員想法是一件非常重要事。最後，我們也深信此期末專題未來能有很廣泛的應用，任何卡牌遊戲或資源管理、分享的專案只要調整資料內容與欄位都能透過我們期末專題的架構實現成非常實用、清楚的網頁版管理、分享介面。  
    
11. localhost 安裝與測試之詳細步驟:  
    backend: (1) cd backend (2) yarn  (3) yarn server  
    frontend: (1) cd frontend (2) yarn (3) yarn start  
    database: Please add "MONGO_URL= mongodb+srv://B09705031:B09705031@cluster0.tl2ptbz.mongodb.net/shadowverse?retryWrites=true&w=majority" in a .env under backend folder so that the backend can connect to our database.  
12. 負責項目:  
    B09705030 柯師為 backend, connect backend and frontend  
    B09705031 李奕杰 frontend, connect backend and frontend  
    B09705039 劉惟恩 backend, connect backend and frontend  