'use client'

import { useCallback, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useLanguage } from "@common/LanguageContext";

const SearchBarModule = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { t } = useLanguage()
    
    const query = searchParams.get('key') || '';

    const [search, setSearch] = useState(query);

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
        
            return params.toString()
        },
        [searchParams]
    )

    const searchChangeHandler = event => {
        setSearch(event.target.value);
    };

    const searchPressHandler = event => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            router.push("/search" + '?' + createQueryString('key', search))
        }
    };

    return (
        <div className="sb-group-input sb-group-with-btn">
            <input
                type="text"
                value={search}
                onChange={searchChangeHandler}
                onKeyDown={searchPressHandler}
                required
                id="searchField"
                placeholder=" "
            />
            <span className="sb-bar" />
            <label>{t('search.placeholder')}</label>
            <button 
                onClick={() => {
                    router.push("/search" + '?' + createQueryString('key', search))
                }}
            >
                <img src="/img/ui/icons/search.svg" alt="search" />
            </button>
        </div>
    )
}
export default SearchBarModule;
