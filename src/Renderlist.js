import React, { useState, useEffect } from 'react';

const Renderlist = (props) => {
    const [list, setList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState('');



    const getNextSetOfData = () => {
        fetch(`http://localhost:3005/getfake?limit=${limit}&offset=${offset}`)
            .then((res) => {
                if (res.status === 200) {
                    setStatus('success')

                    res.json().then((result) => {
                        const arrf = result.map((item) => {
                            return item.title;
                        })
                        setOffset(offset + 10);
                        setList([...list, ...arrf]);
                    })

                } else {
                    setStatus('failed')
                    res.json().then((result) => {
                        setMessage(result.message)
                    })
                }
            })
    }

    window.onscroll = function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

            getNextSetOfData();
        }
    };


    useEffect(() => {
        getNextSetOfData();

    }, [])

    return (
        <>
            <hi>RenderList</hi>

            <table >
                <tbody>
                    {
                        list.map((item, idx) => {
                            return (
                                <>

                                    <tr key={idx} key={idx}>
                                        <td key={Math.random()}>{idx + 1}</td>
                                        <td key={Math.random()}>{item}</td>
                                    </tr>

                                </>
                            )
                        })
                    }
                </tbody>


            </table>

            {status === 'failed' ?
                <h1>{message}</h1>
                : <p>loading...</p>
            }

        </>
    )
}

export default Renderlist;