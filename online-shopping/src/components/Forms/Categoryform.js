import React from 'react'

const Categoryform = ({handleSubmit,value,setValue}) => {
    console.log(value)
    return (
        <>
            <section>
                <div className='p-2'>
                    <form  onSubmit={handleSubmit} className="w-full max-w-sm" >
                        <div className="flex items-center border-b border-teal-500 py-2 shadow-md">
                            <input
                            value={value}
                            onChange={(e)=>setValue(e.target.value)}
                            className="appearance-none bg-transparent 
                             border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight
                            focus:outline-none" type="text" placeholder="Jane Doe"
                            aria-label="Full name" />
                            <button  type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                                Create Category
                            </button>
                            <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                                Cancel
                            </button>
                        </div>
                    </form>

                </div>
            </section>
        </>
    )
}

export default Categoryform