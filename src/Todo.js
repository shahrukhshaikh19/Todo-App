import React,{useState,useEffect} from 'react';
import './Todo.css';
export default function Todo() {
    const[InputData,SetInputData] = useState('');
    const[items,SetItems] = useState([]);  //jo meri InputData state me input k through value rahegi me usko items name ki state me daal duga onClick pe function pass krke
    const[togglesubmit,setToggleSubmit] = useState(true);
    const[edited,setEdited] = useState(null);
    const addItem=()=>{
        /*spread operator example:-- 
        let name = ["shaikh","shahrukh"]
        let biodata = [...name,"address"] mere biodata me name bhi chiye hoga to usko firse likhne ki bajaye me name array ko spread operator ki madad se directly biodata arra me three dots(...) ki madad se ab us anme array me jo bhi add hota jayega vo mere biodata array me bhi aajayega
        */ 
       //first mere items state me InputData me jo rahega vo aayega lekin agar mene pahle apple likh aor uske baad mango likha to mango apple ko replace kr lega items me save nahi hoga to setItems(...items,InputData) krne se items har baar data alaga alag index pe add hota jayega
       if(!InputData){
            alert("Input can't be blank");
       } else if(InputData && !togglesubmit){
           SetItems(items.map((elem)=>{
                if(elem.id===edited){
                   return {...elem,name:InputData}    // V.VIMP poins:-- array k form  me data hai isiliye return me array k form me hua
                    /* return{...elem,InputData} V.VIMP poins:-- object k  form  me data agr raha to object {} means cury braces me data return krna hoga */
                }
                return elem;
           }))
           setToggleSubmit(true);
        SetInputData('');
        setEdited(null);
       }
       else{
           const allInputData = {id:new Date().getTime().toString(), name:InputData}; //jo pahle hum delete ya edit krne k liye direct index pass krke kaam kr rahe the vo abrhe projects me problem create krta hai isiliye ye method use krte hai.ab mujhe allInputData me se name chaiye ya id to simply allInputData.name ya id k liye allInputData.id use kruga 
           //SetItems([...items,InputData]); //(mene InputData ko array me iss liye likha q k mujhe array k form me chaiye aor meri items state bhi array k form me hai)jo bhi mera InputData me hoga vo mere items me aajayega
           SetItems([...items,allInputData]); //(mene InputData ko array me iss liye likha q k mujhe array k form me chaiye aor meri items state bhi array k form me hai)jo bhi mera InputData me hoga vo mere items me aajayega
           SetInputData(''); //jaise add button pe click kruga input field blank hojayegi isse vrna aesa na kiya to agat mene apple likha aor add button pe click kiya to bhi input field me apple rahega aor vo accha nahi dikhega
       }
    }
    const deleteItem=(index)=>{
        const UpdatedTodo = items.filter((item)=>{
            //return console.log(i,ind);
            return index != item.id; //jaise hi me delete button(-) pe click kruga deleteItem() function kaam krega jisme humne parameter pas kiya hai (i =index of element) jo index hai elemnt ki jispe bhi click krege hum..to ab index agai element ki ab filter() function me items[] k sabhi indexes hai vo return krege jo element pe click kiya uske alava sare element aor selected element filter() function k zriye se remove hojayega aor hum SetItems(UpdatedToda) krdege state update hojayegi;
        })
        SetItems(UpdatedTodo);
    }
    const edititem=(index)=>{
        let newEditItem = items.find((elem)=>{
            return elem.id=== index;
        })
        console.log(newEditItem);
        setToggleSubmit(false);
        SetInputData(newEditItem.name); //agr sirf newEditItem like to [object object] dikhaye q k ye ek object me hai abi isilie .name lagake sirf name dikahyege 
        setEdited(index);
    }
    
    useEffect(()=>{
        //agr local storage me empty hai to error deta hai jab fir time site ko access krege hum isiliye empty check krne k liye tornury operator use kiye
        const localItems = localStorage.getItem("items") !=null ? JSON.parse(localStorage.getItem("items")) : [];
        SetItems(localItems);
    },[]); //jab useEffect me dependancy [] array empty rakhte hai to vo ComponentDidMount vala kaam karta hai

    useEffect(()=>{
        localStorage.setItem("items", JSON.stringify(items));
    },[items]);//jab useEffect me dependancy lgate hai to componentDidUpdate vala kaam krta hai
    return (
        <div className="todo-app">
            <div>
                <h1>My Todo WebApp</h1>
                {/*ab input ki value state pe dependent hai jab tak state change nahi kruga uss me kuch type nahi kr sakta aor onChange pe me State change krke uski value ko target kr sakta hu*/}
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
