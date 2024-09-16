import { useState,useCallback,useEffect ,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [isnumber, setIsnumber]=useState(false)
  const [ischar, setIschar]=useState(false)
  const [Password, setPassword]=useState("")
  const [iscopied,setIscopied]=useState(false)

  const passwordRef = useRef(null)
  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isnumber) str+="0123456789"
    if(ischar) str+="!@#$%^&*()"
    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)

  },[isnumber,length,ischar,setPassword])
  useEffect(()=> {
    passwordGenerator()
  }
  ,[length,ischar,isnumber,passwordGenerator])
  const copyToClipboard=useCallback(()=>{

    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password);
    setIscopied(true)
    setTimeout(()=>{
      setIscopied(false)
    },1500)
  },[Password])

  
  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 my-20 shadow-sm bg-gray-800 text-amber-600 ">
      <div className='flex justify-center gap-3'>
      <input type="text"
      value={Password}
      readOnly
      placeholder='password' className="outline-none  rounded-md border-red-200 w-7/12 px-4 py-3 my-20  cursor-not-allowed"
      ref={passwordRef} />
      <button className='outline-none w-2/12 h-fit py-4  my-20 bg-blue-900 text-white rounded-lg' onClick={copyToClipboard}>{iscopied?"Copied!":"Copy"}</button>
      </div>
      <div className='flex gap-4'>
      <div className='flex text-sm gap-2 px-2 py-1'>
        <input type="range" className='cursor-pointer bg-blue-700' 
        min={5} max={50}
        value={length}
        onChange={(e)=>setLength(e.target.value)}
        />
        <div>Length:{length}</div>

      </div>
      <div className='flex text-sm gap-2'>
        <input type="checkbox" defaultChecked={isnumber} id='numberInput' onChange={()=>{setIsnumber((prev)=> !prev)}} />
        <div>Number</div>
        <input type="checkbox" defaultChecked={ischar} id='charInput' onChange={()=>{setIschar((prev)=> !prev)}} />
        <div>Character</div>

      </div>
      </div>
      
    </div>
    
  )
}

export default App
