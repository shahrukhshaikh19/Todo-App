import React,{useState,useEffect} from 'react';
import './Todo.css';
export default function Todo() {
    const[InputData,SetInputData] = useState('');
    const[items,SetItems] = useState([]);  
    const[togglesubmit,setToggleSubmit] = useState(true);
    const[edited,setEdited] = useState(null);
    const addItem=()=>{
        
       if(!InputData){
            alert("Input can't be blank");
       } else if(InputData && !togglesubmit){
           SetItems(items.map((elem)=>{
                if(elem.id===edited){
                   return {...elem,name:InputData}
                }
                return elem;
           }))
           setToggleSubmit(true);
        SetInputData('');
        setEdited(null);
       }
       else{
           const allInputData = {id:new Date().getTime().toString(), name:InputData}; 
           SetItems([...items,allInputData]); 
           SetInputData(''); 
       }
    }
    const deleteItem=(index)=>{
        const UpdatedTodo = items.filter((item)=>{
            
            return index != item.id; 
        })
        SetItems(UpdatedTodo);
    }
    const edititem=(index)=>{
        let newEditItem = items.find((elem)=>{
            return elem.id=== index;
        })
        
        setToggleSubmit(false);
        SetInputData(newEditItem.name); 
        setEdited(index);
    }
    
    useEffect(()=>{
        
        const localItems = localStorage.getItem("items") !=null ? JSON.parse(localStorage.getItem("items")) : [];
        SetItems(localItems);
    },[]); 

    useEffect(()=>{
        localStorage.setItem("items", JSON.stringify(items));
    },[items]);
    return (
        <div className="todo-app">
            <div>
                <h1>My Todo WebApp</h1>
                
                <input id="task" className="todo-input" value={InputData} onChange={(event)=> SetInputData(event.target.value)} type="text" placeholder="✍ Add item to your list"/>
                { 
                    togglesubmit?<button id="btn" className="todo-button" title="Add Item" onClick={addItem}>➕</button>:
                    <button className="todo-button list" title="Update Item" onClick={addItem}>✏️</button>
                }       
            </div>
            
            <div >
                {
                    items.map((item)=>{
                        return(
                            <div key={item.id} className="todo-row">
                                <span className="todo-row">{item.name}</span> 
                                <button className="todo-delete" title="Delete Item" onClick={()=>deleteItem(item.id)}>➖</button>
                                <button className="todo-button" title="Edit Item" onClick={()=>edititem(item.id)}>✏️</button>
                        </div>
                        )
                    })
                }
            
            </div>
                    
               
           
            <div>
                <button className="todo-button" onClick={()=>SetItems([])}>Remove all</button>
            </div>
            </div>
    )
}
