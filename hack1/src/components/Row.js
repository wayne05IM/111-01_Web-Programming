/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';
import { getByDisplayValue } from "@testing-library/react";


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            <div className='Row-wrapper'>
                {typeof guess == 'undefined'?
                    <>
                        <div id={JSON.stringify(rowIdx) + "-" + "0"} key={JSON.stringify(rowIdx) + "-" + "0"} className='Row-wordbox'></div>
                        <div id={JSON.stringify(rowIdx) + "-" + "1"} key={JSON.stringify(rowIdx) + "-" + "1"} className='Row-wordbox'></div>
                        <div id={JSON.stringify(rowIdx) + "-" + "2"} key={JSON.stringify(rowIdx) + "-" + "2"} className='Row-wordbox'></div>
                        <div id={JSON.stringify(rowIdx) + "-" + "3"} key={JSON.stringify(rowIdx) + "-" + "3"} className='Row-wordbox'></div>
                        <div id={JSON.stringify(rowIdx) + "-" + "4"} key={JSON.stringify(rowIdx) + "-" + "4"} className='Row-wordbox'></div>
                    </>
                    :
                    guess.map((item, itemindex) => {
                        return (
                            itemindex < 5 ?
                                <div id={JSON.stringify(rowIdx) + "-" + JSON.stringify(itemindex)} key={JSON.stringify(rowIdx) + "-" + JSON.stringify(itemindex)} className={'Row-wordbox' + item.color}>{item.char}</div>
                                :
                                <></>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Row;