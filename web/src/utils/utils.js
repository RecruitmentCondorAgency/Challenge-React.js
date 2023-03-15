export const arrayDeleteItem = (arr, item) => {
    for( var i = 0; i < arr.length; i++){ 
      if ( arr[i].name === item.name) { 
          arr.splice(i, 1); 
      }
    }
    return arr
  }