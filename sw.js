/* 알림 받기(웹 푸시) 서비스 워커 — 화면을 저장해 두지 않고 알림만 처리합니다 */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('push',function(e){
  var d={};try{d=e.data.json()}catch(x){d={title:'알림',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'알림',{body:d.body||'',icon:'safety-192.png',badge:'safety-192.png',data:{url:d.url||'safety.html'}}))});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var u=new URL((e.notification.data&&e.notification.data.url)||'safety.html',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){var c=cs[i];if(c.url.indexOf('safety.html')>=0&&'focus' in c){try{c.navigate(u)}catch(x){}return c.focus()}}
    return self.clients.openWindow(u)}))});
