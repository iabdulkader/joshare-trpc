export default function AddTime() {
    const options = []

    for (var i = 0; i <= 24; i++) {
      options.push(<option className="bg-secondaryBg-light dark:bg-secondaryBg-dark" value={i} key={i}>{i === 0 ? "Select Time" : `${i} Hour`}</option>)
    }

    return (
       <div className="modal-container">
            <div className="mb-2 text-center text-xs">
                <p>Your files will be deleted autometically after 24 hours from creating your session. But You can extend this expiry time upto additional 24 hours. To add time select how many hours you want to extend and click Add Time.</p>
            </div>

            <div className="mb-4">
                <p>Attempts Remaining 2</p>
            </div>

            <div>
                <select 
                    className="bg-transparent border-b border-gray-300 focus:border-blue-500 text-slate-800 outline-none dark:text-slate-200 w-24 h-8 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-secondaryBg-light dark:scrollbar-track-secondaryBg-dark scrollbar-thumb-rounded-lg scrollbar-thin"
                    name="hours" 
                >                
                    {options}
                </select>
            </div>

            <div>
                <button className="button w-24 h-8 mt-4">Send</button>
            </div>
       </div>
      )
}