export default function EmailForm() {
    return (
        <div className="modal-container">
          <div className="mb-2">
            Emails Remained 2
          </div>
        
          <div className="w-full my-2 relative z-[0]">

            <input 
              placeholder=" "  
              type="text" 
              id="emailFrom" 
              className="w-full px-1 py-2 mb-3 outline-none text-slate-800  dark:text-slate-200 bg-transparent border-b focus:border-blue-500 border-gray-300 appearance-none peer"
            />
            <label 
              className="absolute left-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              htmlFor="emailFrom"
            >From</label>
          </div>

          <div className="w-full my-2 relative z-[0]">

            <input 
              placeholder=" "  
              type="text" 
              id="emailTo" 
              className="w-full px-1 py-2 mb-3 outline-none text-slate-800  dark:text-slate-200 bg-transparent border-b focus:border-blue-500 border-gray-300 appearance-none peer"
            />
            <label 
              className="absolute left-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              htmlFor="emailTo"
            >To</label>
          </div>

          <div>
            <button className="button w-24 h-8 mt-4">Send</button>
          </div>

        </div>
      )
}