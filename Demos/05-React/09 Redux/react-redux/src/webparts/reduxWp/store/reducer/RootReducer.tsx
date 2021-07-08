const initialState = {
    employees: []
 }
 
 const RootReducer = (state= initialState, action)=>{
     if (action.type === "LOAD_CONTENT") {
         return {
             ...state,
             employees: action.val,
         };
     }
     return state;
 }

 export default RootReducer;