import React, { useContext, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { apiConnector } from '../services/apiConnector'
import { query_endpoints } from '../services/apis'
import Spinner from './Spinner';

const SearchComponent = () => {
    const {output, setOutput}  = useContext(AppContext);
    const {loading, setLoading}  = useContext(AppContext);
    const [inputquery, setInputQuery] = useState('');
    const [bool, setBool] = useState(false);
    const recentQueries = ["too exhausted bro", "nothing can be undone", "too exhausted bro", "nothing can be undone", "too exhausted bro", "nothing can be undone"];
    const [request, setRequest] = useState(false);
    const clickhandler = () => {
        if (inputquery.length === 0) {
            alert('Please enter a valid query!')
            return;
        } else {
            setLoading(true);
            setRequest(true);
            getData(inputquery);
        }
    }
    
    const getData = async (input) => {
        try {
            const response = await apiConnector("POST" , query_endpoints.NEW_QUERY_API , {input} );
            setOutput(response.data.newEntry)
            console.log("API response : " , response.data);
            setBool(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    
    // useEffect(() => {
    //     getData(inputquery);
    // }, [])
    
  return (
    <div className=' max-w-[70%] flex flex-col gap-y-10 border-0 '>

        <div className='text-[#FFF] text-[36px] font-medium'>
            <h1 className='text-center text-slate-350'>Cut through the Noise, Focus on What Matters.</h1>
        </div>

        <div className='relative border-[1.5px] rounded-full bg-[#a4c3b2] py-2 px-3'>
            <input type="text" placeholder="Ask anything..." value={inputquery} onChange={e=>setInputQuery(e.target.value)}
                className='bg-[#a4c3b2] outline-none placeholder-gray-500 w-11/12 my-3 mx-10 text-xl'/>
            <button className='bg-[#4c6d5f] hover:bg-[#52796f] rounded-full p-1.5 shadow-md absolute bottom-4 right-5' onClick={clickhandler}><ArrowRight className='text-white text-xl'/></button>
            {/* <button>Attach</button> */}
        </div>
        <div className='flex flex-col items-center'>
        {
            loading ? (<div className='flex'>
                    <Spinner />
                    </div>) : (
                (!bool)  ? (request && <div>No Data Found! Try Again Later...</div>) : (
            <div>
                <div>
                    <p className='text-lg font-normal text-gray-800'>{output.summary}</p>
                </div>
                <div>
                    {/* {
                        output.source.map( (item , index) => (<a href={item} target='_blank' rel='noreferrer' key={index}>{item}</a>))
                    } */}
                </div>
            </div>)
            )
        }
        </div>
        {/* <div className='mt-[-50px]'>
            <MinSlider range={range} setRange={setRange}/>
        </div> */}

        { recentQueries && <div className='flex gap-x-5 gap-y-3 flex-wrap justify-center'>
                Recent Queries:
                {
                    recentQueries.map((query, index) => {
                        return(<button key={index} className='block border py-1 px-2 rounded-full'>{query}</button>)
                    })
                }
            </div>
        }
    </div>
  )
}

export default SearchComponent