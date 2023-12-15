import React from 'react'
import './component.css'
import {getLocations,isNameValid} from '../mock-api/apis'
const Mock = () => {

    const [locations, setLocations] = React.useState([])
    const [name, setName] = React.useState('')
    const [location, setLocation] = React.useState('')
    React.useEffect(() => {
        getLocations().then(res => {
            setLocations(res)
            setLocation(res[0])
        })
         
    }
    , [])
   
    async function addData() {  
        console.log(name, location)
        const data =  [{name, location}]
        const res = await isNameValid(data)
        if(!res){
            alert('Name already exists')
        }
        else{
            alert('Name added');
            const items = JSON.parse(localStorage.getItem('data')) || [];
             console.log(items)
            items.push({name, location})
            localStorage.setItem('data',  JSON.stringify(items));
            window.location.reload();
        }


    }
  return (
    <main id='container'>
    <div id='grid'>

        <section >
           <div className='firstInputBlock'>
           <label htmlFor='name'>Name</label>
            <input type="text" id='name' placeholder="" onChange={(e) => setName(e.target.value)} />
           </div>
           
        </section >
        <section  className='firstInputBlock'>
        <label htmlFor="location">Location</label>
            <select name="location" id="location"  onChange={(e)=>  {
                    
                    setLocation(e.target.value)
                }}>
                {locations && locations.map((location, index) => <option  key={index} value={location}>{location}</option>)}
            </select>
        </section>
        <section  className='button-group'>
            <button id='clearButton'>Clear</button>
            <button onClick={addData} id='addButton'>Add</button>
        </section>
        <section className='tableSection'>
            <table className='table'>
                <thead className=' ' >
                    
                        <th className='thead1'>Name</th>
                        <th className='thead2'>Location</th>
                         
                   
                </thead>
                <tbody>
                         {JSON.parse(localStorage.getItem('data')) && JSON.parse(localStorage.getItem('data')).map((item, index) => {
                                return (
                    <tr>
                                    
                                        <td className='tbody1'>{item.name}</td>
                                        <td className='tbody2'>{item.location}</td>
                                    
                      
                         
                            
                    </tr>
                                )
                            }
                            )}
                    
                    
                </tbody>
            </table>
        </section>
    </div>
    
    </main>
  )
}

export default Mock