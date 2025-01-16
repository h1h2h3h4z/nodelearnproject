const maxn=[6,3,45,4,2,7,8,12,13,5]
let id=null;
let z=0;
console.log(maxn.length)
for(let i=1 ; i<maxn.length ; i++){
  if(maxn[z]>maxn[i]){
    id=maxn[z];
  }
  else{
   id=maxn[i]
   z=i;
  }

}
console.log(id)