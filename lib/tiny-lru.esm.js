class t{constructor(t=0,s=0){this.first=null,this.items={},this.last=null,this.max=t,this.size=0,this.ttl=s}has(t){return t in this.items}clear(){return this.first=null,this.items={},this.last=null,this.size=0,this}delete(t){if(this.has(t)){const s=this.items[t];delete this.items[t],this.size--,null!==s.prev&&(s.prev.next=s.next),null!==s.next&&(s.next.prev=s.prev),this.first===s&&(this.first=s.next),this.last===s&&(this.last=s.prev)}return this}evict(){const t=this.first;return delete this.items[t.key],this.first=t.next,this.first.prev=null,this.size--,this}get(t){let s;if(this.has(t)){const i=this.items[t];this.ttl>0&&i.expiry<=(new Date).getTime()?this.delete(t):(s=i.value,this.set(t,s,!0))}return s}keys(){return Object.keys(this.items)}set(t,s,i=!1){const e=this.ttl>0?(new Date).getTime()+this.ttl:this.ttl;let h;if(i||this.has(t)){if(h=this.items[t],h.expiry=e,h.value=s,this.last!==h){const t=this.last,s=h.next,i=h.prev;this.first===h&&(this.first=h.next),h.next=null,h.prev=this.last,t.next=h,null!==i&&(i.next=s),null!==s&&(s.prev=i)}}else this.max>0&&this.size===this.max&&this.evict(),h=this.items[t]={expiry:e,key:t,prev:this.last,next:null,value:s},1==++this.size?this.first=h:this.last.next=h;return this.last=h,this}}export default function(s=1e3,i=0){if(isNaN(s)||s<0)throw new TypeError("Invalid max value");if(isNaN(i)||i<0)throw new TypeError("Invalid ttl value");return new t(s,i)}