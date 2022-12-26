import React, { useEffect, useState,useRef } from 'react';
import HeadlessTipply from '@tippyjs/react/headless';
import {CircleX, Loading, SearchIcon} from '@/components/Icons';
import AccountItem from '@/components/AccountItem';
import { Wrapper as PopperWrapper } from '@/components/Popper';

import * as searchServices from '@/services/searchService';
import className from 'classnames/bind';
import styles from './Search.module.scss';

import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataSearchAccount } from '@/interfaces';
import { useDebounce } from '@/hooks';

const cx = className.bind(styles);



const Search: React.FC = () => {
    //STATE
    const [searchValue,setSearchValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Array<DataSearchAccount>>([]);
    const [showResult,setShowResult] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);

    //Khi người dùng gõ nếu dừng lại 500 mili giây thì mới bắt đầu tìm kiếm
    //1:
    //2 'h'
    //3 ''
    const debouncedValue = useDebounce(searchValue,500);
    
    // useRef
    const inputRef = useRef<HTMLInputElement>(null);
      //useEffect
      useEffect(() => {
          //check space
        if(!debouncedValue.trim()) {
            setSearchResult([])
            return;
        }
       
        //call api
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        }

        fetchApi();

    }, [debouncedValue]);

    //handle
    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current?.focus()
    };
    const handleHideResult = () => {
        setShowResult(false)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target?.value;
        if(!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    }



  return (
    /* Using a wrapper <div> or <span> tag around the reference element solves 
    this by creating a new parentNode context*/
    <div>
        <HeadlessTipply
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
            <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                <PopperWrapper>
                    <h4 className={cx('search-title')}>Accounts</h4>
                    {searchResult.map((result) => (
                        <AccountItem key = {result.id} data={result}/>
                    ))}
                   
                </PopperWrapper>
            </div>
        )}
        onClickOutside={handleHideResult}
    >
        <div className={cx('search')}>
            <input 
            ref={inputRef}
            value={searchValue}
            placeholder='Search accounts and videos' 
            spellCheck={false} 
            onChange={handleChange} 
            onFocus={()=>setShowResult(true)}
            />
            {/* Khi có Search value + không loading thì mới hiện thị Button X */}
            {!!searchValue && !loading && (
    
            <button className={cx('clear')} onClick={handleClear}>
                {/* Clear */}
                <FontAwesomeIcon icon={faCircleXmark as IconProp} />
                {/* <CircleX  className={cx('button')}/> */}
                
            </button>
            )}
    
            {/* Loading */}
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner as IconProp} />}
            {/* {loading && <Loading className={cx('loading')} />} */}
            
            <button className={cx('search-btn')} onMouseDown={e=>e.preventDefault()}>
                {/* Search */}
                {/* <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} /> */}
                {/* <img src = {images.search} /> */}
                <SearchIcon />
            </button>
        </div>
    </HeadlessTipply>
    </div>
  )
}

export default Search;