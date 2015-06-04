export default function compact(obj) {
  let ret = {}
  for(var key in obj) {
    if(obj[key] != false){
      ret[key] = obj[key];
    }
  }
  return ret;
}