import { IoIosSearch } from 'react-icons/io';

export default function HomeInput() {
    return(
        <div className="w-full flex justify-center">
            <div className="w-full h-12 bg-transparent max-w-[250px] lg:max-w-[300px] flex items-center border border-bg-dark dark:border-bg-light rounded-lg">
                <input 
                    className="w-full h-full border-none outline-none bg-transparent px-5" 
                    type="number" 
                    placeholder="Paste pin..." 
                />

                <IoIosSearch className='cursor-pointer mx-5 text-bg-dark dark:text-bg-light h-12 w-8' />
            </div>
            
        </div>
        )
    }