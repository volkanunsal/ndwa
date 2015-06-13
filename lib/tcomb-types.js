import moment from 'moment';
import t from 'tcomb-form';


export var TRecipient = t.struct({
  name: t.Str,
  age: t.Num,
  description_of_care: t.Str
});

export var TStartDate = t.subtype(t.Dat, function(value){
  return moment(new Date()).isBefore(value)
})
export var TNonZero = t.subtype(t.Num, function(value){
  return value > 0
})
export var TValidWorkSchedule = t.subtype(t.Bool, function(value){
  return value == true
})